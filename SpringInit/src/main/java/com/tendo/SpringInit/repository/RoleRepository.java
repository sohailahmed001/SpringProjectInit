package com.tendo.SpringInit.repository;

import com.tendo.SpringInit.model.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface RoleRepository extends CrudRepository<Role, Long> {
    @Query("SELECT r FROM Role r LEFT JOIN FETCH r.authorities WHERE r.name = :name")
    List<Role> findByNameWithAuthorities(String name);

    List<Role> findRoleByName(String name);
}
