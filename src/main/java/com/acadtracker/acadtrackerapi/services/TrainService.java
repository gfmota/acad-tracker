package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.Train;

import java.util.List;

public interface TrainService {
    public List<Train> getAllTrains();

    public Train addTrain(Train newTrain);

    public Train renameTrain(String trainId, String newName);

    public void deleteTrain(String trainId);
}
