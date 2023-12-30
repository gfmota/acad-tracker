package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.Train;
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
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    @Override
    public Train addTrain(Train newTrain) {
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
}
