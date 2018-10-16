package io.github.adamwaniak.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A StudentAnswer.
 */
@Entity
@Table(name = "student_answer")
public class StudentAnswer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean isChecked;

    @ManyToOne
    @JsonIgnoreProperties("studentAnswers")
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Answer answer;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Task task;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public StudentAnswer student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Answer getAnswer() {
        return answer;
    }

    public StudentAnswer answer(Answer answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public Task getTask() {
        return task;
    }

    public StudentAnswer task(Task task) {
        this.task = task;
        return this;
    }

    public boolean getIsChecked() {
        return isChecked;
    }

    public void setIsChecked(boolean checked) {
        isChecked = checked;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StudentAnswer studentAnswer = (StudentAnswer) o;
        if (studentAnswer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentAnswer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentAnswer{" +
            "id=" + getId() +
            "}";
    }
}
