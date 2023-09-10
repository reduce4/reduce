package com.happysmile.reduce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.happysmile.reduce.repository.SituationRepo;
import com.happysmile.reduce.models.Situation;

import lombok.Data;

@Data
@Component
public class SituationService {
    @Autowired
    private SituationRepo situationRepo;

    public List<Situation> fetchAllSituations() {
        return situationRepo.findAll();
    }

    public void addSituations(List<Situation> situations) {
        situationRepo.saveAll(situations);
    }

    public void removeSituations(List<Long> ids) {
        situationRepo.deleteAllById(ids);
    }

}
