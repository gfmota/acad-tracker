package com.acadtracker.acadtrackerapi.controllers;

import com.acadtracker.acadtrackerapi.models.User;
import com.acadtracker.acadtrackerapi.models.dto.TrainRequestDto;
import com.acadtracker.acadtrackerapi.models.dto.TrainResponseDto;
import com.acadtracker.acadtrackerapi.models.mappers.TrainMapper;
import com.acadtracker.acadtrackerapi.services.TrainService;
import com.acadtracker.acadtrackerapi.services.UserService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/train")
public class TrainController {
    @Autowired
    private TrainService trainService;

    @Autowired
    private UserService userService;

    @Autowired
    private TrainMapper trainMapper;

    @GetMapping("")
    public ResponseEntity<List<TrainResponseDto>> getTrains(User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final var trains = userService.getUserTrains((User) authentication.getPrincipal());
        final var trainsDto = trains.stream().map(train -> trainMapper.toResponseDto(train)).toList();
        return ResponseEntity.ok(trainsDto);
    }

    @PostMapping("")
    public ResponseEntity<TrainResponseDto> postTrain(@RequestBody @NonNull TrainRequestDto body) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final var newTrain = trainService.addUserTrain(body, (User) authentication.getPrincipal());
        final var newTrainDto = trainMapper.toResponseDto(newTrain);
        return ResponseEntity.ok(newTrainDto);
    }

    @PutMapping("/{trainId}")
    public ResponseEntity<TrainResponseDto> renameTrain(@PathVariable @NonNull String trainId, @RequestBody @NonNull TrainRequestDto body) {
        try {
            final var train = trainService.renameTrain(trainId, body.name());
            final var trainDto = trainMapper.toResponseDto(train);
            return ResponseEntity.ok(trainDto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{trainId}")
    public ResponseEntity deleteTrain(@PathVariable @NonNull String trainId) {
        trainService.deleteTrain(trainId);
        return ResponseEntity.ok().build();
    }
}
