package com.example.reserve.services;

import com.example.reserve.models.Company;
import com.example.reserve.models.User;
import com.example.reserve.types.Role;
import com.example.reserve.repositories.CompanyRepository;
import com.example.reserve.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;


    public UserService(UserRepository userRepository, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    // User 저장
    public User saveUser(User user) {
        // Company 확인 (존재하지 않을 경우 예외 처리)
        companyRepository.findById(user.getCompanyId()).orElseThrow(() ->
                new RuntimeException("Company not found with id: " + user.getCompanyId()));
        return userRepository.save(user);
    }

    public List<User> getUsersByCompanyId(String companyId) {
        return userRepository.findByCompanyId(companyId);
    }

    public List<User> getUsersByCompanyIdAndRole(String companyId, Role role) {
        return userRepository.findByCompanyIdAndRole(companyId, role);
    }

    public Company getCompanyOfUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return companyRepository.findById(user.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

    }

    public User getUserById(String userId) {
        // 없을경우 예외 발생
//        Optional<User> optionalUser = userRepository.findById(userId);
//        if(optionalUser.isPresent()) {
//            return optionalUser.get();
//        } else {
//            throw new RuntimeException("User not found with id: " + userId);
//        }

        // 없을 경우 null 반환
//        return userRepository.findById(userId).orElse(null);

        // 없을 경우 예외 발생
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

}
