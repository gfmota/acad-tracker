package com.acadtracker.acadtrackerapi.controllers;

import com.acadtracker.acadtrackerapi.infra.security.TokenService;
import com.acadtracker.acadtrackerapi.models.User;
import com.acadtracker.acadtrackerapi.models.dto.AuthenticationDto;
import com.acadtracker.acadtrackerapi.services.AuthenticationService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.InvalidNameException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @NonNull AuthenticationDto body) {
        final var auth = authenticationService.getAuthentication(body);
        final var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @NonNull AuthenticationDto body) {
        try {
            authenticationService.registerUser(body);
            return ResponseEntity.ok().build();
        } catch (InvalidNameException e) {
            return ResponseEntity.status(400).body("Login already in use");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
