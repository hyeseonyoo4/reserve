package com.example.reserve.repositories;

import com.example.reserve.models.Scenario;
import com.example.reserve.models.User;
import com.example.reserve.types.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ScenarioRepository extends MongoRepository<Scenario, String> {

}
