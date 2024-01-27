package com.acadtracker.acadtrackerapi.repositories;

import com.acadtracker.acadtrackerapi.models.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<Record, String> {
}
