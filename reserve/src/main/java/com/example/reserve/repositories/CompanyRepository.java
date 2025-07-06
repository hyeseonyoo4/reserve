package com.example.reserve.repositories;

import com.example.reserve.models.Company;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface CompanyRepository extends MongoRepository<Company, String> {

}
