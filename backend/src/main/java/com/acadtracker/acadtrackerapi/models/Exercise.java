package com.acadtracker.acadtrackerapi.models;

import com.acadtracker.acadtrackerapi.models.dto.ExerciseRequestDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Table(name = "exercise")
@Entity
@Data
@NoArgsConstructor
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private Integer series;

    private Integer reps;

    @OneToMany(mappedBy = "exercise", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties("exercise")
    private List<Record> records = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "train_id")
    @JsonIgnoreProperties("exercises")
    private Train train;

    public Exercise (ExerciseRequestDto exerciseDto, Train train) {
        this.name = exerciseDto.name();
        this.series = exerciseDto.series();
        this.reps = exerciseDto.reps();
        this.train = train;
    }
}
