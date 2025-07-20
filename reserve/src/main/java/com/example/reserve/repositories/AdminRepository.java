package com.example.reserve.repositories;

import com.example.reserve.models.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    // 필요 시 커스텀 메서드 추가 가능
}
