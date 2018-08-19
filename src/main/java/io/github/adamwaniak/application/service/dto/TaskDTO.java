package io.github.adamwaniak.application.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Task entity.
 */
public class TaskDTO implements Serializable {

    private Long id;

    @NotNull
    private String question;

    private Double correctnessFactor;

    @Lob
    private byte[] image;
    private String imageContentType;

    private Long taskSetId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Double getCorrectnessFactor() {
        return correctnessFactor;
    }

    public void setCorrectnessFactor(Double correctnessFactor) {
        this.correctnessFactor = correctnessFactor;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Long getTaskSetId() {
        return taskSetId;
    }

    public void setTaskSetId(Long taskSetId) {
        this.taskSetId = taskSetId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TaskDTO taskDTO = (TaskDTO) o;
        if (taskDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taskDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaskDTO{" +
            "id=" + getId() +
            ", question='" + getQuestion() + "'" +
            ", correctnessFactor=" + getCorrectnessFactor() +
            ", image='" + getImage() + "'" +
            ", taskSet=" + getTaskSetId() +
            "}";
    }
}
