package com.tendo.SpringInit.controller;

import com.tendo.SpringInit.model.AppUser;
import com.tendo.SpringInit.model.Authority;
import com.tendo.SpringInit.model.Role;
import com.tendo.SpringInit.repository.AuthorityRepository;
import com.tendo.SpringInit.repository.RoleRepository;
import com.tendo.SpringInit.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import java.util.*;

@RestController
public class LoginController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthorityRepository authorityRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AppUser> registerUser(@RequestBody AppUser user) {
        try {
            String hashPwd = this.passwordEncoder.encode(user.getPassword());
            Set<Role> userRoles = new HashSet<>();
            List<Role> roles = this.roleRepository.findRoleByName("ROLE_ADMIN");

            if(!roles.isEmpty()) {
                userRoles.add(roles.get(0));
            }

            user.setPassword(hashPwd);
            user.setCreatedDate(new Date());
            user.setRoles(userRoles);
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

    @PostMapping("/addRole")
    public ResponseEntity<Role> addRole(@RequestBody Role role) {
        Role savedRole = null;

        try {
//            Set<Authority> authorities = role.getAuthorities();
//
//            for(Authority auth: authorities) {
//                Optional<Authority> authorityOptional = this.authorityRepository.findById(auth.getId());
//
//                if(authorityOptional.isPresent()) {
//
//                }
//            }
            savedRole = this.roleRepository.save(role);
            return new ResponseEntity<>(savedRole, HttpStatus.CREATED);
        }
        catch (Exception ex) {
            throw new RuntimeException("Unable to create role due to " + ex.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.status(HttpStatus.OK).body("Test is successful");
    }
}
