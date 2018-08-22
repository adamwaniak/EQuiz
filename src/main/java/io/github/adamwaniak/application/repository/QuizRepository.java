package io.github.adamwaniak.application.repository;

import io.github.adamwaniak.application.domain.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Quiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query("select quiz from Quiz quiz where quiz.owner.login = ?#{principal.username}")
    Page<Quiz> findByOwnerIsCurrentUser(Pageable pageable);

}
