package com.s1411mjava.edtech.security.controller;

import com.s1411mjava.edtech.dtos.LoginDto;
import com.s1411mjava.edtech.dtos.RegistryDto;
import com.s1411mjava.edtech.dtos.TokenDto;
import com.s1411mjava.edtech.dtos.UserDto;
import com.s1411mjava.edtech.security.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Authentication", description = "Authentication Endpoints")
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ResponseEntity<RegistryDto> register(@Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(authService.register(userDto));
    }

    @Operation(summary = "Login an user, get an access token")
    @PostMapping("/login")
    public ResponseEntity<TokenDto> register(@Valid @RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(authService.login(loginDto));
    }

}
