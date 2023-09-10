package com.happysmile.reduce.models;

import lombok.Data;

@Data
public class StudyMethod {
    private String methodName;
    private String methodContentUrl;
    private Situation situation;
    private StudyPlan studyPlan;

    public StudyPlan makeStudyPlan(StudyPlan self, StudyMerials studyMerials, EmptyTime emptyTime) {
        return null;
    }
}
