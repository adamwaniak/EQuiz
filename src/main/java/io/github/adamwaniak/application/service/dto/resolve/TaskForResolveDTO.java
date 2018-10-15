package io.github.adamwaniak.application.service.dto.resolve;

import javax.persistence.Lob;
import java.util.Set;

public class TaskForResolveDTO {
    private Long taskId;
    private String question;
    private Set<AnswerForResolveDTO> answers;
    @Lob
    private byte[] image;
    private String imageContentType;

    public Long getTaskId() {
        return taskId;
    }

    public String getQuestion() {
        return question;
    }

    public Set<AnswerForResolveDTO> getAnswers() {
        return answers;
    }

    public byte[] getImage() {
        return image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public TaskForResolveDTO setTaskId(Long taskId) {
        this.taskId = taskId;
        return this;
    }

    public TaskForResolveDTO setQuestion(String question) {
        this.question = question;
        return this;
    }

    public TaskForResolveDTO setAnswers(Set<AnswerForResolveDTO> answers) {
        this.answers = answers;
        return this;
    }

    public TaskForResolveDTO setImage(byte[] image) {
        this.image = image;
        return this;
    }

    public TaskForResolveDTO setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }
}
