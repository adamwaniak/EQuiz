package io.github.adamwaniak.application.service.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the Quiz entity.
 */
public class QuizDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Instant startDate;

    @NotNull
    private Instant endDate;

    private String password;

    @NotNull
    private Integer edition;

    private String url;

    private Integer taskSetNumber;

    private Integer requiredTaskNumber;

    private Integer taskNumber;

    private Integer resolvedNumber;

    @NotNull
    @Min(value = 1)
    private Integer maxTimeInMinutes;

    private Long ownerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getEdition() {
        return edition;
    }

    public void setEdition(Integer edition) {
        this.edition = edition;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getMaxTimeInMinutes() {
        return maxTimeInMinutes;
    }

    public void setMaxTimeInMinutes(Integer maxTimeInMinutes) {
        this.maxTimeInMinutes = maxTimeInMinutes;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long userId) {
        this.ownerId = userId;
    }

    public Integer getTaskSetNumber() {
        return taskSetNumber;
    }

    public QuizDTO setTaskSetNumber(int taskSetNumber) {
        this.taskSetNumber = taskSetNumber;
        return this;
    }

    public Integer getRequiredTaskNumber() {
        return requiredTaskNumber;
    }

    public QuizDTO setRequiredTaskNumber(int requiredTaskNumber) {
        this.requiredTaskNumber = requiredTaskNumber;
        return this;
    }

    public Integer getTaskNumber() {
        return taskNumber;
    }

    public QuizDTO setTaskNumber(int taskNumber) {
        this.taskNumber = taskNumber;
        return this;
    }

    public Integer getResolvedNumber() {
        return resolvedNumber;
    }

    public QuizDTO setResolvedNumber(Integer resolvedNumber) {
        this.resolvedNumber = resolvedNumber;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuizDTO quizDTO = (QuizDTO) o;
        if (quizDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quizDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuizDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", password='" + getPassword() + "'" +
            ", edition=" + getEdition() +
            ", url='" + getUrl() + "'" +
            ", maxTimeInMinutes=" + getMaxTimeInMinutes() +
            ", owner=" + getOwnerId() +
            "}";
    }
}
