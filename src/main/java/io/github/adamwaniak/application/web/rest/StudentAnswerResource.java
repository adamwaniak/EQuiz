package io.github.adamwaniak.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.adamwaniak.application.service.StudentAnswerService;
import io.github.adamwaniak.application.web.rest.errors.BadRequestAlertException;
import io.github.adamwaniak.application.web.rest.util.HeaderUtil;
import io.github.adamwaniak.application.web.rest.util.PaginationUtil;
import io.github.adamwaniak.application.service.dto.StudentAnswerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing StudentAnswer.
 */
@RestController
@RequestMapping("/api")
public class StudentAnswerResource {

    private final Logger log = LoggerFactory.getLogger(StudentAnswerResource.class);

    private static final String ENTITY_NAME = "studentAnswer";

    private final StudentAnswerService studentAnswerService;

    public StudentAnswerResource(StudentAnswerService studentAnswerService) {
        this.studentAnswerService = studentAnswerService;
    }

    /**
     * POST  /student-answers : Create a new studentAnswer.
     *
     * @param studentAnswerDTO the studentAnswerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new studentAnswerDTO, or with status 400 (Bad Request) if the studentAnswer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/student-answers")
    @Timed
    public ResponseEntity<StudentAnswerDTO> createStudentAnswer(@RequestBody StudentAnswerDTO studentAnswerDTO) throws URISyntaxException {
        log.debug("REST request to save StudentAnswer : {}", studentAnswerDTO);
        if (studentAnswerDTO.getId() != null) {
            throw new BadRequestAlertException("A new studentAnswer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentAnswerDTO result = studentAnswerService.save(studentAnswerDTO);
        return ResponseEntity.created(new URI("/api/student-answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /student-answers : Updates an existing studentAnswer.
     *
     * @param studentAnswerDTO the studentAnswerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated studentAnswerDTO,
     * or with status 400 (Bad Request) if the studentAnswerDTO is not valid,
     * or with status 500 (Internal Server Error) if the studentAnswerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/student-answers")
    @Timed
    public ResponseEntity<StudentAnswerDTO> updateStudentAnswer(@RequestBody StudentAnswerDTO studentAnswerDTO) throws URISyntaxException {
        log.debug("REST request to update StudentAnswer : {}", studentAnswerDTO);
        if (studentAnswerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentAnswerDTO result = studentAnswerService.save(studentAnswerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, studentAnswerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /student-answers : get all the studentAnswers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of studentAnswers in body
     */
    @GetMapping("/student-answers")
    @Timed
    public ResponseEntity<List<StudentAnswerDTO>> getAllStudentAnswers(Pageable pageable) {
        log.debug("REST request to get a page of StudentAnswers");
        Page<StudentAnswerDTO> page = studentAnswerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/student-answers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /student-answers/:id : get the "id" studentAnswer.
     *
     * @param id the id of the studentAnswerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the studentAnswerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/student-answers/{id}")
    @Timed
    public ResponseEntity<StudentAnswerDTO> getStudentAnswer(@PathVariable Long id) {
        log.debug("REST request to get StudentAnswer : {}", id);
        Optional<StudentAnswerDTO> studentAnswerDTO = studentAnswerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentAnswerDTO);
    }

    /**
     * DELETE  /student-answers/:id : delete the "id" studentAnswer.
     *
     * @param id the id of the studentAnswerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/student-answers/{id}")
    @Timed
    public ResponseEntity<Void> deleteStudentAnswer(@PathVariable Long id) {
        log.debug("REST request to delete StudentAnswer : {}", id);
        studentAnswerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
