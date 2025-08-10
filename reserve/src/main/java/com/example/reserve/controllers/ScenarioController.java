package com.example.reserve.controllers;

import com.example.reserve.dtos.AdminDto;
import com.example.reserve.dtos.ManagerDto;
import com.example.reserve.dtos.ScenarioDto;
import com.example.reserve.models.Scenario;
import com.example.reserve.services.ScenarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/scenario")
public class ScenarioController {
    private final ScenarioService scenarioService;

    public ScenarioController(ScenarioService scenarioService) {
        this.scenarioService = scenarioService;
    }

    // 시나리오 저장
    @PostMapping
    public ResponseEntity<?> createScenario(@RequestBody ScenarioDto.ScenarioCreateDto scenario) {
        try {
            // 시나리오 저장 로직
            return ResponseEntity.ok(ScenarioDto.toSimpleDto(
                            scenarioService.saveScenario(
                                    ScenarioDto.fromCreateDto(scenario)
                            )
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving scenario: " + e.getMessage());
        }
    }
    //조회

    // 시나리오 전체 조회
    @GetMapping
    public ResponseEntity<?> getAllScenarios() {
        try {
            List<ScenarioDto.SimpleScenarioDto> scenarios = scenarioService.getAllScenarios();
            return ResponseEntity.ok(scenarios);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching scenarios: " + e.getMessage());
        }
    }


    // 시나리오 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updateScenario(@PathVariable String id, @RequestBody ScenarioDto.ScenarioCreateDto updateDto) {
        try {
            // 기존 시나리오 조회
            Scenario existing = scenarioService.getScenarioById(id);


            existing.setName(updateDto.getName());
            existing.setKey(updateDto.getKey());
            existing.setIsDraft(updateDto.getIsDraft());
            existing.setVersion(updateDto.getVersion());
            existing.setVersionDescription(updateDto.getVersionDescription());

            Scenario updated = scenarioService.updateScenario(existing);

            return ResponseEntity.ok(ScenarioDto.toSimpleDto(updated));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating scenario: " + e.getMessage());
        }
    }


    //delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteScenario(@PathVariable String id) {
        try {
            Scenario scenario = scenarioService.getScenarioById(id); // 삭제할 대상 조회
            scenarioService.deleteScenario(scenario);
            return ResponseEntity.ok("Scenario deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting scenario: " + e.getMessage());
        }
    }

}
