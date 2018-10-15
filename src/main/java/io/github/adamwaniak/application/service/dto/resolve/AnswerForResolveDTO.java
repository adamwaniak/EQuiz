package io.github.adamwaniak.application.service.dto.resolve;

import javax.persistence.Lob;

public class AnswerForResolveDTO {
    private Long answerId;
    private String name;
    private boolean studentAnswer;
    @Lob
    private byte[] image;
    private String imageContentType;


    public Long getAnswerId() {
        return answerId;
    }

    public String getName() {
        return name;
    }

    public boolean isStudentAnswer() {
        return studentAnswer;
    }

    public byte[] getImage() {
        return image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public AnswerForResolveDTO setAnswerId(Long answerId) {
        this.answerId = answerId;
        return this;
    }

    public AnswerForResolveDTO setName(String name) {
        this.name = name;
        return this;
    }

    public AnswerForResolveDTO setStudentAnswer(boolean studentAnswer) {
        this.studentAnswer = studentAnswer;
        return this;
    }

    public AnswerForResolveDTO setImage(byte[] image) {
        this.image = image;
        return this;
    }

    public AnswerForResolveDTO setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }
}
