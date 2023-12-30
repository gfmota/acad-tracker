package com.acadtracker.acadtrackerapi.repositories;

import com.acadtracker.acadtrackerapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    public UserDetails findByLogin(String login);
}
