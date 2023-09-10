package com.happysmile.reduce.models;

import java.util.List;

import lombok.Data;

enum METHOD_STATUS {
    THINKG,
    STUDY,
}

@Data
public class StudyThinkingJoin extends StudyMethod {
    private METHOD_STATUS status;
    private List<String> resourceIndex;

    public String IndexAnalysis(List<String> resourceIndex) {
        return null;
    }

    public METHOD_STATUS statusChange() {
        return null;
    }

    public String enviromentAnalysis(Enviroment enviroment) {
        return null;
    }

    public String AskingMasterForHelper(String question) {
        return null;
    }
}
