package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.aws.FileMetadata;
import org.springframework.web.multipart.MultipartFile;

public interface UploadImageService {
    FileMetadata uploadToAws(MultipartFile multipartFile);
    FileMetadata uploadToVps(MultipartFile multipartFile);
}
