package com.tendo.SpringInit.service;

import com.tendo.SpringInit.model.AppUser;
import com.tendo.SpringInit.model.Role;
import com.tendo.SpringInit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            List<AppUser> usersList = this.userRepository.findByUsernameWithRolesAndAuthorities(username);
            Optional<AppUser> userOptional = Optional.ofNullable(usersList).map(users -> users.get(0));

            if (userOptional.isPresent()) {
                return userOptional.map(user -> new User(user.getUsername(), user.getPassword(), getGrantedAuthorities(user))).get();
            }
        }
        catch (Exception e) {
            throw new UsernameNotFoundException("Unable to fetch user: " + username + " due to " + e.getMessage());
        }
        throw new UsernameNotFoundException("User Details not found for username: " + username);
    }

    public Optional<AppUser> getUserByUsername(String username) {
        try {
            List<AppUser> usersList = this.userRepository.findByUsername(username);
            return Optional.ofNullable(usersList).map(users -> users.get(0));
        }
        catch (Exception ex) {
            return Optional.empty();
        }
    }

    public AppUser saveUser(AppUser user) {
        return this.userRepository.save(user);
    }

    private List<SimpleGrantedAuthority> getGrantedAuthorities(AppUser user) {
        List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<>();

        for(Role role: user.getRoles()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
            grantedAuthorities.addAll(role.getAuthorities().stream().map(auth -> new SimpleGrantedAuthority(auth.getName())).toList());
        }
        return grantedAuthorities;
    }
}
