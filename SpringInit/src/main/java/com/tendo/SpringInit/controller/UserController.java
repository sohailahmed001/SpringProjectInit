package com.tendo.SpringInit.controller;

import com.tendo.SpringInit.exception.NotFoundException;
import com.tendo.SpringInit.model.AppUser;
import com.tendo.SpringInit.model.Authority;
import com.tendo.SpringInit.model.Role;
import com.tendo.SpringInit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController
{
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        List<AppUser> users = this.userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable(value = "id") Long userId) throws NotFoundException {
        return this.userService.getUserById(userId)
            .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
            .orElseThrow(() -> new NotFoundException(AppUser.class));
    }

    @PostMapping("/users")
    public ResponseEntity<AppUser> updateUser(@RequestBody AppUser user) {
        try {
            AppUser savedUser = this.userService.addOrUpdateUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        }
        catch (Exception ex) {
            throw new RuntimeException("Unable to update user due to " + ex.getMessage());
        }
    }

    @GetMapping("/authorities")
    public ResponseEntity<List<Authority>> getAllAuthorities() {
        List<Authority> authorities = this.userService.getAllAuthorities();
        return new ResponseEntity<>(authorities, HttpStatus.OK);
    }

    @PostMapping("/authority")
    public ResponseEntity<Authority> addAuthority(@RequestBody Authority authority)
    {
        try
        {
            Authority   savedAuthority  =   this.userService.saveAuthority(authority);
            return new ResponseEntity<>(savedAuthority, HttpStatus.CREATED);
        }
        catch (Exception ex) {
            throw new RuntimeException("Unable to create authority due to " + ex.getMessage());
        }
    }
}
