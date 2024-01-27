package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.Exercise;
import com.acadtracker.acadtrackerapi.models.Train;
import com.acadtracker.acadtrackerapi.models.User;
import com.acadtracker.acadtrackerapi.models.dto.TrainRequestDto;
import com.acadtracker.acadtrackerapi.repositories.TrainRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainServiceImp implements TrainService {
    @Autowired
    private TrainRepository trainRepository;

    @Override
    public Train addUserTrain(TrainRequestDto trainRequestDto, User user) {
        final var newTrain = new Train(trainRequestDto, user);
        return trainRepository.save(newTrain);
    }

    @Override
    @Transactional
    public Train renameTrain(String trainId, String newName) {
        final var train = trainRepository.findById(trainId).orElseThrow();
        train.setName(newName);
        trainRepository.save(train);
        return train;
    }

    @Override
    public void deleteTrain(String trainId) {
        trainRepository.deleteById(trainId);
    }

    @Override
    public boolean checkOwner(String trainId, User user) {
        final var train = trainRepository.findById(trainId).orElseThrow();
        return train.getUser().equals(user);
    }

    @Override
    public List<Exercise> getExercises(String trainId) {
        final var train = trainRepository.findById(trainId).orElseThrow();
        return train.getExercises();
    }
}
