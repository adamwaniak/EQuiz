package io.github.adamwaniak.application.service;

import io.github.adamwaniak.application.domain.StudentAnswer;
import io.github.adamwaniak.application.repository.StudentAnswerRepository;
import io.github.adamwaniak.application.service.dto.StudentAnswerDTO;
import io.github.adamwaniak.application.service.mapper.StudentAnswerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing StudentAnswer.
 */
@Service
@Transactional
public class StudentAnswerService {

    private final Logger log = LoggerFactory.getLogger(StudentAnswerService.class);

    private final StudentAnswerRepository studentAnswerRepository;

    private final StudentAnswerMapper studentAnswerMapper;

    public StudentAnswerService(StudentAnswerRepository studentAnswerRepository, StudentAnswerMapper studentAnswerMapper) {
        this.studentAnswerRepository = studentAnswerRepository;
        this.studentAnswerMapper = studentAnswerMapper;
    }

    /**
     * Save a studentAnswer.
     *
     * @param studentAnswerDTO the entity to save
     * @return the persisted entity
     */
    public StudentAnswerDTO save(StudentAnswerDTO studentAnswerDTO) {
        log.debug("Request to save StudentAnswer : {}", studentAnswerDTO);
        StudentAnswer studentAnswer = studentAnswerMapper.toEntity(studentAnswerDTO);
        studentAnswer = studentAnswerRepository.save(studentAnswer);
        return studentAnswerMapper.toDto(studentAnswer);
    }

    /**
     * Get all the studentAnswers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<StudentAnswerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StudentAnswers");
        return studentAnswerRepository.findAll(pageable)
            .map(studentAnswerMapper::toDto);
    }


    /**
     * Get one studentAnswer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<StudentAnswerDTO> findOne(Long id) {
        log.debug("Request to get StudentAnswer : {}", id);
        return studentAnswerRepository.findById(id)
            .map(studentAnswerMapper::toDto);
    }

    /**
     * Delete the studentAnswer by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete StudentAnswer : {}", id);
        studentAnswerRepository.deleteById(id);
    }
}
