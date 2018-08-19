package io.github.adamwaniak.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.adamwaniak.application.service.TaskSetService;
import io.github.adamwaniak.application.web.rest.errors.BadRequestAlertException;
import io.github.adamwaniak.application.web.rest.util.HeaderUtil;
import io.github.adamwaniak.application.web.rest.util.PaginationUtil;
import io.github.adamwaniak.application.service.dto.TaskSetDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TaskSet.
 */
@RestController
@RequestMapping("/api")
public class TaskSetResource {

    private final Logger log = LoggerFactory.getLogger(TaskSetResource.class);

    private static final String ENTITY_NAME = "taskSet";

    private final TaskSetService taskSetService;

    public TaskSetResource(TaskSetService taskSetService) {
        this.taskSetService = taskSetService;
    }

    /**
     * POST  /task-sets : Create a new taskSet.
     *
     * @param taskSetDTO the taskSetDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taskSetDTO, or with status 400 (Bad Request) if the taskSet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/task-sets")
    @Timed
    public ResponseEntity<TaskSetDTO> createTaskSet(@Valid @RequestBody TaskSetDTO taskSetDTO) throws URISyntaxException {
        log.debug("REST request to save TaskSet : {}", taskSetDTO);
        if (taskSetDTO.getId() != null) {
            throw new BadRequestAlertException("A new taskSet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskSetDTO result = taskSetService.save(taskSetDTO);
        return ResponseEntity.created(new URI("/api/task-sets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /task-sets : Updates an existing taskSet.
     *
     * @param taskSetDTO the taskSetDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taskSetDTO,
     * or with status 400 (Bad Request) if the taskSetDTO is not valid,
     * or with status 500 (Internal Server Error) if the taskSetDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/task-sets")
    @Timed
    public ResponseEntity<TaskSetDTO> updateTaskSet(@Valid @RequestBody TaskSetDTO taskSetDTO) throws URISyntaxException {
        log.debug("REST request to update TaskSet : {}", taskSetDTO);
        if (taskSetDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaskSetDTO result = taskSetService.save(taskSetDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taskSetDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /task-sets : get all the taskSets.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of taskSets in body
     */
    @GetMapping("/task-sets")
    @Timed
    public ResponseEntity<List<TaskSetDTO>> getAllTaskSets(Pageable pageable) {
        log.debug("REST request to get a page of TaskSets");
        Page<TaskSetDTO> page = taskSetService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/task-sets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /task-sets/:id : get the "id" taskSet.
     *
     * @param id the id of the taskSetDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taskSetDTO, or with status 404 (Not Found)
     */
    @GetMapping("/task-sets/{id}")
    @Timed
    public ResponseEntity<TaskSetDTO> getTaskSet(@PathVariable Long id) {
        log.debug("REST request to get TaskSet : {}", id);
        Optional<TaskSetDTO> taskSetDTO = taskSetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(taskSetDTO);
    }

    /**
     * DELETE  /task-sets/:id : delete the "id" taskSet.
     *
     * @param id the id of the taskSetDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/task-sets/{id}")
    @Timed
    public ResponseEntity<Void> deleteTaskSet(@PathVariable Long id) {
        log.debug("REST request to delete TaskSet : {}", id);
        taskSetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
