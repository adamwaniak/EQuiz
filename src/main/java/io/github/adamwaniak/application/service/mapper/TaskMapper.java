package io.github.adamwaniak.application.service.mapper;

import io.github.adamwaniak.application.domain.Task;
import io.github.adamwaniak.application.service.dto.TaskDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Task and its DTO TaskDTO.
 */
@Mapper(componentModel = "spring", uses = {TaskSetMapper.class})
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {

    @Mapping(source = "taskSet.id", target = "taskSetId")
    default TaskDTO toDto(Task task) {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setImage(task.getImage());
        taskDTO.setImageContentType(task.getImageContentType());
        taskDTO.setQuestion(task.getQuestion());
        taskDTO.setTaskSetId(task.getTaskSet().getId());
        taskDTO.setCorrectnessFactor(task.getCorrectness());
        return taskDTO;
    }


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
