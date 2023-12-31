package com.acadtracker.acadtrackerapi.models;

import com.acadtracker.acadtrackerapi.models.dto.TrainRequestDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("trains")
    private User user;

    public Train(TrainRequestDto dto, User user) {

        this.name = dto.name();
        this.user = user;
    }
}
