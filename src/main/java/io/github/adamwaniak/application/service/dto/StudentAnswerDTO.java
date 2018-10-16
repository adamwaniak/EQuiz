package io.github.adamwaniak.application.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the StudentAnswer entity.
 */
public class StudentAnswerDTO implements Serializable {

    private Long id;

    private Long studentId;

    private Long answerId;

    private Long taskId;

    private boolean isChecked;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Long answerId) {
        this.answerId = answerId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public boolean isChecked() {
        return isChecked;
    }

    public StudentAnswerDTO setChecked(boolean checked) {
        isChecked = checked;
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

        StudentAnswerDTO studentAnswerDTO = (StudentAnswerDTO) o;
        if (studentAnswerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentAnswerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentAnswerDTO{" +
            "id=" + getId() +
            ", student=" + getStudentId() +
            ", answer=" + getAnswerId() +
            ", task=" + getTaskId() +
            "}";
    }
}
