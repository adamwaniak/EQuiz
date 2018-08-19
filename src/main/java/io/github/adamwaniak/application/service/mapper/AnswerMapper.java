package io.github.adamwaniak.application.service.mapper;

import io.github.adamwaniak.application.domain.*;
import io.github.adamwaniak.application.service.dto.AnswerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Answer and its DTO AnswerDTO.
 */
@Mapper(componentModel = "spring", uses = {TaskMapper.class})
public interface AnswerMapper extends EntityMapper<AnswerDTO, Answer> {

    @Mapping(source = "task.id", target = "taskId")
    AnswerDTO toDto(Answer answer);

    @Mapping(source = "taskId", target = "task")
    Answer toEntity(AnswerDTO answerDTO);

    default Answer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Answer answer = new Answer();
        answer.setId(id);
        return answer;
    }
}
