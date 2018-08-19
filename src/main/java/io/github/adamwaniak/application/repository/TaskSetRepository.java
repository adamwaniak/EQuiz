package io.github.adamwaniak.application.repository;

import io.github.adamwaniak.application.domain.TaskSet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TaskSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskSetRepository extends JpaRepository<TaskSet, Long> {

}
