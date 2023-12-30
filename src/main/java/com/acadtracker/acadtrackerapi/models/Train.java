package com.acadtracker.acadtrackerapi.models;

import com.acadtracker.acadtrackerapi.models.dto.TrainDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "train")
@Entity
@Data
@NoArgsConstructor
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    public Train(TrainDto dto) {
        this.name = dto.name();
    }
}
