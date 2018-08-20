package io.github.adamwaniak.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Quiz.
 */
@Entity
@Table(name = "quiz")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Quiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private Instant endDate;

    @Column(name = "jhi_password")
    private String password;

    @NotNull
    @Column(name = "edition", nullable = false)
    private Integer edition;

    @Column(name = "url")
    private String url;

    @NotNull
    @Min(value = 1)
    @Column(name = "max_time_in_minutes", nullable = false)
    private Integer maxTimeInMinutes;

    @OneToMany(mappedBy = "quiz")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TaskSet> taskSets = new HashSet<>();

    @OneToMany(mappedBy = "quiz")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Student> students = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private User owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public Quiz setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Quiz name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Quiz startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Quiz endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getPassword() {
        return password;
    }

    public Quiz password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getEdition() {
        return edition;
    }

    public Quiz edition(Integer edition) {
        this.edition = edition;
        return this;
    }

    public void setEdition(Integer edition) {
        this.edition = edition;
    }

    public String getUrl() {
        return url;
    }

    public Quiz url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getMaxTimeInMinutes() {
        return maxTimeInMinutes;
    }

    public Quiz maxTimeInMinutes(Integer maxTimeInMinutes) {
        this.maxTimeInMinutes = maxTimeInMinutes;
        return this;
    }

    public void setMaxTimeInMinutes(Integer maxTimeInMinutes) {
        this.maxTimeInMinutes = maxTimeInMinutes;
    }

    public Set<TaskSet> getTaskSets() {
        return taskSets;
    }

    public Quiz taskSets(Set<TaskSet> taskSets) {
        this.taskSets = taskSets;
        return this;
    }

    public Quiz addTaskSets(TaskSet taskSet) {
        this.taskSets.add(taskSet);
        taskSet.setQuiz(this);
        return this;
    }

    public Quiz removeTaskSets(TaskSet taskSet) {
        this.taskSets.remove(taskSet);
        taskSet.setQuiz(null);
        return this;
    }

    public void setTaskSets(Set<TaskSet> taskSets) {
        this.taskSets = taskSets;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Quiz students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Quiz addStudents(Student student) {
        this.students.add(student);
        student.setQuiz(this);
        return this;
    }

    public Quiz removeStudents(Student student) {
        this.students.remove(student);
        student.setQuiz(null);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public User getOwner() {
        return owner;
    }

    public Quiz owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
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
        Quiz quiz = (Quiz) o;
        if (quiz.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quiz.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Quiz{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", password='" + getPassword() + "'" +
            ", edition=" + getEdition() +
            ", url='" + getUrl() + "'" +
            ", maxTimeInMinutes=" + getMaxTimeInMinutes() +
            "}";
    }
}
