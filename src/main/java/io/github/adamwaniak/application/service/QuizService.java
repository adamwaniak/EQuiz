package io.github.adamwaniak.application.service;

import io.github.adamwaniak.application.domain.Quiz;
import io.github.adamwaniak.application.domain.TaskSet;
import io.github.adamwaniak.application.repository.QuizRepository;
import io.github.adamwaniak.application.service.dto.QuizDTO;
import io.github.adamwaniak.application.service.mapper.QuizMapper;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * Service Implementation for managing Quiz.
 */
@Service
@Transactional
public class QuizService {

    private final Logger log = LoggerFactory.getLogger(QuizService.class);

    private final QuizRepository quizRepository;

    private final QuizMapper quizMapper;

    private final TaskSetService taskSetService;

    private BCryptPasswordEncoder encoder;

    public QuizService(QuizRepository quizRepository, QuizMapper quizMapper, TaskSetService taskSetService, BCryptPasswordEncoder encoder) {
        this.quizRepository = quizRepository;
        this.quizMapper = quizMapper;
        this.taskSetService = taskSetService;
        this.encoder = encoder;
    }

    /**
     * Save a quiz.
     *
     * @param quizDTO the entity to save
     * @return the persisted entity
     */
    public QuizDTO save(QuizDTO quizDTO) {
        log.debug("Request to save Quiz : {}", quizDTO);
        Quiz quiz = quizMapper.toEntity(quizDTO);
        quiz.setUrl(encoder.encode(quiz.getId() + quiz.getName() + quiz.getOwner()).replace('/', 'a'));
        quiz = quizRepository.save(quiz);
        return quizMapper.toDto(quiz);
    }

    /**
     * Get all the quizzes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<QuizDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Quizzes");
        return quizRepository.findAll(pageable)
            .map(quizMapper::toDto);
    }


    /**
     * Get one quiz by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<QuizDTO> findOne(Long id) {
        log.debug("Request to get Quiz : {}", id);
        return quizRepository.findById(id)
            .map(quizMapper::toDto);
    }

    /**
     * Delete the quiz by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Quiz : {}", id);
        quizRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<QuizDTO> getQuizzesByOwner(String ownerLogin, Pageable pageable) {
        log.debug("Request to get all {} user quizzes", ownerLogin);
        return quizRepository.findByOwnerLogin(ownerLogin, pageable)
            .map(quizMapper::toDto);
    }

    public boolean isGivenQuizIdBelongToUser(Long quizID, String userLogin) {
        Optional<Quiz> quiz = quizRepository.findById(quizID);
        return quiz.map(quiz1 -> quiz1.getOwner().getLogin().equals(userLogin)).orElse(false);
    }

    public void createNewEdition(Long quizID) throws NotFoundException {
        Optional<Quiz> quiz = quizRepository.findById(quizID);
        if (!quiz.isPresent()) {
            throw new NotFoundException("Not found quiz for id: " + quizID);
        }
        Quiz newQuiz = copyQuiz(quiz.get());
        quizRepository.save(newQuiz);
    }

    private Quiz copyQuiz(Quiz quiz) {
        Quiz newQuiz = new Quiz();
        newQuiz.setEdition(quiz.getEdition() + 1);
        newQuiz.setName(quiz.getName());
        newQuiz.setMaxTimeInMinutes(quiz.getMaxTimeInMinutes());
        newQuiz.setOwner(quiz.getOwner());
        newQuiz.startDate(quiz.getStartDate());
        newQuiz.endDate(quiz.getEndDate());
        Set<TaskSet> taskSets = new HashSet<>();
        for (TaskSet taskSet : quiz.getTaskSets()) {
            taskSets.add(taskSetService.copyTaskSetForQuiz(taskSet, newQuiz));
        }
        newQuiz.setTaskSets(taskSets);
        return newQuiz;
    }

    public Page<QuizDTO> getQuizzesByCodeContains(String code, Pageable pageable) {
        return quizRepository.findByUrlContains(code, pageable).map(quizMapper::toDto);
    }

    public QuizDTO checkPasswordAndGetQuiz(String password, String url) {
        Quiz quiz = quizRepository.findByUrl(url);
        if (quiz == null) {
            return null;
        }
        if (encoder.matches(password, quiz.getPassword())) {
            return quizMapper.toDto(quiz);
        }
        return null;
    }
}
