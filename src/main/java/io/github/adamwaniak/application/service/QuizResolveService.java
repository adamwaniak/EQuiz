package io.github.adamwaniak.application.service;

import io.github.adamwaniak.application.domain.*;
import io.github.adamwaniak.application.repository.QuizRepository;
import io.github.adamwaniak.application.repository.StudentAnswerRepository;
import io.github.adamwaniak.application.repository.StudentRepository;
import io.github.adamwaniak.application.service.dto.StudentAnswerDTO;
import io.github.adamwaniak.application.service.dto.resolve.AnswerForResolveDTO;
import io.github.adamwaniak.application.service.dto.resolve.QuizForResolveDTO;
import io.github.adamwaniak.application.service.dto.resolve.TaskForResolveDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuizResolveService {

    private final Logger log = LoggerFactory.getLogger(QuizService.class);

    private final QuizRepository quizRepository;

    private final StudentRepository studentRepository;

    private final StudentAnswerRepository studentAnswerRepository;

    private final StudentAnswerService studentAnswerService;

    private final TaskSetService taskSetService;

    private BCryptPasswordEncoder encoder;

    private final Random random = new Random();

    public QuizResolveService(QuizRepository quizRepository, TaskSetService taskSetService, BCryptPasswordEncoder encoder,
                              StudentRepository studentRepository, StudentAnswerRepository studentAnswerRepository, StudentAnswerService studentAnswerService) {
        this.quizRepository = quizRepository;
        this.taskSetService = taskSetService;
        this.encoder = encoder;
        this.studentRepository = studentRepository;
        this.studentAnswerRepository = studentAnswerRepository;
        this.studentAnswerService = studentAnswerService;
    }

    public QuizForResolveDTO getQuizForResolve(Long quizId, Long studentId) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (!quizOptional.isPresent() || !studentOptional.isPresent()) {
            return null;
        }
        Quiz quiz = quizOptional.get();
        Student student = studentOptional.get();
        QuizForResolveDTO quizForResolveDTO = new QuizForResolveDTO();
        setUpStudent(student, quiz);
        setUpQuizForResolveDTO(quizForResolveDTO, quiz);
        setUpTasksAndAnswersForQuizForResolveDTO(quizForResolveDTO, quiz, student);
        return quizForResolveDTO;
    }

    private void setUpQuizForResolveDTO(QuizForResolveDTO quizForResolveDTO, Quiz quiz) {
        quizForResolveDTO.setName(quiz.getName())
            .setQuizId(quiz.getId())
            .setMaxTimeInMinutes(quiz.getMaxTimeInMinutes())
            .setStartDate(Instant.now())
            .setEndDate(Instant.now().plus(quiz.getMaxTimeInMinutes(), ChronoUnit.MINUTES));
    }

    private void setUpTasksAndAnswersForQuizForResolveDTO(QuizForResolveDTO quizForResolveDTO, Quiz quiz, Student student) {
        Set<TaskForResolveDTO> tasks = new HashSet<>();
        for (TaskSet taskSet : quiz.getTaskSets()) {
            if (taskSet.getTasks().size() < taskSet.getRequiredTaskAmount()) {
                log.error("Not enough tasks for quiz: " + quiz.getId() + ", for taskSet: " + taskSet.getId());
            } else {
                tasks.addAll(selectTasksFromTaskSet(taskSet, student));
            }
        }
        quizForResolveDTO.setTasks(tasks);
    }

    private Set<TaskForResolveDTO> selectTasksFromTaskSet(TaskSet taskSet, Student student) {
        if (taskSet.getRequiredTaskAmount() == taskSet.getTasks().size()) {
            return mapTaskSetToTaskForResolveDTOSet(taskSet, student);
        }
        Set<TaskForResolveDTO> chosenTasks = new HashSet<>();
        List<Task> copyTasks = new ArrayList<>(taskSet.getTasks());
        boolean aiSelection = taskSet.isArtificialSelection();
        int i = taskSet.getRequiredTaskAmount();
        while (i > 0) {
            if (aiSelection) {
                copyTasks.sort(Comparator.comparingDouble(Task::getCorrectness));
                int indexOfHardTask = random.nextInt(copyTasks.size() / 2 - 1);
                Task hardTask = copyTasks.get(indexOfHardTask);
                TaskForResolveDTO taskForResolve = new TaskForResolveDTO();
                setUpTaskForResolve(taskForResolve, hardTask, student);
                chosenTasks.add(taskForResolve);
                i--;
                if (i > 0) {
                    int indexOfEasyTask = copyTasks.size() - indexOfHardTask;
                    Task easyTask = copyTasks.get(indexOfEasyTask);
                    taskForResolve = new TaskForResolveDTO();
                    setUpTaskForResolve(taskForResolve, easyTask, student);
                    chosenTasks.add(taskForResolve);
                    copyTasks.remove(easyTask);
                    i--;
                }
                copyTasks.remove(hardTask);

            } else {
                TaskForResolveDTO taskForResolve = new TaskForResolveDTO();
                Collections.shuffle(copyTasks);
                Task task = copyTasks.get(0);
                copyTasks.remove(0);
                setUpTaskForResolve(taskForResolve, task, student);
                chosenTasks.add(taskForResolve);
                i--;
            }
        }
        return chosenTasks;
    }

    private void setUpTaskForResolve(TaskForResolveDTO taskForResolve, Task task, Student student) {
        taskForResolve.setTaskId(task.getId())
            .setQuestion(task.getQuestion())
            .setAnswers(createStudentAnswerAndReturnAnswerForResolveDTO(task.getAnswers(), student))
            .setImage(task.getImage())
            .setImageContentType(task.getImageContentType());
    }

    private Set<AnswerForResolveDTO> createStudentAnswerAndReturnAnswerForResolveDTO(Collection<Answer> answers, Student student) {
        Set<AnswerForResolveDTO> answerForResolveDTOSet = new HashSet<>();
        for (Answer answer : answers) {
            AnswerForResolveDTO answerForResolveDTO = new AnswerForResolveDTO();
            StudentAnswer studentAnswer = new StudentAnswer();
            studentAnswer.answer(answer)
                .task(answer.getTask())
                .student(student)
                .setIsChecked(false);
            studentAnswer = studentAnswerRepository.save(studentAnswer);
            answerForResolveDTO
                .setAnswerId(answer.getId())
                .setName(answer.getName())
                .setImage(answer.getImage())
                .setImageContentType(answer.getImageContentType())
                .setStudentAnswer(studentAnswer.getIsChecked())
                .setStudentAnswerId(studentAnswer.getId());
            answerForResolveDTOSet.add(answerForResolveDTO);
        }
        return answerForResolveDTOSet;
    }

    private void setUpStudent(Student student, Quiz quiz) {
        student.setStartDate(Instant.now())
            .setEndDate(Instant.now().plus(quiz.getMaxTimeInMinutes() + 1, ChronoUnit.MINUTES));
    }

    public boolean submitResolvedQuiz(List<StudentAnswerDTO> newStudentAnswers, Long quizId, Long studentId) {
        Student student = studentRepository.getOne(studentId);
        for (StudentAnswerDTO answer : newStudentAnswers) {
            studentAnswerService.save(answer);
        }
        computeAndSetUpScore(student);
        return true;
    }

    private void computeAndSetUpScore(Student student) {
        Quiz quiz = student.getQuiz();
        Set<StudentAnswer> studentAnswers = student.getStudentAnswers();
        double studentScore = 0;
        int maxScore = 0;
        for (TaskSet taskSet : quiz.getTaskSets()) {
            int requiredNumberOfTask = taskSet.getRequiredTaskAmount();
            int maxPointPerTask = taskSet.getMaxPoint();
            maxScore = maxScore + maxPointPerTask * requiredNumberOfTask;
            for (Task task : taskSet.getTasks()) {
                Set<StudentAnswer> studentAnswersPerTask = studentAnswers.stream()
                    .filter(studentAnswer -> studentAnswer.getTask().getId() == task.getId())
                    .collect(Collectors.toSet());
                if (studentAnswersPerTask != null && studentAnswersPerTask.size() > 0) {
                    double scorePerTask = 0;
                    int positiveAnswers = 0;
                    for (Answer answer : task.getAnswers()) {
                        StudentAnswer studentAnswer = studentAnswersPerTask.stream()
                            .filter(sAnswer -> sAnswer.getAnswer().getId() == answer.getId()).findFirst().get();
                        if (studentAnswer.getIsChecked() && !answer.getIsCorrect()) {
                            positiveAnswers = 0;
                            break;
                        } else if (studentAnswer.getIsChecked() && answer.getIsCorrect()) {
                            positiveAnswers += 1;
                        }
                    }
                    long trueAnswers = task.getAnswers().stream().filter(a -> a.getIsCorrect()).count();
                    if (trueAnswers == 0 && positiveAnswers == 0) {
                        scorePerTask = maxPointPerTask;
                    } else {
                        scorePerTask = maxPointPerTask * positiveAnswers / trueAnswers;
                    }
                    task.addStudentScore(scorePerTask);
                    task.addMaxPossibleScore((long) maxPointPerTask);
                    studentScore = studentScore + scorePerTask;
                }
            }
        }
        student.setScore(studentScore);
        studentRepository.save(student);
    }

    private Set<TaskForResolveDTO> mapTaskSetToTaskForResolveDTOSet(TaskSet taskSet, Student student) {
        return taskSet.getTasks().stream().map(task -> {
            TaskForResolveDTO taskForResolveDTO = new TaskForResolveDTO();
            setUpTaskForResolve(new TaskForResolveDTO(), task, student);
            return taskForResolveDTO;
        }).collect(Collectors.toSet());
    }


}
