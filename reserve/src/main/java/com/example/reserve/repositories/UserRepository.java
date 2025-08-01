package com.example.reserve.repositories;

import com.example.reserve.models.User;
import com.example.reserve.types.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByCompanyId(String companyId);
    List<User> findByCompanyIdAndRole(String companyId, Role role);
}
