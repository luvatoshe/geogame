package com.example.geogame.repository;

import com.example.geogame.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LevelRepository extends JpaRepository<Level, Long> {
    List<Level> findAllByOrderByOrderIndexAsc();
}
