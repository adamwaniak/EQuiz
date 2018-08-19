package io.github.adamwaniak.application.service.mapper;

import io.github.adamwaniak.application.domain.*;
import io.github.adamwaniak.application.service.dto.StudentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Student and its DTO StudentDTO.
 */
@Mapper(componentModel = "spring", uses = {QuizMapper.class})
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {

    @Mapping(source = "quiz.id", target = "quizId")
    StudentDTO toDto(Student student);

    @Mapping(source = "quizId", target = "quiz")
    @Mapping(target = "studentAnswers", ignore = true)
    Student toEntity(StudentDTO studentDTO);

    default Student fromId(Long id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }
}
