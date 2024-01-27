package com.acadtracker.acadtrackerapi.models.mappers;

import com.acadtracker.acadtrackerapi.models.Exercise;
import com.acadtracker.acadtrackerapi.models.Train;
import com.acadtracker.acadtrackerapi.models.dto.ExerciseResponseDto;
import com.acadtracker.acadtrackerapi.models.dto.TrainResponseDto;
import org.springframework.stereotype.Component;

@Component
public class ExerciseMapper {
    public ExerciseResponseDto toResponseDto(Exercise exercise) {
        return new ExerciseResponseDto(exercise.getId(), exercise.getName(), exercise.getSeries(), exercise.getReps());
    }
}
