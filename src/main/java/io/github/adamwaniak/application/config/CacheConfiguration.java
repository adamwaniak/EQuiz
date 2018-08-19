package io.github.adamwaniak.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.adamwaniak.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.Quiz.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.Quiz.class.getName() + ".taskSets", jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.Quiz.class.getName() + ".students", jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.Task.class.getName() + ".answers", jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.TaskSet.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.TaskSet.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.Answer.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.Student.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.Student.class.getName() + ".studentAnswers", jcacheConfiguration);
            cm.createCache(io.github.adamwaniak.application.domain.StudentAnswer.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
