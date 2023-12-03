package com.tendo.SpringInit.service;

import com.tendo.SpringInit.model.AppUser;
import com.tendo.SpringInit.model.Authority;
import com.tendo.SpringInit.model.Role;
import com.tendo.SpringInit.repository.AuthorityRepository;
import com.tendo.SpringInit.repository.RoleRepository;
import com.tendo.SpringInit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        try
        {
            List<AppUser>       usersList       = this.userRepository.findByUsernameWithRolesAndAuthorities(username);
            Optional<AppUser>   userOptional    = Optional.ofNullable(usersList).map(users -> users.get(0));

            if (userOptional.isPresent())
            {
                return userOptional.map(user -> new User(user.getUsername(), user.getPassword(), getGrantedAuthorities(user))).get();
            }
        }
        catch (Exception e)
        {
            throw new UsernameNotFoundException("Unable to fetch user: " + username + " due to " + e.getMessage());
        }

        throw new UsernameNotFoundException("User Details not found for username: " + username);
    }

    public Optional<AppUser> getUserByUsername(String username)
    {
        try
        {
            List<AppUser>   usersList   =   this.userRepository.findByUsername(username);

            return Optional.ofNullable(usersList).map(users -> users.get(0));
        }
        catch (Exception ex)
        {
            return Optional.empty();
        }
    }

    public AppUser createNewUser(AppUser newUser)
    {
        String      hashPwd     =   this.passwordEncoder.encode(newUser.getPassword());
        Set<Role>   userRoles   =   new HashSet<>();
        List<Role>  roles       =   this.roleRepository.findRoleByName("ROLE_ADMIN"); // Adding Admin Role to new user

        if(!roles.isEmpty())
        {
            userRoles.add(roles.get(0));
        }

        newUser.setPassword(hashPwd);
        newUser.setCreatedDate(new Date());
        newUser.setRoles(userRoles);

        return saveUser(newUser);
    }

    public AppUser saveUser(AppUser user)
    {
        return this.userRepository.save(user);
    }

    private List<SimpleGrantedAuthority> getGrantedAuthorities(AppUser user)
    {
        List<SimpleGrantedAuthority>    grantedAuthorities  =   new ArrayList<>();

        for(Role role : user.getRoles())
        {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
            grantedAuthorities.addAll(role.getAuthorities().stream().map(auth -> new SimpleGrantedAuthority(auth.getName())).toList());
        }

        return grantedAuthorities;
    }

    public Authority saveAuthority(Authority newAuthority)
    {
        return this.authorityRepository.save(newAuthority);
    }

    public Role saveRole(Role newRole)
    {
        return this.roleRepository.save(newRole);
    }
}
