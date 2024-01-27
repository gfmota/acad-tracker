package com.acadtracker.acadtrackerapi.repositories;

import com.acadtracker.acadtrackerapi.models.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, String> {
}
