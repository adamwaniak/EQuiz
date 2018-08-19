package io.github.adamwaniak.application.repository;

import io.github.adamwaniak.application.domain.StudentAnswer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StudentAnswer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Long> {

}
