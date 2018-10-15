package io.github.adamwaniak.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "correctness_factor")
    private Double correctnessFactor;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @OneToMany(mappedBy = "task", cascade = CascadeType.REMOVE)
    private Set<Answer> answers = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private TaskSet taskSet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public Task question(String question) {
        this.question = question;
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Double getCorrectnessFactor() {
        return correctnessFactor;
    }

    public Task correctnessFactor(Double correctnessFactor) {
        this.correctnessFactor = correctnessFactor;
        return this;
    }

    public void setCorrectnessFactor(Double correctnessFactor) {
        this.correctnessFactor = correctnessFactor;
    }

    public byte[] getImage() {
        return image;
    }

    public Task image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Task imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public Task answers(Set<Answer> answers) {
        this.answers = answers;
        return this;
    }

    public Task addAnswers(Answer answer) {
        this.answers.add(answer);
        answer.setTask(this);
        return this;
    }

    public Task removeAnswers(Answer answer) {
        this.answers.remove(answer);
        answer.setTask(null);
        return this;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }

    public TaskSet getTaskSet() {
        return taskSet;
    }

    public Task taskSet(TaskSet taskSet) {
        this.taskSet = taskSet;
        return this;
    }

    public void setTaskSet(TaskSet taskSet) {
        this.taskSet = taskSet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Task task = (Task) o;
        if (task.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", question='" + getQuestion() + "'" +
            ", correctnessFactor=" + getCorrectnessFactor() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
