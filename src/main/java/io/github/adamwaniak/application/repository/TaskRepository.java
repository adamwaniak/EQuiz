package io.github.adamwaniak.application.repository;

import io.github.adamwaniak.application.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByTaskSetId(Long taskSetID, Pageable pageable);

}
