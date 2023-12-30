package com.acadtracker.acadtrackerapi.controllers;

import com.acadtracker.acadtrackerapi.models.Train;
import com.acadtracker.acadtrackerapi.models.dto.TrainDto;
import com.acadtracker.acadtrackerapi.services.TrainService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/train")
public class TrainController {
    @Autowired
    private TrainService trainService;

    @GetMapping("")
    public ResponseEntity getTrains() {
        final var trains = trainService.getAllTrains();
        return ResponseEntity.ok(trains);
    }

    @PostMapping("")
    public ResponseEntity postTrain(@RequestBody @NonNull TrainDto body) {
        final var newTrain = new Train(body);
        trainService.addTrain(newTrain);
        return ResponseEntity.ok(newTrain);
    }

    @PutMapping("/{trainId}")
    public ResponseEntity renameTrain(@PathVariable @NonNull String trainId, @RequestBody @NonNull TrainDto body) {
        try {
            final var train = trainService.renameTrain(trainId, body.name());
            return ResponseEntity.ok(train);
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
