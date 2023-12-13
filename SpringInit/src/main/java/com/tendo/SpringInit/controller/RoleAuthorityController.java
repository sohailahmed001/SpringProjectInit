package com.tendo.SpringInit.controller;


import com.tendo.SpringInit.exception.NotFoundException;
import com.tendo.SpringInit.model.*;
import com.tendo.SpringInit.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class RoleAuthorityController
{

    @Autowired
    RoleService roleService;

    @GetMapping("/roles")
    private ResponseEntity<List<Role>> getRoles()
    {
        List<Role> roles = roleService.getAllRoles();

        return new ResponseEntity<List<Role>>(roles, HttpStatus.OK);
    }

    @GetMapping("/roles/{id}")
    private ResponseEntity<Role> getRoleByID(@PathVariable(value = "id") Long id) throws NotFoundException
    {
        Role role = roleService.getRoleByID(id);

        return new ResponseEntity<Role>(role, HttpStatus.OK);
    }

    @PostMapping("/roles")
    public ResponseEntity<Role> addRole(@RequestBody Role role)
    {
        try
        {
            Role    savedRole   =   roleService.saveRole(role);
            return new ResponseEntity<>(savedRole, HttpStatus.CREATED);
        }
        catch (Exception ex)
        {
            throw new RuntimeException("Unable to create role due to " + ex.getMessage());
        }
    }
}
