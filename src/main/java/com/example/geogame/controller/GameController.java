package com.example.geogame.controller;

import com.example.geogame.model.Country;
import com.example.geogame.model.Level;
import com.example.geogame.repository.CountryRepository;
import com.example.geogame.repository.LevelRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GameController {

    private final CountryRepository countryRepository;
    private final LevelRepository levelRepository;

    public GameController(CountryRepository countryRepository,
                          LevelRepository levelRepository) {
        this.countryRepository = countryRepository;
        this.levelRepository = levelRepository;
    }

    @GetMapping("/levels")
    public List<Level> getLevels() {
        return levelRepository.findAllByOrderByOrderIndexAsc();
    }

    @GetMapping("/levels/{id}/countries")
    public List<Country> getAllCountriesForLevel(@PathVariable int id) {
        return countryRepository.findByLevelIdLessThanEqualOrderById(id);
    }

    @GetMapping("/levels/{id}/lessons/{type}/countries")
    public List<Country> getLessonCountries(@PathVariable int id,
                                            @PathVariable String type) {
        if ("exam".equalsIgnoreCase(type)) {
            return buildExam(id);
        }
        return countryRepository.findByLevelId(id);
    }

    private List<Country> buildExam(int levelId) {
        if (levelId <= 2) {
            List<Country> all = countryRepository.findByLevelIdLessThanEqualOrderById(levelId);
            Collections.shuffle(all);
            return all;
        }

        List<Country> newCountries = new ArrayList<>(countryRepository.findByLevelId(levelId));
        List<Country> oldCountries = new ArrayList<>(countryRepository.findByLevelIdLessThan(levelId));

        Collections.shuffle(newCountries);
        Collections.shuffle(oldCountries);

        List<Country> result = new ArrayList<>();
        int newCount = Math.min(8, newCountries.size());
        result.addAll(newCountries.subList(0, newCount));

        int oldCount = Math.min(22, oldCountries.size());
        result.addAll(oldCountries.subList(0, oldCount));

        if (result.size() < 30 && newCountries.size() > newCount) {
            int need = 30 - result.size();
            int extraNew = Math.min(need, newCountries.size() - newCount);
            result.addAll(newCountries.subList(newCount, newCount + extraNew));
        }

        Collections.shuffle(result);
        return result;
    }
}
