package io.github.adamwaniak.application.repository;

import io.github.adamwaniak.application.domain.TaskSet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TaskSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskSetRepository extends JpaRepository<TaskSet, Long> {

    Page<TaskSet> findByQuizId(Long quizID, Pageable pageable);

}
