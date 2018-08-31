package io.github.adamwaniak.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.adamwaniak.application.service.QuizService;
import io.github.adamwaniak.application.service.dto.QuizDTO;
import io.github.adamwaniak.application.web.rest.errors.BadRequestAlertException;
import io.github.adamwaniak.application.web.rest.util.HeaderUtil;
import io.github.adamwaniak.application.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Quiz.
 */
@RestController
@RequestMapping("/api")
public class QuizResource {

    private final Logger log = LoggerFactory.getLogger(QuizResource.class);

    private static final String ENTITY_NAME = "quiz";

    private final QuizService quizService;

    public QuizResource(QuizService quizService) {
        this.quizService = quizService;
    }

    /**
     * POST  /quizzes : Create a new quiz.
     *
     * @param quizDTO the quizDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new quizDTO, or with status 400 (Bad Request) if the quiz has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/quizzes")
    @Timed
    public ResponseEntity<QuizDTO> createQuiz(@Valid @RequestBody QuizDTO quizDTO) throws URISyntaxException {
        log.debug("REST request to save Quiz : {}", quizDTO);
        if (quizDTO.getId() != null) {
            throw new BadRequestAlertException("A new quiz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuizDTO result = quizService.save(quizDTO);
        return ResponseEntity.created(new URI("/api/quizzes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /quizzes : Updates an existing quiz.
     *
     * @param quizDTO the quizDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated quizDTO,
     * or with status 400 (Bad Request) if the quizDTO is not valid,
     * or with status 500 (Internal Server Error) if the quizDTO couldn't be updated
     */
    @PutMapping("/quizzes")
    @Timed
    public ResponseEntity<QuizDTO> updateQuiz(@Valid @RequestBody QuizDTO quizDTO) {
        log.debug("REST request to update Quiz : {}", quizDTO);
        if (quizDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QuizDTO result = quizService.save(quizDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, quizDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /quizzes : get all the quizzes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of quizzes in body
     */
    @GetMapping("/quizzes")
    @Timed
    public ResponseEntity<List<QuizDTO>> getAllQuizzes(Pageable pageable) {
        log.debug("REST request to get a page of Quizzes");
        Page<QuizDTO> page = quizService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/quizzes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /quizzes/:id : get the "id" quiz.
     *
     * @param id the id of the quizDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the quizDTO, or with status 404 (Not Found)
     */
    @GetMapping("/quizzes/{id}")
    @Timed
    public ResponseEntity<QuizDTO> getQuiz(@PathVariable Long id) {
        log.debug("REST request to get Quiz : {}", id);
        Optional<QuizDTO> quizDTO = quizService.findOne(id);
        return ResponseUtil.wrapOrNotFound(quizDTO);
    }

    /**
     * DELETE  /quizzes/:id : delete the "id" quiz.
     *
     * @param id the id of the quizDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/quizzes/{id}")
    @Timed
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        log.debug("REST request to delete Quiz : {}", id);
        quizService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/quizzes/current-user")
    @Timed
    public ResponseEntity<List<QuizDTO>> getCurrentUserQuizzes(Authentication authentication, Pageable pageable) {
        log.debug("REST request to get current user {} quizzes", authentication.getPrincipal());
        Page<QuizDTO> page = quizService.getQuizzesByOwner(authentication, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/current-user/quizzes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
