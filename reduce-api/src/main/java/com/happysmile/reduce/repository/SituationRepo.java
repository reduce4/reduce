package com.happysmile.reduce.repository;

import org.springframework.data.repository.ListCrudRepository;

import com.happysmile.reduce.models.Situation;

public interface SituationRepo extends ListCrudRepository<Situation, Long> {

}
