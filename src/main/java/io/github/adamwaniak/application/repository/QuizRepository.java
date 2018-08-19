package io.github.adamwaniak.application.repository;

import io.github.adamwaniak.application.domain.Quiz;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Quiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query("select quiz from Quiz quiz where quiz.owner.login = ?#{principal.username}")
    List<Quiz> findByOwnerIsCurrentUser();

}
