package com.happysmile.reduce.models;

import java.util.List;

import lombok.Data;

@Data
public abstract class Mind {
    List<String> trueWords;
    Domain domain;

    void practiceEnhancer() {
    }
}
