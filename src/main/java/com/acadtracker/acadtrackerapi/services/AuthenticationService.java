package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.dto.AuthenticationDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthenticationService extends UserDetailsService {
    public Authentication getAuthentication(AuthenticationDto authenticationDto);

    public void registerUser(AuthenticationDto authenticationDto) throws Exception;
}
