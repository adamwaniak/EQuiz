package io.github.adamwaniak.application.service;

import io.github.adamwaniak.application.domain.TaskSet;
import io.github.adamwaniak.application.repository.TaskSetRepository;
import io.github.adamwaniak.application.service.dto.TaskSetDTO;
import io.github.adamwaniak.application.service.mapper.TaskSetMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
/**
 * Service Implementation for managing TaskSet.
 */
@Service
@Transactional
public class TaskSetService {

    private final Logger log = LoggerFactory.getLogger(TaskSetService.class);

    private final TaskSetRepository taskSetRepository;

    private final TaskSetMapper taskSetMapper;

    public TaskSetService(TaskSetRepository taskSetRepository, TaskSetMapper taskSetMapper) {
        this.taskSetRepository = taskSetRepository;
        this.taskSetMapper = taskSetMapper;
    }

    /**
     * Save a taskSet.
     *
     * @param taskSetDTO the entity to save
     * @return the persisted entity
     */
    public TaskSetDTO save(TaskSetDTO taskSetDTO) {
        log.debug("Request to save TaskSet : {}", taskSetDTO);
        TaskSet taskSet = taskSetMapper.toEntity(taskSetDTO);
        taskSet = taskSetRepository.save(taskSet);
        return taskSetMapper.toDto(taskSet);
    }

    /**
     * Get all the taskSets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TaskSetDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TaskSets");
        return taskSetRepository.findAll(pageable)
            .map(taskSetMapper::toDto);
    }


    /**
     * Get one taskSet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TaskSetDTO> findOne(Long id) {
        log.debug("Request to get TaskSet : {}", id);
        return taskSetRepository.findById(id)
            .map(taskSetMapper::toDto);
    }

    /**
     * Delete the taskSet by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TaskSet : {}", id);
        taskSetRepository.deleteById(id);
    }

    /**
     * Get the taskSets by given quiz id.
     *
     * @param quizID   the quiz ID
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TaskSetDTO> findByQuizID(Long quizID, Pageable pageable) {
        log.debug("Request to get TaskSets by give quiz id {}", quizID);
        return taskSetRepository.findByQuizId(quizID, pageable)
            .map(taskSetMapper::toDto);
    }
}
