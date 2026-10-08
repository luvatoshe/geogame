package com.example.geogame.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String isoCode;
    private String capital;
    private int levelId;

    public Country() {}

    public Country(String name, String isoCode, String capital, int levelId) {
        this.name = name;
        this.isoCode = isoCode;
        this.capital = capital;
        this.levelId = levelId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIsoCode() { return isoCode; }
    public void setIsoCode(String isoCode) { this.isoCode = isoCode; }

    public String getCapital() { return capital; }
    public void setCapital(String capital) { this.capital = capital; }

    public int getLevelId() { return levelId; }
    public void setLevelId(int levelId) { this.levelId = levelId; }
}