package com.acadtracker.acadtrackerapi.models.dto;

import lombok.NonNull;

public record AuthenticationDto(@NonNull String login, @NonNull String password) {}
