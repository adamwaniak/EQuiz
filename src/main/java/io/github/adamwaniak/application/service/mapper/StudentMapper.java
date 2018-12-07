package io.github.adamwaniak.application.service.mapper;

import io.github.adamwaniak.application.domain.Student;
import io.github.adamwaniak.application.service.dto.StudentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Student and its DTO StudentDTO.
 */
@Mapper(componentModel = "spring", uses = {QuizMapper.class})
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {

    @Mapping(source = "quiz.id", target = "quizId")
    default StudentDTO toDto(Student student) {
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setId(student.getId());
        studentDTO.setStartDate(student.getStartDate());
        studentDTO.setName(student.getName());
        studentDTO.setEndDate(student.getEndDate());
        studentDTO.setQuizId(student.getQuiz().getId());
        studentDTO.setScore(student.getScore());
        Long maxScoreForTest = (long) student.getQuiz().getTaskSets()
            .stream().mapToDouble(taskSet -> taskSet.getMaxPoint() * taskSet.getRequiredTaskAmount()).sum();
        studentDTO.setMaxScoreForTest(maxScoreForTest);
        studentDTO.setGrade(selectGrade(student.getScore(), maxScoreForTest));
        return studentDTO;
    }

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

    default String selectGrade(Double studentScore, Long maxScore) {
        if (maxScore == null || studentScore == null) {
            return "2";
        }
        double percentScore = studentScore / maxScore;
        if (percentScore > 0.9) {
            return "5";
        } else if (percentScore > 0.8) {
            return "4.5";
        } else if (percentScore > 0.7) {
            return "4";
        } else if (percentScore > 0.6) {
            return "3.5";
        } else if (percentScore > 0.5) {
            return "3";
        } else {
            return "2";
        }
    }

}
