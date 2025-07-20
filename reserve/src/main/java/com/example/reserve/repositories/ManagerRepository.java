package com.example.reserve.repositories;

import com.example.reserve.models.Manager;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerRepository extends MongoRepository<Manager, String> {
    List<Manager> findByCompanyId(String companyId);
}
