package io.github.adamwaniak.application.web.rest;

import io.github.adamwaniak.application.service.QuizResolveService;
import io.github.adamwaniak.application.service.dto.StudentAnswerDTO;
import io.github.adamwaniak.application.service.dto.resolve.QuizForResolveDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuizResolveResource {

    private final Logger log = LoggerFactory.getLogger(QuizResource.class);

    private static final String ENTITY_NAME = "quiz-resolve-resource";

    private final QuizResolveService quizResolveService;

    public QuizResolveResource(QuizResolveService quizResolveService) {
        this.quizResolveService = quizResolveService;
    }

    @GetMapping("/resolve/{quizId}/{studentId}")
    public ResponseEntity<QuizForResolveDTO> getQuizForResolve(@PathVariable Long quizId, @PathVariable Long studentId) {
        return new ResponseEntity<>(quizResolveService.getQuizForResolve(quizId, studentId), HttpStatus.OK);
    }

    @PostMapping("/resolve/{quizId}/{studentId}")
    public ResponseEntity<QuizForResolveDTO> submitQuiz(@PathVariable Long quizId, @PathVariable Long studentId, @RequestBody List<StudentAnswerDTO> answers) {
        return new ResponseEntity(quizResolveService.submitResolvedQuiz(answers, quizId, studentId), HttpStatus.OK);
    }

}
