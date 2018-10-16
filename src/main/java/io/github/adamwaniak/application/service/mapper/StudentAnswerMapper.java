package io.github.adamwaniak.application.service.mapper;

import io.github.adamwaniak.application.domain.StudentAnswer;
import io.github.adamwaniak.application.service.dto.StudentAnswerDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity StudentAnswer and its DTO StudentAnswerDTO.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class, AnswerMapper.class, TaskMapper.class})
public interface StudentAnswerMapper extends EntityMapper<StudentAnswerDTO, StudentAnswer> {

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "answer.id", target = "answerId")
    @Mapping(source = "task.id", target = "taskId")
    StudentAnswerDTO toDto(StudentAnswer studentAnswer);

    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "answerId", target = "answer")
    @Mapping(source = "taskId", target = "task")
    StudentAnswer toEntity(StudentAnswerDTO studentAnswerDTO);

    default StudentAnswer fromId(Long id) {
        if (id == null) {
            return null;
        }
        StudentAnswer studentAnswer = new StudentAnswer();
        studentAnswer.setId(id);
        return studentAnswer;
    }
}
