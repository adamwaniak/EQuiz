package io.github.adamwaniak.application.repository;

import io.github.adamwaniak.application.domain.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;


/**
 * Spring Data  repository for the StudentAnswer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Long> {

    Set<StudentAnswer> findByStudentId(Long id);
}
