package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.Exercise;
import com.acadtracker.acadtrackerapi.models.Train;
import com.acadtracker.acadtrackerapi.models.User;
import com.acadtracker.acadtrackerapi.models.dto.TrainRequestDto;

import java.util.List;

public interface TrainService {
    Train addUserTrain(TrainRequestDto trainRequestDto, User user);

    Train renameTrain(String trainId, String newName);

    void deleteTrain(String trainId);

    boolean checkOwner(String trainId, User user);

    List<Exercise> getExercises(String trainId);
}
