package io.github.adamwaniak.application.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TaskSet entity.
 */
public class TaskSetDTO implements Serializable {

    private Long id;

    private String name;

    @NotNull
    @Min(value = 0)
    private Integer requiredTaskAmount;

    @NotNull
    @Min(value = 0)
    private Integer maxPoint;

    @NotNull
    private Boolean artificialSelection;

    private Long quizId;

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

    public Integer getRequiredTaskAmount() {
        return requiredTaskAmount;
    }

    public void setRequiredTaskAmount(Integer requiredTaskAmount) {
        this.requiredTaskAmount = requiredTaskAmount;
    }

    public Integer getMaxPoint() {
        return maxPoint;
    }

    public void setMaxPoint(Integer maxPoint) {
        this.maxPoint = maxPoint;
    }

    public Boolean isArtificialSelection() {
        return artificialSelection;
    }

    public void setArtificialSelection(Boolean artificialSelection) {
        this.artificialSelection = artificialSelection;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TaskSetDTO taskSetDTO = (TaskSetDTO) o;
        if (taskSetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taskSetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaskSetDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", requiredTaskAmount=" + getRequiredTaskAmount() +
            ", maxPoint=" + getMaxPoint() +
            ", artificialSelection='" + isArtificialSelection() + "'" +
            ", quiz=" + getQuizId() +
            "}";
    }
}
