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

    @Mapping(source = "owner.id", target = "ownerId")
    QuizDTO toDto(Quiz quiz);

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
