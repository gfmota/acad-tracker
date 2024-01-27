package com.acadtracker.acadtrackerapi.models.mappers;

import com.acadtracker.acadtrackerapi.models.Train;
import com.acadtracker.acadtrackerapi.models.dto.TrainResponseDto;
import org.springframework.stereotype.Component;

@Component
public class TrainMapper {
    public TrainResponseDto toResponseDto(Train train) {
        return new TrainResponseDto(train.getId(), train.getName());
    }
}
