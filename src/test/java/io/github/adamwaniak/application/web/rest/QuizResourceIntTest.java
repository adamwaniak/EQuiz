package io.github.adamwaniak.application.web.rest;

import io.github.adamwaniak.application.EQuizApp;
import io.github.adamwaniak.application.domain.Quiz;
import io.github.adamwaniak.application.repository.QuizRepository;
import io.github.adamwaniak.application.service.QuizService;
import io.github.adamwaniak.application.service.dto.QuizDTO;
import io.github.adamwaniak.application.service.mapper.QuizMapper;
import io.github.adamwaniak.application.web.rest.errors.ExceptionTranslator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static io.github.adamwaniak.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the QuizResource REST controller.
 *
 * @see QuizResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EQuizApp.class)
public class QuizResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final Integer DEFAULT_EDITION = 1;
    private static final Integer UPDATED_EDITION = 2;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Integer DEFAULT_MAX_TIME_IN_MINUTES = 1;
    private static final Integer UPDATED_MAX_TIME_IN_MINUTES = 2;

    @Autowired
    private QuizRepository quizRepository;


    @Autowired
    private QuizMapper quizMapper;


    @Autowired
    private QuizService quizService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restQuizMockMvc;

    private Quiz quiz;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuizResource quizResource = new QuizResource(quizService);
        this.restQuizMockMvc = MockMvcBuilders.standaloneSetup(quizResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Quiz createEntity(EntityManager em) {
        Quiz quiz = new Quiz()
            .name(DEFAULT_NAME)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .password(DEFAULT_PASSWORD)
            .edition(DEFAULT_EDITION)
            .url(DEFAULT_URL)
            .maxTimeInMinutes(DEFAULT_MAX_TIME_IN_MINUTES);
        return quiz;
    }

    @Before
    public void initTest() {
        quiz = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuiz() throws Exception {
        int databaseSizeBeforeCreate = quizRepository.findAll().size();

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);
        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isCreated());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeCreate + 1);
        Quiz testQuiz = quizList.get(quizList.size() - 1);
        assertThat(testQuiz.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testQuiz.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testQuiz.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testQuiz.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testQuiz.getEdition()).isEqualTo(DEFAULT_EDITION);
        assertThat(testQuiz.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testQuiz.getMaxTimeInMinutes()).isEqualTo(DEFAULT_MAX_TIME_IN_MINUTES);
    }

    @Test
    @Transactional
    public void createQuizWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = quizRepository.findAll().size();

        // Create the Quiz with an existing ID
        quiz.setId(1L);
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = quizRepository.findAll().size();
        // set the field null
        quiz.setName(null);

        // Create the Quiz, which fails.
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = quizRepository.findAll().size();
        // set the field null
        quiz.setStartDate(null);

        // Create the Quiz, which fails.
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = quizRepository.findAll().size();
        // set the field null
        quiz.setEndDate(null);

        // Create the Quiz, which fails.
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditionIsRequired() throws Exception {
        int databaseSizeBeforeTest = quizRepository.findAll().size();
        // set the field null
        quiz.setEdition(null);

        // Create the Quiz, which fails.
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMaxTimeInMinutesIsRequired() throws Exception {
        int databaseSizeBeforeTest = quizRepository.findAll().size();
        // set the field null
        quiz.setMaxTimeInMinutes(null);

        // Create the Quiz, which fails.
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        restQuizMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllQuizzes() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        // Get all the quizList
        restQuizMockMvc.perform(get("/api/quizzes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quiz.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].edition").value(hasItem(DEFAULT_EDITION)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].maxTimeInMinutes").value(hasItem(DEFAULT_MAX_TIME_IN_MINUTES)));
    }


    @Test
    @Transactional
    public void getQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        // Get the quiz
        restQuizMockMvc.perform(get("/api/quizzes/{id}", quiz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(quiz.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.edition").value(DEFAULT_EDITION))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.maxTimeInMinutes").value(DEFAULT_MAX_TIME_IN_MINUTES));
    }
    @Test
    @Transactional
    public void getNonExistingQuiz() throws Exception {
        // Get the quiz
        restQuizMockMvc.perform(get("/api/quizzes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        int databaseSizeBeforeUpdate = quizRepository.findAll().size();

        // Update the quiz
        Quiz updatedQuiz = quizRepository.findById(quiz.getId()).get();
        // Disconnect from session so that the updates on updatedQuiz are not directly saved in db
        em.detach(updatedQuiz);
        updatedQuiz
            .name(UPDATED_NAME)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .password(UPDATED_PASSWORD)
            .edition(UPDATED_EDITION)
            .url(UPDATED_URL)
            .maxTimeInMinutes(UPDATED_MAX_TIME_IN_MINUTES);
        QuizDTO quizDTO = quizMapper.toDto(updatedQuiz);

        restQuizMockMvc.perform(put("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isOk());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeUpdate);
        Quiz testQuiz = quizList.get(quizList.size() - 1);
        assertThat(testQuiz.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testQuiz.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testQuiz.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testQuiz.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testQuiz.getEdition()).isEqualTo(UPDATED_EDITION);
        assertThat(testQuiz.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testQuiz.getMaxTimeInMinutes()).isEqualTo(UPDATED_MAX_TIME_IN_MINUTES);
    }

    @Test
    @Transactional
    public void updateNonExistingQuiz() throws Exception {
        int databaseSizeBeforeUpdate = quizRepository.findAll().size();

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizMockMvc.perform(put("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuiz() throws Exception {
        // Initialize the database
        quizRepository.saveAndFlush(quiz);

        int databaseSizeBeforeDelete = quizRepository.findAll().size();

        // Get the quiz
        restQuizMockMvc.perform(delete("/api/quizzes/{id}", quiz.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Quiz> quizList = quizRepository.findAll();
        assertThat(quizList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Quiz.class);
        Quiz quiz1 = new Quiz();
        quiz1.setId(1L);
        Quiz quiz2 = new Quiz();
        quiz2.setId(quiz1.getId());
        assertThat(quiz1).isEqualTo(quiz2);
        quiz2.setId(2L);
        assertThat(quiz1).isNotEqualTo(quiz2);
        quiz1.setId(null);
        assertThat(quiz1).isNotEqualTo(quiz2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizDTO.class);
        QuizDTO quizDTO1 = new QuizDTO();
        quizDTO1.setId(1L);
        QuizDTO quizDTO2 = new QuizDTO();
        assertThat(quizDTO1).isNotEqualTo(quizDTO2);
        quizDTO2.setId(quizDTO1.getId());
        assertThat(quizDTO1).isEqualTo(quizDTO2);
        quizDTO2.setId(2L);
        assertThat(quizDTO1).isNotEqualTo(quizDTO2);
        quizDTO1.setId(null);
        assertThat(quizDTO1).isNotEqualTo(quizDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(quizMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(quizMapper.fromId(null)).isNull();
    }
}
