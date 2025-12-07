package com.example.reserve.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${image.upload.dir}")
    private String uploadDir;

    // 이미지 저장 및 메타데이터 반환
    public Map<String, Object> saveImageWithMetadata(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("빈 파일은 업로드할 수 없습니다.");
        }

        // 원본 파일명
        String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String fileExtension = getFileExtension(originalFilename); // 파일 확장자 추출

        // 난수화된 고유 파일명 생성
        String uniqueFileName = UUID.randomUUID().toString() + "." + fileExtension;

        // 업로드 경로 생성 및 파일 저장
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath); // 업로드 디렉토리가 없으면 생성
        }

        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath);

        // 메타데이터 생성
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("originalFilename", originalFilename); // 원본 파일명
        metadata.put("uniqueFilename", uniqueFileName);     // 서버에 저장된 난수화된 파일명
        metadata.put("fileUrl", "/images/" + uniqueFileName); // 파일에 접근할 수 있는 URL
        metadata.put("fileSize", file.getSize());           // 파일 크기 (byte 단위)
        metadata.put("contentType", file.getContentType()); // 파일의 MIME 타입 (ex: image/jpeg)

        return metadata;
    }

    public byte[] getImage(String filename) throws IOException {
        Path fileLocation = Paths.get(uploadDir).resolve(filename);

        if (!Files.exists(fileLocation)) {
            throw new IllegalArgumentException("파일을 찾을 수 없습니다: " + filename);
        }

        return Files.readAllBytes(fileLocation);
    }


    // 파일 확장자 추출
    private String getFileExtension(String fileName) {
        String[] parts = fileName.split("\\.");
        return parts.length > 1 ? parts[parts.length - 1] : ""; // 확장자가 없으면 빈 문자열
    }
}
