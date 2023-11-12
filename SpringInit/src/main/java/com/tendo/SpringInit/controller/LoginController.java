package com.tendo.SpringInit.controller;

import com.tendo.SpringInit.model.AppUser;
import com.tendo.SpringInit.model.Authority;
import com.tendo.SpringInit.repository.AuthorityRepository;
import com.tendo.SpringInit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthorityRepository authorityRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AppUser> registerUser(@RequestBody AppUser user) {
        try {
            String hashPwd = this.passwordEncoder.encode(user.getPassword());
            Set<Authority> userAuthorities = new HashSet<>();
            List<Authority> authorities = this.authorityRepository.findAuthorityByName("ADMIN");

            if(authorities.size() > 0) {
                userAuthorities.add(authorities.get(0));
            }

            user.setPassword(hashPwd);
            user.setCreatedDate(new Date());
            user.setAuthorities(userAuthorities);
            AppUser savedUser = this.userService.saveUser(user);

            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        }
        catch (Exception ex) {
            throw new RuntimeException("Unable to register user due to " + ex.getMessage());
        }
    }

    @GetMapping("/userLogin")
    public ResponseEntity<AppUser> getUserAfterSuccessfulLogin(Authentication authentication) {
        return this.userService.getUserByUsername(authentication.getName())
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseThrow(() -> new UsernameNotFoundException("User not found for username: " + authentication.getName()));
    }

    @PostMapping("/addAuthority")
    public ResponseEntity<Authority> addAuthority(@RequestBody Authority authority) {
        Authority savedAuthority = null;

        try {
            savedAuthority = this.authorityRepository.save(authority);
            return new ResponseEntity<>(savedAuthority, HttpStatus.CREATED);
        }
        catch (Exception ex) {
            throw new RuntimeException("Unable to create authority due to " + ex.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.status(HttpStatus.OK).body("Test is successful");
    }
}
