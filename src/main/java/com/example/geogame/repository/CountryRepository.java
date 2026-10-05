package com.example.geogame.repository;

import com.example.geogame.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country, Long> {
    List<Country> findByLevelIdLessThanEqualOrderById(int levelId);
    List<Country> findByLevelId(int levelId);
    List<Country> findByLevelIdLessThan(int levelId);
}
