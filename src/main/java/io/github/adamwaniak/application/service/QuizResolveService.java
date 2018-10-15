package io.github.adamwaniak.application.service;

import io.github.adamwaniak.application.domain.Answer;
import io.github.adamwaniak.application.domain.Quiz;
import io.github.adamwaniak.application.domain.Task;
import io.github.adamwaniak.application.domain.TaskSet;
import io.github.adamwaniak.application.repository.QuizRepository;
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

    private final TaskSetService taskSetService;

    private BCryptPasswordEncoder encoder;

    public QuizResolveService(QuizRepository quizRepository, TaskSetService taskSetService, BCryptPasswordEncoder encoder) {
        this.quizRepository = quizRepository;
        this.taskSetService = taskSetService;
        this.encoder = encoder;
    }

    public QuizForResolveDTO getQuizForResolve(Long quizId) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (!quizOptional.isPresent()) {
            return null;
        }
        Quiz quiz = quizOptional.get();
        QuizForResolveDTO quizForResolveDTO = new QuizForResolveDTO();
        quizForResolveDTO.setName(quiz.getName())
            .setQuizId(quiz.getId())
            .setMaxTimeInMinutes(quiz.getMaxTimeInMinutes())
            .setStartDate(Instant.now())
            .setEndDate(Instant.now().plus(quiz.getMaxTimeInMinutes(), ChronoUnit.MINUTES));
        Set<TaskForResolveDTO> tasks = new HashSet<>();
        for (TaskSet taskSet : quiz.getTaskSets()) {
            if (taskSet.getTasks().size() < taskSet.getRequiredTaskAmount()) {
                log.error("Not enough tasks for quiz: " + quiz.getId() + ", for taskSet: " + taskSet.getId());
            } else {
                tasks.addAll(getTasksFromTaskSet(taskSet));
            }
        }
        quizForResolveDTO.setTasks(tasks);
        return quizForResolveDTO;
    }

    private Set<TaskForResolveDTO> getTasksFromTaskSet(TaskSet taskSet) {
        Set<TaskForResolveDTO> chosenTasks = new HashSet<>();
        List<Task> copyTasks = new ArrayList<>(taskSet.getTasks());
        for (int i = 0; i < taskSet.getRequiredTaskAmount(); i++) {
            TaskForResolveDTO taskForResolve = new TaskForResolveDTO();
            Collections.shuffle(copyTasks);
            Task task = copyTasks.get(0);
            copyTasks.remove(0);
            taskForResolve.setTaskId(task.getId())
                .setQuestion(task.getQuestion())
                .setAnswers(mapToDTO(task.getAnswers()))
                .setImage(task.getImage())
                .setImageContentType(task.getImageContentType());
            chosenTasks.add(taskForResolve);
        }
        return chosenTasks;
    }

    private Set<AnswerForResolveDTO> mapToDTO(Collection<Answer> answers) {
        Set<AnswerForResolveDTO> answerForResolveDTOSet = new HashSet<>();
        for (Answer answer : answers) {
            AnswerForResolveDTO answerForResolveDTO = new AnswerForResolveDTO();
            answerForResolveDTO
                .setAnswerId(answer.getId())
                .setName(answer.getName())
                .setImage(answer.getImage())
                .setImageContentType(answer.getImageContentType())
                .setStudentAnswer(false);
            answerForResolveDTOSet.add(answerForResolveDTO);
        }
        return answerForResolveDTOSet;
    }

}
