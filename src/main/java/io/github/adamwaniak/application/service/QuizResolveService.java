package io.github.adamwaniak.application.service;

import io.github.adamwaniak.application.domain.*;
import io.github.adamwaniak.application.repository.QuizRepository;
import io.github.adamwaniak.application.repository.StudentAnswerRepository;
import io.github.adamwaniak.application.repository.StudentRepository;
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

@Service
@Transactional
public class QuizResolveService {

    private final Logger log = LoggerFactory.getLogger(QuizService.class);

    private final QuizRepository quizRepository;

    private final StudentRepository studentRepository;

    private final StudentAnswerRepository studentAnswerRepository;

    private final TaskSetService taskSetService;

    private BCryptPasswordEncoder encoder;

    public QuizResolveService(QuizRepository quizRepository, TaskSetService taskSetService, BCryptPasswordEncoder encoder,
                              StudentRepository studentRepository, StudentAnswerRepository studentAnswerRepository) {
        this.quizRepository = quizRepository;
        this.taskSetService = taskSetService;
        this.encoder = encoder;
        this.studentRepository = studentRepository;
        this.studentAnswerRepository = studentAnswerRepository;
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
        Set<TaskForResolveDTO> chosenTasks = new HashSet<>();
        List<Task> copyTasks = new ArrayList<>(taskSet.getTasks());
        for (int i = 0; i < taskSet.getRequiredTaskAmount(); i++) {
            TaskForResolveDTO taskForResolve = new TaskForResolveDTO();
            Collections.shuffle(copyTasks);
            Task task = copyTasks.get(0);
            copyTasks.remove(0);
            taskForResolve.setTaskId(task.getId())
                .setQuestion(task.getQuestion())
                .setAnswers(createStudentAnswerAndReturnAnswerForResolveDTO(task.getAnswers(), student))
                .setImage(task.getImage())
                .setImageContentType(task.getImageContentType());
            chosenTasks.add(taskForResolve);
        }
        return chosenTasks;
    }

    private Set<AnswerForResolveDTO> createStudentAnswerAndReturnAnswerForResolveDTO(Collection<Answer> answers, Student student) {
        Set<AnswerForResolveDTO> answerForResolveDTOSet = new HashSet<>();
        for (Answer answer : answers) {
            AnswerForResolveDTO answerForResolveDTO = new AnswerForResolveDTO();
            StudentAnswer studentAnswer = new StudentAnswer();
            studentAnswer.answer(answer)
                .task(answer.getTask())
                .student(student)
                .isChecked(false);
            studentAnswer = studentAnswerRepository.save(studentAnswer);
            answerForResolveDTO
                .setAnswerId(answer.getId())
                .setName(answer.getName())
                .setImage(answer.getImage())
                .setImageContentType(answer.getImageContentType())
                .setStudentAnswer(studentAnswer.isChecked())
                .setStudentAnswerId(studentAnswer.getId());
            answerForResolveDTOSet.add(answerForResolveDTO);
        }
        return answerForResolveDTOSet;
    }

    private void setUpStudent(Student student, Quiz quiz) {
        student.setStartDate(Instant.now())
            .setEndDate(Instant.now().plus(quiz.getMaxTimeInMinutes() + 1, ChronoUnit.MINUTES));
    }

}
