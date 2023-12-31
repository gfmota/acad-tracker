package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.Train;
import com.acadtracker.acadtrackerapi.models.User;
import com.acadtracker.acadtrackerapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Train> getUserTrains(User user) {
        return user.getTrains();
    }
}
