package io.github.adamwaniak.application.service.mapper;

import io.github.adamwaniak.application.domain.Quiz;
import io.github.adamwaniak.application.service.dto.QuizDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Quiz and its DTO QuizDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface QuizMapper extends EntityMapper<QuizDTO, Quiz> {

    default QuizDTO toDto(Quiz quiz) {
        QuizDTO quizDTO = new QuizDTO();
        quizDTO.setEdition(quiz.getEdition());
        quizDTO.setEndDate(quiz.getEndDate());
        quizDTO.setStartDate(quiz.getStartDate());
        quizDTO.setId(quiz.getId());
        quizDTO.setOwnerId(quiz.getOwner().getId());
        quizDTO.setMaxTimeInMinutes(quiz.getMaxTimeInMinutes());
        quizDTO.setPassword(quiz.getPassword());
        quizDTO.setName(quiz.getName());
//        quizDTO.setTaskSetNumber(quiz.getTaskSets().size());
//        quizDTO.setTaskNumber(quiz.getTaskSets().stream().mapToInt(taksSet -> taksSet.getTasks().size()).sum());
//        quizDTO.setRequiredTaskNumber(quiz.getTaskSets().stream().mapToInt(TaskSet::getRequiredTaskAmount).sum());
//        quizDTO.setResolvedNumber(quiz.getStudents().size());
        return quizDTO;
    }

    @Mapping(target = "taskSets", ignore = true)
    @Mapping(target = "students", ignore = true)
    @Mapping(source = "ownerId", target = "owner")
    Quiz toEntity(QuizDTO quizDTO);

    default Quiz fromId(Long id) {
        if (id == null) {
            return null;
        }
        Quiz quiz = new Quiz();
        quiz.setId(id);
        return quiz;
    }
}
