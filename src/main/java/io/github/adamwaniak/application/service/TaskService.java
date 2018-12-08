package io.github.adamwaniak.application.service;

import io.github.adamwaniak.application.domain.Answer;
import io.github.adamwaniak.application.domain.Task;
import io.github.adamwaniak.application.domain.TaskSet;
import io.github.adamwaniak.application.repository.TaskRepository;
import io.github.adamwaniak.application.service.dto.TaskDTO;
import io.github.adamwaniak.application.service.mapper.TaskMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * Service Implementation for managing Task.
 */
@Service
@Transactional
public class TaskService {

    private final Logger log = LoggerFactory.getLogger(TaskService.class);

    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    private final AnswerService answerService;

    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper, AnswerService answerService) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.answerService = answerService;
    }

    public Task copyTaskForTaskSet(Task task, TaskSet taskSet) {
        Task newTask = new Task();
        newTask.question(task.getQuestion())
            .setMaxPossibleScore(task.getMaxPossibleScore())
            .setAllStudentScore(task.getAllStudentScore())
            .image(task.getImage());
        Set<Answer> answers = new HashSet<>();
        for (Answer answer : task.getAnswers()) {
            answers.add(answerService.copyAnswerForTask(answer, newTask));
        }
        newTask.answers(answers);
        newTask.taskSet(taskSet);
        taskRepository.save(newTask);
        return newTask;
    }

    /**
     * Save a task.
     *
     * @param taskDTO the entity to save
     * @return the persisted entity
     */
    public TaskDTO save(TaskDTO taskDTO) {
        log.debug("Request to save Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    /**
     * Get all the tasks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TaskDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tasks");
        return taskRepository.findAll(pageable)
            .map(taskMapper::toDto);
    }


    /**
     * Get one task by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TaskDTO> findOne(Long id) {
        log.debug("Request to get Task : {}", id);
        return taskRepository.findById(id)
            .map(taskMapper::toDto);
    }

    /**
     * Delete the task by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Task : {}", id);
        taskRepository.deleteById(id);
    }

    /**
     * Get the tasks by given task set id.
     *
     * @param taskSetID the task set ID
     * @param pageable  the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TaskDTO> findByTaskSetID(Long taskSetID, Pageable pageable) {
        log.debug("Request to get tasks by given task set id {}", taskSetID);
        return taskRepository.findByTaskSetId(taskSetID, pageable)
            .map(taskMapper::toDto);
    }
}
