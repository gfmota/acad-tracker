package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.Exercise;
import com.acadtracker.acadtrackerapi.models.Record;
import com.acadtracker.acadtrackerapi.models.dto.ExerciseRequestDto;

import java.util.List;

public interface ExerciseService {
    Exercise addExercise(ExerciseRequestDto exerciseDto, String trainId);

    Exercise editExercise(String exerciseId, ExerciseRequestDto exerciseDto);

    void deleteExercise(String exerciseId);

    List<Record> getRecords(String exerciseId);
}
