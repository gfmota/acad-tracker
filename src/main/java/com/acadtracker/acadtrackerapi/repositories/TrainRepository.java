package com.acadtracker.acadtrackerapi.repositories;

import com.acadtracker.acadtrackerapi.models.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainRepository extends JpaRepository<Train, String> {
}
