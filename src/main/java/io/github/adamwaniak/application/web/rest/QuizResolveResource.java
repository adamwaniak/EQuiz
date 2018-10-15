package io.github.adamwaniak.application.web.rest;

import io.github.adamwaniak.application.service.QuizResolveService;
import io.github.adamwaniak.application.service.QuizService;
import io.github.adamwaniak.application.service.dto.resolve.QuizForResolveDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QuizResolveResource {

    private final Logger log = LoggerFactory.getLogger(QuizResource.class);

    private static final String ENTITY_NAME = "quiz-resolve-resource";

    private final QuizResolveService quizResolveService;

    public QuizResolveResource(QuizResolveService quizResolveService) {
        this.quizResolveService = quizResolveService;
    }

    @GetMapping("/resolve/{quizId}")
    public ResponseEntity<QuizForResolveDTO> getQuizForResolve(@PathVariable Long quizId){
        return new ResponseEntity<>(quizResolveService.getQuizForResolve(quizId), HttpStatus.OK);
    }

}
