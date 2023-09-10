package com.happysmile.reduce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.happysmile.reduce.models.LLM;
import com.happysmile.reduce.repository.LLMRepo;

import lombok.Data;

@Component
@Data
public class LLMService {
    @Autowired
    private LLMRepo llmRepo;

    public List<LLM> fetchAllLLMs() {
        return llmRepo.findAll();
    }

    public void addLLMs(List<LLM> llms) {
        llmRepo.saveAll(llms);
    }

    public void removeLLMs(List<Long> ids) {
        llmRepo.deleteAllById(ids);
    }
}
