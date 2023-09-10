package com.happysmile.reduce.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.happysmile.reduce.models.LLM;
import com.happysmile.reduce.models.Situation;
import com.happysmile.reduce.models.StudyMerials;
import com.happysmile.reduce.service.LLMService;
import com.happysmile.reduce.service.SituationService;
import com.happysmile.reduce.service.StudyMerialsService;

@RestController
public class Api {
    @Autowired
    private R<Object> r;
    @Autowired
    private StudyMerialsService studyMerialsService;
    @Autowired
    private LLMService llmService;
    @Autowired
    private SituationService situationService;

    @PostMapping("/studyMerials")
    public R studyMerials() throws Exception {
        return r.build(studyMerialsService.fetchAllStudyMerials());
    }

    @PostMapping("/llms")
    public R llms() {
        return r.build(llmService.fetchAllLLMs());
    }

    @PostMapping("/situations")
    public R situations() {
        return r.build(situationService.fetchAllSituations());
    }

    @PutMapping("/studyMerials")
    public R saveStudyMerials(@RequestBody List<StudyMerials> studyMerials) {
        studyMerialsService.addStudyMerials(studyMerials);
        return r.build(null);
    }

    @PutMapping("/llms")
    public R saveLLM(@RequestBody List<LLM> llms) {
        llmService.addLLMs(llms);
        return r.build(null);
    }

    @PutMapping("/situations")
    public R saveSituations(@RequestBody List<Situation> situations) {
        situationService.addSituations(situations);
        return r.build(null);
    }

    @DeleteMapping("/studyMerials")
    public R removeStudyMerials(@RequestBody List<Long> ids) {
        studyMerialsService.removeStudyMerials(ids);
        return r.build(null);
    }

    @DeleteMapping("/llms")
    public R removeLLMS(@RequestBody List<Long> ids) {
        llmService.removeLLMs(ids);
        return r.build(null);
    }

    @DeleteMapping("/situations")
    public R removeSituations(@RequestBody List<Long> ids) {
        situationService.removeSituations(ids);
        return r.build(null);
    }

}
