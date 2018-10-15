package io.github.adamwaniak.application.service.dto.resolve;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Set;

public class QuizForResolveDTO {

    private Long quizId;

    @NotNull
    private String name;

    @NotNull
    private Instant startDate;

    @NotNull
    private Instant endDate;

    private int maxTimeInMinutes;

    private Set<TaskForResolveDTO> tasks;

    public QuizForResolveDTO setQuizId(Long quizId) {
        this.quizId = quizId;
        return this;
    }

    public QuizForResolveDTO setName(String name) {
        this.name = name;
        return this;
    }

    public QuizForResolveDTO setStartDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public QuizForResolveDTO setEndDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public QuizForResolveDTO setMaxTimeInMinutes(int maxTimeInMinutes) {
        this.maxTimeInMinutes = maxTimeInMinutes;
        return this;
    }

    public QuizForResolveDTO setTasks(Set<TaskForResolveDTO> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Long getQuizId() {
        return quizId;
    }

    public String getName() {
        return name;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public int getMaxTimeInMinutes() {
        return maxTimeInMinutes;
    }

    public Set<TaskForResolveDTO> getTasks() {
        return tasks;
    }


}

