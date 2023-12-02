package com.tendo.SpringInit.controller;

import com.tendo.SpringInit.model.Authority;
import com.tendo.SpringInit.model.Role;
import com.tendo.SpringInit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/authority")
    public ResponseEntity<Authority> addAuthority(@RequestBody Authority authority) {
        Authority savedAuthority = null;

        try {
            savedAuthority = this.userService.saveAuthority(authority);
            return new ResponseEntity<>(savedAuthority, HttpStatus.CREATED);
        }
        catch (Exception ex) {
            throw new RuntimeException("Unable to create authority due to " + ex.getMessage());
        }
    }

    @PostMapping("/role")
    public ResponseEntity<Role> addRole(@RequestBody Role role) {
        Role savedRole = null;

        try {
            savedRole = this.userService.saveRole(role);
            return new ResponseEntity<>(savedRole, HttpStatus.CREATED);
        }
        catch (Exception ex) {
            throw new RuntimeException("Unable to create role due to " + ex.getMessage());
        }
    }
}
