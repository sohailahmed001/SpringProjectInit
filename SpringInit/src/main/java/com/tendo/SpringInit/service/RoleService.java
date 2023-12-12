package com.tendo.SpringInit.service;


import com.tendo.SpringInit.exception.NotFoundException;
import com.tendo.SpringInit.model.*;
import com.tendo.SpringInit.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoleService
{
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    AuthorityRepository authorityRepository;

    public List<Role> getAllRoles()
    {
        return (List<Role>) roleRepository.findAll();
    }

    public Role getRoleByID(Long id) throws NotFoundException
    {
        return roleRepository.findById(id).orElseThrow(() -> new NotFoundException("Role"));
    }

    public List<Authority> getAuthorities()
    {
        return (List<Authority>) authorityRepository.findAll();
    }
}
