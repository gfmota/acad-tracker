package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.Train;
import com.acadtracker.acadtrackerapi.models.User;
import com.acadtracker.acadtrackerapi.models.dto.TrainRequestDto;

public interface TrainService {
    Train addUserTrain(TrainRequestDto trainRequestDto, User user);

    Train renameTrain(String trainId, String newName);

    void deleteTrain(String trainId);
}
