package com.acadtracker.acadtrackerapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Table(name = "record")
@Entity
@Data
@NoArgsConstructor
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private Integer value;

    private Date date;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    @JsonIgnoreProperties("records")
    private Exercise exercise;
}
