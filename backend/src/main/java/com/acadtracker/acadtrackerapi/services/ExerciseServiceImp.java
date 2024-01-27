package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.Exercise;
import com.acadtracker.acadtrackerapi.models.Record;
import com.acadtracker.acadtrackerapi.models.dto.ExerciseRequestDto;
import com.acadtracker.acadtrackerapi.repositories.ExerciseRepository;
import com.acadtracker.acadtrackerapi.repositories.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseServiceImp implements ExerciseService {
    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    TrainRepository trainRepository;

    @Override
    public Exercise addExercise(ExerciseRequestDto exerciseDto, String trainId) {
        final var train = trainRepository.findById(trainId).orElseThrow();
        final var newExercise = new Exercise(exerciseDto, train);
        return exerciseRepository.save(newExercise);
    }

    @Override
    public Exercise editExercise(String exerciseId, ExerciseRequestDto exerciseDto) {
        final var exercise = exerciseRepository.findById(exerciseId).orElseThrow();
        exercise.setName(exerciseDto.name());
        exercise.setSeries(exerciseDto.series());
        exercise.setReps(exerciseDto.reps());
        exerciseRepository.save(exercise);
        return exercise;
    }

    @Override
    public void deleteExercise(String exerciseId) {
        exerciseRepository.deleteById(exerciseId);
    }

    @Override
    public List<Record> getRecords(String exerciseId) {
        final var exercise = exerciseRepository.findById(exerciseId).orElseThrow();
        return exercise.getRecords();
    }
}
