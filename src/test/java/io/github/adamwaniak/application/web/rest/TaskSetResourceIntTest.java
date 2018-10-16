package io.github.adamwaniak.application.web.rest;

import io.github.adamwaniak.application.EQuizApp;

import io.github.adamwaniak.application.domain.TaskSet;
import io.github.adamwaniak.application.repository.TaskSetRepository;
import io.github.adamwaniak.application.service.QuizService;
import io.github.adamwaniak.application.service.TaskSetService;
import io.github.adamwaniak.application.service.dto.TaskSetDTO;
import io.github.adamwaniak.application.service.mapper.TaskSetMapper;
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
import java.util.List;


import static io.github.adamwaniak.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TaskSetResource REST controller.
 *
 * @see TaskSetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EQuizApp.class)
public class TaskSetResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_REQUIRED_TASK_AMOUNT = 0;
    private static final Integer UPDATED_REQUIRED_TASK_AMOUNT = 1;

    private static final Integer DEFAULT_MAX_POINT = 0;
    private static final Integer UPDATED_MAX_POINT = 1;

    private static final Boolean DEFAULT_ARTIFICIAL_SELECTION = false;
    private static final Boolean UPDATED_ARTIFICIAL_SELECTION = true;

    @Autowired
    private TaskSetRepository taskSetRepository;


    @Autowired
    private TaskSetMapper taskSetMapper;


    @Autowired
    private TaskSetService taskSetService;

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

    private MockMvc restTaskSetMockMvc;

    private TaskSet taskSet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaskSetResource taskSetResource = new TaskSetResource(taskSetService, quizService);
        this.restTaskSetMockMvc = MockMvcBuilders.standaloneSetup(taskSetResource)
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
    public static TaskSet createEntity(EntityManager em) {
        TaskSet taskSet = new TaskSet()
            .name(DEFAULT_NAME)
            .requiredTaskAmount(DEFAULT_REQUIRED_TASK_AMOUNT)
            .maxPoint(DEFAULT_MAX_POINT)
            .artificialSelection(DEFAULT_ARTIFICIAL_SELECTION);
        return taskSet;
    }

    @Before
    public void initTest() {
        taskSet = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaskSet() throws Exception {
        int databaseSizeBeforeCreate = taskSetRepository.findAll().size();

        // Create the TaskSet
        TaskSetDTO taskSetDTO = taskSetMapper.toDto(taskSet);
        restTaskSetMockMvc.perform(post("/api/task-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskSetDTO)))
            .andExpect(status().isCreated());

        // Validate the TaskSet in the database
        List<TaskSet> taskSetList = taskSetRepository.findAll();
        assertThat(taskSetList).hasSize(databaseSizeBeforeCreate + 1);
        TaskSet testTaskSet = taskSetList.get(taskSetList.size() - 1);
        assertThat(testTaskSet.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTaskSet.getRequiredTaskAmount()).isEqualTo(DEFAULT_REQUIRED_TASK_AMOUNT);
        assertThat(testTaskSet.getMaxPoint()).isEqualTo(DEFAULT_MAX_POINT);
        assertThat(testTaskSet.isArtificialSelection()).isEqualTo(DEFAULT_ARTIFICIAL_SELECTION);
    }

    @Test
    @Transactional
    public void createTaskSetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taskSetRepository.findAll().size();

        // Create the TaskSet with an existing ID
        taskSet.setId(1L);
        TaskSetDTO taskSetDTO = taskSetMapper.toDto(taskSet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskSetMockMvc.perform(post("/api/task-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskSetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TaskSet in the database
        List<TaskSet> taskSetList = taskSetRepository.findAll();
        assertThat(taskSetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRequiredTaskAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskSetRepository.findAll().size();
        // set the field null
        taskSet.setRequiredTaskAmount(null);

        // Create the TaskSet, which fails.
        TaskSetDTO taskSetDTO = taskSetMapper.toDto(taskSet);

        restTaskSetMockMvc.perform(post("/api/task-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskSetDTO)))
            .andExpect(status().isBadRequest());

        List<TaskSet> taskSetList = taskSetRepository.findAll();
        assertThat(taskSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMaxPointIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskSetRepository.findAll().size();
        // set the field null
        taskSet.setMaxPoint(null);

        // Create the TaskSet, which fails.
        TaskSetDTO taskSetDTO = taskSetMapper.toDto(taskSet);

        restTaskSetMockMvc.perform(post("/api/task-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskSetDTO)))
            .andExpect(status().isBadRequest());

        List<TaskSet> taskSetList = taskSetRepository.findAll();
        assertThat(taskSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkArtificialSelectionIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskSetRepository.findAll().size();
        // set the field null
        taskSet.setArtificialSelection(null);

        // Create the TaskSet, which fails.
        TaskSetDTO taskSetDTO = taskSetMapper.toDto(taskSet);

        restTaskSetMockMvc.perform(post("/api/task-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskSetDTO)))
            .andExpect(status().isBadRequest());

        List<TaskSet> taskSetList = taskSetRepository.findAll();
        assertThat(taskSetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTaskSets() throws Exception {
        // Initialize the database
        taskSetRepository.saveAndFlush(taskSet);

        // Get all the taskSetList
        restTaskSetMockMvc.perform(get("/api/task-sets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].requiredTaskAmount").value(hasItem(DEFAULT_REQUIRED_TASK_AMOUNT)))
            .andExpect(jsonPath("$.[*].maxPoint").value(hasItem(DEFAULT_MAX_POINT)))
            .andExpect(jsonPath("$.[*].artificialSelection").value(hasItem(DEFAULT_ARTIFICIAL_SELECTION.booleanValue())));
    }


    @Test
    @Transactional
    public void getTaskSet() throws Exception {
        // Initialize the database
        taskSetRepository.saveAndFlush(taskSet);

        // Get the taskSet
        restTaskSetMockMvc.perform(get("/api/task-sets/{id}", taskSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taskSet.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.requiredTaskAmount").value(DEFAULT_REQUIRED_TASK_AMOUNT))
            .andExpect(jsonPath("$.maxPoint").value(DEFAULT_MAX_POINT))
            .andExpect(jsonPath("$.artificialSelection").value(DEFAULT_ARTIFICIAL_SELECTION.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTaskSet() throws Exception {
        // Get the taskSet
        restTaskSetMockMvc.perform(get("/api/task-sets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaskSet() throws Exception {
        // Initialize the database
        taskSetRepository.saveAndFlush(taskSet);

        int databaseSizeBeforeUpdate = taskSetRepository.findAll().size();

        // Update the taskSet
        TaskSet updatedTaskSet = taskSetRepository.findById(taskSet.getId()).get();
        // Disconnect from session so that the updates on updatedTaskSet are not directly saved in db
        em.detach(updatedTaskSet);
        updatedTaskSet
            .name(UPDATED_NAME)
            .requiredTaskAmount(UPDATED_REQUIRED_TASK_AMOUNT)
            .maxPoint(UPDATED_MAX_POINT)
            .artificialSelection(UPDATED_ARTIFICIAL_SELECTION);
        TaskSetDTO taskSetDTO = taskSetMapper.toDto(updatedTaskSet);

        restTaskSetMockMvc.perform(put("/api/task-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskSetDTO)))
            .andExpect(status().isOk());

        // Validate the TaskSet in the database
        List<TaskSet> taskSetList = taskSetRepository.findAll();
        assertThat(taskSetList).hasSize(databaseSizeBeforeUpdate);
        TaskSet testTaskSet = taskSetList.get(taskSetList.size() - 1);
        assertThat(testTaskSet.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTaskSet.getRequiredTaskAmount()).isEqualTo(UPDATED_REQUIRED_TASK_AMOUNT);
        assertThat(testTaskSet.getMaxPoint()).isEqualTo(UPDATED_MAX_POINT);
        assertThat(testTaskSet.isArtificialSelection()).isEqualTo(UPDATED_ARTIFICIAL_SELECTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTaskSet() throws Exception {
        int databaseSizeBeforeUpdate = taskSetRepository.findAll().size();

        // Create the TaskSet
        TaskSetDTO taskSetDTO = taskSetMapper.toDto(taskSet);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskSetMockMvc.perform(put("/api/task-sets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskSetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TaskSet in the database
        List<TaskSet> taskSetList = taskSetRepository.findAll();
        assertThat(taskSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTaskSet() throws Exception {
        // Initialize the database
        taskSetRepository.saveAndFlush(taskSet);

        int databaseSizeBeforeDelete = taskSetRepository.findAll().size();

        // Get the taskSet
        restTaskSetMockMvc.perform(delete("/api/task-sets/{id}", taskSet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TaskSet> taskSetList = taskSetRepository.findAll();
        assertThat(taskSetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskSet.class);
        TaskSet taskSet1 = new TaskSet();
        taskSet1.setId(1L);
        TaskSet taskSet2 = new TaskSet();
        taskSet2.setId(taskSet1.getId());
        assertThat(taskSet1).isEqualTo(taskSet2);
        taskSet2.setId(2L);
        assertThat(taskSet1).isNotEqualTo(taskSet2);
        taskSet1.setId(null);
        assertThat(taskSet1).isNotEqualTo(taskSet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskSetDTO.class);
        TaskSetDTO taskSetDTO1 = new TaskSetDTO();
        taskSetDTO1.setId(1L);
        TaskSetDTO taskSetDTO2 = new TaskSetDTO();
        assertThat(taskSetDTO1).isNotEqualTo(taskSetDTO2);
        taskSetDTO2.setId(taskSetDTO1.getId());
        assertThat(taskSetDTO1).isEqualTo(taskSetDTO2);
        taskSetDTO2.setId(2L);
        assertThat(taskSetDTO1).isNotEqualTo(taskSetDTO2);
        taskSetDTO1.setId(null);
        assertThat(taskSetDTO1).isNotEqualTo(taskSetDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(taskSetMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(taskSetMapper.fromId(null)).isNull();
    }
}
