package com.acadtracker.acadtrackerapi.models;

import com.acadtracker.acadtrackerapi.models.dto.TrainRequestDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Table(name = "train")
@Entity
@Data
@NoArgsConstructor
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @OneToMany(mappedBy = "train", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties("train")
    private List<Exercise> exercises = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("trains")
    private User user;

    public Train(TrainRequestDto dto, User user) {

        this.name = dto.name();
        this.user = user;
    }
}
