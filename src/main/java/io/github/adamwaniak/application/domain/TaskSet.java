package io.github.adamwaniak.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TaskSet.
 */
@Entity
@Table(name = "task_set")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TaskSet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @NotNull
    @Min(value = 0)
    @Column(name = "required_task_amount", nullable = false)
    private Integer requiredTaskAmount;

    @NotNull
    @Min(value = 0)
    @Column(name = "max_point", nullable = false)
    private Integer maxPoint;

    @NotNull
    @Column(name = "artificial_selection", nullable = false)
    private Boolean artificialSelection;

    @ManyToOne
    @JsonIgnoreProperties("taskSets")
    private Quiz quiz;

    @OneToMany(mappedBy = "taskSet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TaskSet name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRequiredTaskAmount() {
        return requiredTaskAmount;
    }

    public TaskSet requiredTaskAmount(Integer requiredTaskAmount) {
        this.requiredTaskAmount = requiredTaskAmount;
        return this;
    }

    public void setRequiredTaskAmount(Integer requiredTaskAmount) {
        this.requiredTaskAmount = requiredTaskAmount;
    }

    public Integer getMaxPoint() {
        return maxPoint;
    }

    public TaskSet maxPoint(Integer maxPoint) {
        this.maxPoint = maxPoint;
        return this;
    }

    public void setMaxPoint(Integer maxPoint) {
        this.maxPoint = maxPoint;
    }

    public Boolean isArtificialSelection() {
        return artificialSelection;
    }

    public TaskSet artificialSelection(Boolean artificialSelection) {
        this.artificialSelection = artificialSelection;
        return this;
    }

    public void setArtificialSelection(Boolean artificialSelection) {
        this.artificialSelection = artificialSelection;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public TaskSet quiz(Quiz quiz) {
        this.quiz = quiz;
        return this;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public TaskSet tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public TaskSet addTasks(Task task) {
        this.tasks.add(task);
        task.setTaskSet(this);
        return this;
    }

    public TaskSet removeTasks(Task task) {
        this.tasks.remove(task);
        task.setTaskSet(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
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
        TaskSet taskSet = (TaskSet) o;
        if (taskSet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taskSet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaskSet{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", requiredTaskAmount=" + getRequiredTaskAmount() +
            ", maxPoint=" + getMaxPoint() +
            ", artificialSelection='" + isArtificialSelection() + "'" +
            "}";
    }
}
