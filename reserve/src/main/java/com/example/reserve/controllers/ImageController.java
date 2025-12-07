package com.example.reserve.controllers;

import com.example.reserve.dtos.common.ResultEntity;
import com.example.reserve.services.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;

    @Value("${image.upload.dir}")
    private String uploadDir;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    // 이미지 업로드
    @PostMapping("/upload")
    public ResultEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // 이미지 저장 및 메타데이터 반환
            Map<String, Object> metadata = imageService.saveImageWithMetadata(file);

            // 성공 응답 (ResultEntity 형태로 메타데이터 반환)
            return ResultEntity.ok(metadata);
        } catch (IOException e) {
            // 실패 응답 (ResultEntity 형태로 반환)
            return new ResultEntity<>().fail("이미지 업로드 실패: " + e.getMessage());
        }
    }


    // 이미지 다운로드/읽기
    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable("filename") String filename) {
        try {
            byte[] imageData = imageService.getImage(filename);

            // Content-Type 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // 기본 Content-Type (필요에 따라 변경 가능)
            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}