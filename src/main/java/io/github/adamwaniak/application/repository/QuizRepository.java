package io.github.adamwaniak.application.repository;

import io.github.adamwaniak.application.domain.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Quiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    Page<Quiz> findByOwnerLogin(String ownerLogin, Pageable pageable);

    Page<Quiz> findByUrlContains(String code, Pageable pageable);

    Quiz findByUrl(String url);
}
