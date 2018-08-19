package io.github.adamwaniak.application.service.mapper;

import io.github.adamwaniak.application.domain.*;
import io.github.adamwaniak.application.service.dto.TaskDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Task and its DTO TaskDTO.
 */
@Mapper(componentModel = "spring", uses = {TaskSetMapper.class})
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {

    @Mapping(source = "taskSet.id", target = "taskSetId")
    TaskDTO toDto(Task task);

    @Mapping(target = "answers", ignore = true)
    @Mapping(source = "taskSetId", target = "taskSet")
    Task toEntity(TaskDTO taskDTO);

    default Task fromId(Long id) {
        if (id == null) {
            return null;
        }
        Task task = new Task();
        task.setId(id);
        return task;
    }
}
