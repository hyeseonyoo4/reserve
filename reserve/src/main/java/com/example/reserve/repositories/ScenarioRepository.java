package com.example.reserve.repositories;

import com.example.reserve.models.Manager;
import com.example.reserve.models.Scenario;
import com.example.reserve.models.User;
import com.example.reserve.types.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ScenarioRepository extends MongoRepository<Scenario, String> {
    List<Scenario> findByKey(String key);
}
