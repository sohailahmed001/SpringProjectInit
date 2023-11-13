package com.tendo.SpringInit.service;

import com.tendo.SpringInit.model.AppUser;
import com.tendo.SpringInit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> userOptional = getUserByUsername(username);

        if(userOptional.isPresent()) {
            return userOptional.map(user -> new User(user.getUsername(), user.getPassword(), getAuthorities(user))).get();
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

    private List<SimpleGrantedAuthority> getAuthorities(AppUser user) {
        return user.getAuthorities().stream().map(auth -> new SimpleGrantedAuthority(auth.getName())).collect(Collectors.toList());
    }
}
