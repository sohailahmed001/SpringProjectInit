package com.tendo.SpringInit.service;


import com.tendo.SpringInit.exception.NotFoundException;
import com.tendo.SpringInit.model.*;
import com.tendo.SpringInit.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public List<Role> getAllRolesWithAuthorities() {
        return (List<Role>) roleRepository.findAllWithAuthorities();
    }

    public Role getRoleByID(Long id) throws NotFoundException
    {
        return roleRepository.findById(id).orElseThrow(() -> new NotFoundException(Role.class));
    }

    public Role getRoleByIdWithAuthorities(Long id) throws NotFoundException
    {
        return roleRepository.findByIdWithAuthorities(id).orElseThrow(() -> new NotFoundException(Role.class));
    }

    public List<Authority> getAuthorities()
    {
        return (List<Authority>) authorityRepository.findAll();
    }

    public Role saveRole(Role newRole)
    {
        if(newRole.getName() != null && !newRole.getName().toUpperCase().startsWith("ROLE_")) {
            newRole.setName("ROLE_" + newRole.getName());
        }
        return this.roleRepository.save(newRole);
    }

    public void deleteRole(Long id)
    {
        Role role = getRoleByIdWithAuthorities(id);
        roleRepository.delete(role);
    }
}
