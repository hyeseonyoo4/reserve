package com.example.reserve.controllers;

import com.example.reserve.dtos.AdminDto;
import com.example.reserve.dtos.ManagerDto;
import com.example.reserve.dtos.ScenarioDto;
import com.example.reserve.dtos.common.ResultEntity;
import com.example.reserve.dtos.common.ResultList;
import com.example.reserve.models.Scenario;
import com.example.reserve.services.ScenarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
            return ResponseEntity.ok(ScenarioDto.toSimpleDto(scenarioService.saveScenario(ScenarioDto.fromCreateDto(scenario))));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving scenario: " + e.getMessage());
        }
    }
    //조회

    // 시나리오 전체 조회
    @GetMapping
    public ResultEntity<?> getAllScenarios() {
        try {
            List<ScenarioDto.SimpleScenarioDto> scenarios = scenarioService.getAllScenarios()
                    .stream()
                    .map(ScenarioDto::toSimpleDto)
                    .collect(Collectors.toList());
            return ResultEntity.ok(new ResultList<>(scenarios));
        } catch (Exception e) {
            return new ResultEntity<>().fail("Error fetching scenarios: " + e.getMessage());
        }
    }

    // 시나리오 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updateScenario(@PathVariable String id, @RequestBody ScenarioDto.ScenarioCreateDto updateDto) {
        try {
            return ResponseEntity.ok(ScenarioDto.toSimpleDto(scenarioService.updateScenario(id, updateDto)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating scenario: " + e.getMessage());
        }
    }


    //delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteScenario(@PathVariable String id) {
        try {
            scenarioService.deleteScenario(id);
            return ResponseEntity.ok("Scenario deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting scenario: " + e.getMessage());
        }
    }
}
