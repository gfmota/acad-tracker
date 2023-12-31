package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.Train;
import com.acadtracker.acadtrackerapi.models.User;

import java.util.List;

public interface UserService {
    List<Train> getUserTrains(User user);
}
