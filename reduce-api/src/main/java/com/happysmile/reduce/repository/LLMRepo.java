package com.happysmile.reduce.repository;

import org.springframework.data.repository.ListCrudRepository;

import com.happysmile.reduce.models.LLM;

public interface LLMRepo extends ListCrudRepository<LLM, Long> {

}
