package com.happysmile.reduce.models;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class EmptyTime {
    private float startTimeTimeStamp;
    private float endTimeTimeStamp;
    private EmptyTime nextEmptyTime;
    private EmptyTime prevEmptyTime;

    public List<EmptyTime> findTodayAllEmptyTime() {
        EmptyTime firstEmptyTime = null;
        firstEmptyTime = this;
        while (firstEmptyTime.getPrevEmptyTime() != null) {
            firstEmptyTime = firstEmptyTime.getPrevEmptyTime();
        }
        List<EmptyTime> lists = new ArrayList<>();
        while (firstEmptyTime != null) {
            lists.add(firstEmptyTime);
            firstEmptyTime = firstEmptyTime.getNextEmptyTime();
        }
        return lists;
    }
}
