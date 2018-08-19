package io.github.adamwaniak.application.service.mapper;

import io.github.adamwaniak.application.domain.*;
import io.github.adamwaniak.application.service.dto.TaskSetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TaskSet and its DTO TaskSetDTO.
 */
@Mapper(componentModel = "spring", uses = {QuizMapper.class})
public interface TaskSetMapper extends EntityMapper<TaskSetDTO, TaskSet> {

    @Mapping(source = "quiz.id", target = "quizId")
    TaskSetDTO toDto(TaskSet taskSet);

    @Mapping(source = "quizId", target = "quiz")
    @Mapping(target = "tasks", ignore = true)
    TaskSet toEntity(TaskSetDTO taskSetDTO);

    default TaskSet fromId(Long id) {
        if (id == null) {
            return null;
        }
        TaskSet taskSet = new TaskSet();
        taskSet.setId(id);
        return taskSet;
    }
}
