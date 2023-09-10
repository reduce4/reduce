package com.happysmile.reduce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.happysmile.reduce.models.StudyMerials;
import com.happysmile.reduce.repository.StudyMerialsRepo;

import lombok.Data;

@Component
@Data
public class StudyMerialsService {

    @Autowired
    private StudyMerialsRepo studyMerialsRepo;

    public List<StudyMerials> fetchAllStudyMerials() {
        return studyMerialsRepo.findAll();
    }

    public void addStudyMerials(List<StudyMerials> studyMerials) {
        studyMerialsRepo.saveAll(studyMerials);
    }

    public void markStudyMerials(Long id, Float mark) {
        studyMerialsRepo.findById(id).ifPresent(value -> {
            value.setResourceQualityMark(mark);
            studyMerialsRepo.save(value);
        });
    }

    public void removeStudyMerials(List<Long> ids) {
        studyMerialsRepo.deleteAllById(ids);
    }

}
