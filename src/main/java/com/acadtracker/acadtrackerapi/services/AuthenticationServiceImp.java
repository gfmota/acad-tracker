package com.acadtracker.acadtrackerapi.services;

import com.acadtracker.acadtrackerapi.models.User;
import com.acadtracker.acadtrackerapi.models.dto.AuthenticationDto;
import com.acadtracker.acadtrackerapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.InvalidNameException;

@Service
public class AuthenticationServiceImp implements AuthenticationService {
    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByLogin(username);
    }

    @Override
    public Authentication getAuthentication(AuthenticationDto authenticationDto) {
        final var usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(authenticationDto.login(), authenticationDto.password());
        return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    }


    @Override
    public void registerUser(AuthenticationDto authenticationDto) throws Exception {
        if (userRepository.findByLogin(authenticationDto.login()) != null) {
            throw new InvalidNameException();
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(authenticationDto.password());
        final var newUser = new User(authenticationDto.login(), encryptedPassword);

        userRepository.save(newUser);
    }
}
