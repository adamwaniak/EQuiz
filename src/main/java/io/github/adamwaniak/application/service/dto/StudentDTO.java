package io.github.adamwaniak.application.service.dto;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the Student entity.
 */
public class StudentDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 0)
    private String name;

    @DecimalMin(value = "0")
    private Double score;

    @Size(min = 0)
    private String grade;

    private Long quizId;

    private Instant startDate;

    private Instant endDate;

    private Long maxScoreForTest;

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

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public StudentDTO setStartDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public StudentDTO setEndDate(Instant endDate) {
        this.endDate = endDate;
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

        StudentDTO studentDTO = (StudentDTO) o;
        if (studentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentDTO.getId());
    }

    public Long getMaxScoreForTest() {
        return maxScoreForTest;
    }

    public void setMaxScoreForTest(Long maxScoreForTest) {
        this.maxScoreForTest = maxScoreForTest;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentDTO{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", score=" + score +
            ", grade='" + grade + '\'' +
            ", quizId=" + quizId +
            ", startDate=" + startDate +
            ", endDate=" + endDate +
            ", maxScoreForTest=" + maxScoreForTest +
            '}';
    }
}
