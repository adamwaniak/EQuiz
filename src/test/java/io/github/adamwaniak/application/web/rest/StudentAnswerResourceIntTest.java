package io.github.adamwaniak.application.web.rest;

import io.github.adamwaniak.application.EQuizApp;

import io.github.adamwaniak.application.domain.StudentAnswer;
import io.github.adamwaniak.application.repository.StudentAnswerRepository;
import io.github.adamwaniak.application.service.StudentAnswerService;
import io.github.adamwaniak.application.service.dto.StudentAnswerDTO;
import io.github.adamwaniak.application.service.mapper.StudentAnswerMapper;
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
 * Test class for the StudentAnswerResource REST controller.
 *
 * @see StudentAnswerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EQuizApp.class)
public class StudentAnswerResourceIntTest {

    @Autowired
    private StudentAnswerRepository studentAnswerRepository;


    @Autowired
    private StudentAnswerMapper studentAnswerMapper;
    

    @Autowired
    private StudentAnswerService studentAnswerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStudentAnswerMockMvc;

    private StudentAnswer studentAnswer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentAnswerResource studentAnswerResource = new StudentAnswerResource(studentAnswerService);
        this.restStudentAnswerMockMvc = MockMvcBuilders.standaloneSetup(studentAnswerResource)
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
    public static StudentAnswer createEntity(EntityManager em) {
        StudentAnswer studentAnswer = new StudentAnswer();
        return studentAnswer;
    }

    @Before
    public void initTest() {
        studentAnswer = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudentAnswer() throws Exception {
        int databaseSizeBeforeCreate = studentAnswerRepository.findAll().size();

        // Create the StudentAnswer
        StudentAnswerDTO studentAnswerDTO = studentAnswerMapper.toDto(studentAnswer);
        restStudentAnswerMockMvc.perform(post("/api/student-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentAnswerDTO)))
            .andExpect(status().isCreated());

        // Validate the StudentAnswer in the database
        List<StudentAnswer> studentAnswerList = studentAnswerRepository.findAll();
        assertThat(studentAnswerList).hasSize(databaseSizeBeforeCreate + 1);
        StudentAnswer testStudentAnswer = studentAnswerList.get(studentAnswerList.size() - 1);
    }

    @Test
    @Transactional
    public void createStudentAnswerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentAnswerRepository.findAll().size();

        // Create the StudentAnswer with an existing ID
        studentAnswer.setId(1L);
        StudentAnswerDTO studentAnswerDTO = studentAnswerMapper.toDto(studentAnswer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentAnswerMockMvc.perform(post("/api/student-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentAnswerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StudentAnswer in the database
        List<StudentAnswer> studentAnswerList = studentAnswerRepository.findAll();
        assertThat(studentAnswerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStudentAnswers() throws Exception {
        // Initialize the database
        studentAnswerRepository.saveAndFlush(studentAnswer);

        // Get all the studentAnswerList
        restStudentAnswerMockMvc.perform(get("/api/student-answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentAnswer.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getStudentAnswer() throws Exception {
        // Initialize the database
        studentAnswerRepository.saveAndFlush(studentAnswer);

        // Get the studentAnswer
        restStudentAnswerMockMvc.perform(get("/api/student-answers/{id}", studentAnswer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(studentAnswer.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingStudentAnswer() throws Exception {
        // Get the studentAnswer
        restStudentAnswerMockMvc.perform(get("/api/student-answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudentAnswer() throws Exception {
        // Initialize the database
        studentAnswerRepository.saveAndFlush(studentAnswer);

        int databaseSizeBeforeUpdate = studentAnswerRepository.findAll().size();

        // Update the studentAnswer
        StudentAnswer updatedStudentAnswer = studentAnswerRepository.findById(studentAnswer.getId()).get();
        // Disconnect from session so that the updates on updatedStudentAnswer are not directly saved in db
        em.detach(updatedStudentAnswer);
        StudentAnswerDTO studentAnswerDTO = studentAnswerMapper.toDto(updatedStudentAnswer);

        restStudentAnswerMockMvc.perform(put("/api/student-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentAnswerDTO)))
            .andExpect(status().isOk());

        // Validate the StudentAnswer in the database
        List<StudentAnswer> studentAnswerList = studentAnswerRepository.findAll();
        assertThat(studentAnswerList).hasSize(databaseSizeBeforeUpdate);
        StudentAnswer testStudentAnswer = studentAnswerList.get(studentAnswerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingStudentAnswer() throws Exception {
        int databaseSizeBeforeUpdate = studentAnswerRepository.findAll().size();

        // Create the StudentAnswer
        StudentAnswerDTO studentAnswerDTO = studentAnswerMapper.toDto(studentAnswer);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restStudentAnswerMockMvc.perform(put("/api/student-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentAnswerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StudentAnswer in the database
        List<StudentAnswer> studentAnswerList = studentAnswerRepository.findAll();
        assertThat(studentAnswerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudentAnswer() throws Exception {
        // Initialize the database
        studentAnswerRepository.saveAndFlush(studentAnswer);

        int databaseSizeBeforeDelete = studentAnswerRepository.findAll().size();

        // Get the studentAnswer
        restStudentAnswerMockMvc.perform(delete("/api/student-answers/{id}", studentAnswer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StudentAnswer> studentAnswerList = studentAnswerRepository.findAll();
        assertThat(studentAnswerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentAnswer.class);
        StudentAnswer studentAnswer1 = new StudentAnswer();
        studentAnswer1.setId(1L);
        StudentAnswer studentAnswer2 = new StudentAnswer();
        studentAnswer2.setId(studentAnswer1.getId());
        assertThat(studentAnswer1).isEqualTo(studentAnswer2);
        studentAnswer2.setId(2L);
        assertThat(studentAnswer1).isNotEqualTo(studentAnswer2);
        studentAnswer1.setId(null);
        assertThat(studentAnswer1).isNotEqualTo(studentAnswer2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentAnswerDTO.class);
        StudentAnswerDTO studentAnswerDTO1 = new StudentAnswerDTO();
        studentAnswerDTO1.setId(1L);
        StudentAnswerDTO studentAnswerDTO2 = new StudentAnswerDTO();
        assertThat(studentAnswerDTO1).isNotEqualTo(studentAnswerDTO2);
        studentAnswerDTO2.setId(studentAnswerDTO1.getId());
        assertThat(studentAnswerDTO1).isEqualTo(studentAnswerDTO2);
        studentAnswerDTO2.setId(2L);
        assertThat(studentAnswerDTO1).isNotEqualTo(studentAnswerDTO2);
        studentAnswerDTO1.setId(null);
        assertThat(studentAnswerDTO1).isNotEqualTo(studentAnswerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(studentAnswerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(studentAnswerMapper.fromId(null)).isNull();
    }
}
