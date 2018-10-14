package io.github.adamwaniak.application.service.util;


import io.github.adamwaniak.application.domain.*;
import io.github.adamwaniak.application.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DataLoader implements ApplicationRunner {

    private AuthorityRepository authorityRepository;
    private UserRepository userRepository;
    private QuizRepository quizRepository;
    private TaskSetRepository taskSetRepository;
    private TaskRepository taskRepository;
    private AnswerRepository answerRepository;
    private BCryptPasswordEncoder encoder;

    @Autowired
    public DataLoader(UserRepository userRepository, BCryptPasswordEncoder encoder,
                      AuthorityRepository authorityRepository, QuizRepository quizRepository,
                      TaskSetRepository taskSetRepository, TaskRepository taskRepository,
                      AnswerRepository answerRepository) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.authorityRepository = authorityRepository;
        this.quizRepository = quizRepository;
        this.taskSetRepository = taskSetRepository;
        this.taskRepository = taskRepository;
        this.answerRepository = answerRepository;
    }

    public void run(ApplicationArguments args) {
        addRoles();
        addUsers();
        addQuizzes();
        addTaskSets();
        addTasks();
        addAnswers();
    }

    private void addRoles() {
        Authority roleAdmin = new Authority();
        Authority roleUser = new Authority();
        roleAdmin.setName("ROLE_ADMIN");
        roleUser.setName("ROLE_USER");
        authorityRepository.save(roleAdmin);
        authorityRepository.save(roleUser);
    }

    private void addUsers() {
        Authority roleAdmin = authorityRepository.findAll().stream().filter(role -> role.getName().equals("ROLE_ADMIN")).findFirst().get();
        Authority roleUser = authorityRepository.findAll().stream().filter(role -> role.getName().equals("ROLE_USER")).findFirst().get();
        Set<Authority> authorities = new HashSet<>(Arrays.asList(roleAdmin, roleUser));

        User system = new User();
        system.setId(1L).setLogin("system")
            .setPassword(encoder.encode("system"))
            .setFirstName("System")
            .setLastName("System")
            .setEmail("system@localhost")
            .setActivated(true)
            .setLangKey("en")
            .setCreatedBy("system");
        system.setLastModifiedBy("system");
        system.setAuthorities(authorities);
        userRepository.save(system);

        User admin = new User();
        admin.setId(3L).setLogin("admin")
            .setPassword(encoder.encode("admin"))
            .setFirstName("Administrator")
            .setLastName("Administrator")
            .setEmail("admin@localhost")
            .setActivated(true)
            .setLangKey("en")
            .setCreatedBy("system");
        admin.setLastModifiedBy("system");
        admin.setAuthorities(authorities);
        userRepository.save(admin);

        User user = new User();
        user.setId(4L).setLogin("user")
            .setPassword(encoder.encode("user"))
            .setFirstName("User")
            .setLastName("User")
            .setEmail("user@localhost")
            .setActivated(true)
            .setLangKey("en")
            .setCreatedBy("system");
        user.setLastModifiedBy("system");
        user.setAuthorities(authorities.stream().filter(role -> role.getName().equals("ROLE_USER")).collect(Collectors.toSet()));
        userRepository.save(user);
    }

    private void addQuizzes() {
        User user = userRepository.getOne(3L);

        for (long i = 1; i < 11; i++) {
            Quiz quiz = new Quiz();
            quiz.setId(i)
                .name("New test " + i)
                .startDate(Instant.now().plus(10 + i, ChronoUnit.DAYS))
                .endDate(Instant.now().plus(11 + i, ChronoUnit.DAYS))
                .password(encoder.encode("password"))
                .edition(1)
                .maxTimeInMinutes(10)
                .owner(user);
            quiz.url(encoder.encode("new test" + i + i));
            quizRepository.save(quiz);
        }

    }

    private void addTaskSets() {
        long taskSetId = 1;
        for (long i = 1; i < 11; i++) {
            Quiz quiz = quizRepository.getOne(i);
            for (long j = 1; j < 6; j++) {
                TaskSet taskSet = new TaskSet();
                taskSet.setId(taskSetId++);
                taskSet.requiredTaskAmount(2)
                    .name("Task set " + j)
                    .maxPoint(1)
                    .artificialSelection(false)
                    .quiz(quiz);
                taskSetRepository.save(taskSet);
            }
        }
    }

    private void addTasks() {
        long tasksId = 1;
        for (long i = 1; i < 51; i++) {
            for (long j = 1; j < 6; j++) {
                Task task = new Task();
                task.setId(tasksId++);
                task.question("Do the circumference of the earth is equal to 40075 km?")
                .taskSet(taskSetRepository.getOne(i));
                taskRepository.save(task);
            }
        }
    }

    private void addAnswers() {
        long answerId = 1;
        for (long i = 1; i < 251; i++) {
            Answer correctAnswer = new Answer();
            correctAnswer.setId(answerId++);
            correctAnswer.name("Yes")
                .isCorrect(true)
                .task(taskRepository.getOne(i));
            answerRepository.save(correctAnswer);
            Answer wrongAnswer = new Answer();
            wrongAnswer.setId(answerId++);
            wrongAnswer.name("No")
                .isCorrect(false)
                .task(taskRepository.getOne(i));
            answerRepository.save(wrongAnswer);
        }
    }
}
