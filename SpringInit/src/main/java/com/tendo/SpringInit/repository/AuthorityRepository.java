package com.tendo.SpringInit.repository;

import com.tendo.SpringInit.model.Authority;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface AuthorityRepository extends CrudRepository<Authority,Long> {
    List<Authority> findAuthorityByName(String name);
}
