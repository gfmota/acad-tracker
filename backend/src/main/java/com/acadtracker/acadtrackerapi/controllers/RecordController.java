package com.acadtracker.acadtrackerapi.controllers;

import com.acadtracker.acadtrackerapi.models.User;
import com.acadtracker.acadtrackerapi.models.dto.ExerciseRequestDto;
import com.acadtracker.acadtrackerapi.models.dto.ExerciseResponseDto;
import com.acadtracker.acadtrackerapi.models.mappers.ExerciseMapper;
import com.acadtracker.acadtrackerapi.services.ExerciseService;
import com.acadtracker.acadtrackerapi.services.TrainService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/record")
public class RecordController {
    @Autowired
    private TrainService trainService;

    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    private ExerciseMapper exerciseMapper;

    @GetMapping("/{trainId}")
    public ResponseEntity<List<ExerciseResponseDto>> getTrainExercises(@PathVariable @NonNull String trainId) {
        if (checkTrainOwner(trainId)) {
            return ResponseEntity.status(403).build();
        }
        final var exercises = trainService.getExercises(trainId);
        final var exercisesDto = exercises.stream().map(exercise -> exerciseMapper.toResponseDto(exercise)).toList();
        return ResponseEntity.ok(exercisesDto);
    }

    @PostMapping("/{trainId}")
    public ResponseEntity<ExerciseResponseDto> postExercise(@PathVariable @NonNull String trainId, @RequestBody @NonNull ExerciseRequestDto body) {
        if (checkTrainOwner(trainId)) {
            return ResponseEntity.status(403).build();
        }
        final var newExercise = exerciseService.addExercise(body, trainId);
        final var newExerciseDto = exerciseMapper.toResponseDto(newExercise);
        return ResponseEntity.ok(newExerciseDto);
    }

    @PutMapping("/{trainId}/{exerciseId}")
    public ResponseEntity<ExerciseResponseDto> renameTrain(@PathVariable @NonNull String trainId, @PathVariable @NonNull String exerciseId, @RequestBody @NonNull ExerciseRequestDto body) {
        if (checkTrainOwner(trainId)) {
            return ResponseEntity.status(403).build();
        }
        try {
            final var exercise = exerciseService.editExercise(exerciseId, body);
            final var exerciseDto = exerciseMapper.toResponseDto(exercise);
            return ResponseEntity.ok(exerciseDto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{trainId}/{exerciseId}")
    public ResponseEntity deleteTrain(@PathVariable @NonNull String trainId, @PathVariable @NonNull String exerciseId) {
        if (checkTrainOwner(trainId)) {
            return ResponseEntity.status(403).build();
        }
        exerciseService.deleteExercise(exerciseId);
        return ResponseEntity.ok().build();
    }

    private boolean checkTrainOwner(String trainId) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            return trainService.checkOwner(trainId, (User) authentication.getPrincipal());
    }
}
