package com.example.reserve.controllers;

import com.example.reserve.dtos.ScenarioDto;
import com.example.reserve.services.ScenarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
