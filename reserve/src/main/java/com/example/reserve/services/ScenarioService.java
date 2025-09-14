package com.example.reserve.services;

import com.example.reserve.dtos.ScenarioDto;
import com.example.reserve.models.Scenario;
import com.example.reserve.models.blocks.Block;
import com.example.reserve.repositories.ScenarioRepository;
import com.example.reserve.types.BlockType;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ScenarioService {
    private final ScenarioRepository scenarioRepository;

    public ScenarioService(ScenarioRepository scenarioRepository) {
        this.scenarioRepository = scenarioRepository;
    }

    public Scenario createScenario(Scenario scenario) {
        // TODO: 이름 중복 확인
        scenario.getBlocks().add(
                Block.builder()
                        .id(UUID.randomUUID().toString())
                        .name("Start")
                        .type(BlockType.START)
                        .x(0.0)
                        .y(0.0)
                        .build()
        );
        return scenarioRepository.save(scenario);
    }

    public void saveScenario(Scenario scenario) {
        scenarioRepository.save(scenario);
    }
    // 💡 ID로 조회
    public Scenario getScenarioById(String id) {
        return scenarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scenario not found"));
    }
    //시나리오 조회
    public List<Scenario> getAllScenarios() {
        return scenarioRepository.findAll();
    }

    //업데이트
    public Scenario updateScenario(String id, ScenarioDto.ScenarioCreateDto updateDto) {
        // 기존 시나리오 조회
        Scenario existing = this.getScenarioById(id);

        existing.setName(updateDto.getName());
        existing.setKey(updateDto.getKey());
        existing.setIsDraft(updateDto.getIsDraft());
        existing.setVersion(updateDto.getVersion());
        existing.setVersionDescription(updateDto.getVersionDescription());

        return scenarioRepository.save(existing);
    }

    // 삭제
    public void deleteScenario(String id) {
        Scenario scenario = this.getScenarioById(id);
        scenarioRepository.delete(scenario);
    }

//    private final UserRepository userRepository;
//    private final CompanyRepository companyRepository;
//
//
//    public ScenarioService(UserRepository userRepository, CompanyRepository companyRepository) {
//        this.userRepository = userRepository;
//        this.companyRepository = companyRepository;
//    }
//
//    // User 저장
//    public User saveUser(User user) {
//        // Company 확인 (존재하지 않을 경우 예외 처리)
//        companyRepository.findById(user.getCompanyId()).orElseThrow(() ->
//                new RuntimeException("Company not found with id: " + user.getCompanyId()));
//        return userRepository.save(user);
//    }
//
//    public List<User> getUsersByCompanyId(String companyId) {
//        return userRepository.findByCompanyId(companyId);
//    }
//
//    public List<User> getUsersByCompanyIdAndRole(String companyId, Role role) {
//        return userRepository.findByCompanyIdAndRole(companyId, role);
//    }
//
//    public Company getCompanyOfUser(String userId) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
//        return companyRepository.findById(user.getCompanyId())
//                .orElseThrow(() -> new RuntimeException("Company not found"));
//
//    }
//
//    public User getUserById(String userId) {
//        // 없을경우 예외 발생
////        Optional<User> optionalUser = userRepository.findById(userId);
////        if(optionalUser.isPresent()) {
////            return optionalUser.get();
////        } else {
////            throw new RuntimeException("User not found with id: " + userId);
////        }
//
//        // 없을 경우 null 반환
////        return userRepository.findById(userId).orElse(null);
//
//        // 없을 경우 예외 발생
//        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
//    }

}
