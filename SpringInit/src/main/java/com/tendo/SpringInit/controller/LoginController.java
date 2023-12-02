package com.tendo.SpringInit.controller;

import com.tendo.SpringInit.dto.LoginUserDTO;
import com.tendo.SpringInit.model.AppUser;
import com.tendo.SpringInit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class LoginController
{
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AppUser> registerUser(@RequestBody AppUser user)
    {
        try
        {
            AppUser savedUser   =   this.userService.createNewUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        }
        catch (Exception ex)
        {
            throw new RuntimeException("Unable to register user due to " + ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AppUser> getUserAfterSuccessfulLogin(@RequestBody LoginUserDTO loginUserDTO)
    {
        return this.userService.getUserByUsername(loginUserDTO.getUsername())
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseThrow(() -> new UsernameNotFoundException("User not found for username"));
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.status(HttpStatus.OK).body("Test is successful");
    }
}
