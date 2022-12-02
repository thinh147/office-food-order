package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.config.aws.FileMetadata;
import com.gogitek.orderecommerce.config.aws.StorageService;
import com.gogitek.orderecommerce.config.storage.FileStorageService;
import com.gogitek.orderecommerce.controller.service.UploadImageService;
import lombok.AllArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.FileNameMap;
import java.net.URLConnection;

@Service
@AllArgsConstructor
public class UploadImageServiceImp implements UploadImageService {
    StorageService amazonClient;
    FileStorageService storageService;

    @Override
    public FileMetadata uploadToAws(MultipartFile multipartFile) {
        if(multipartFile.isEmpty()) return null;
        return amazonClient.createOnlyAttachment(multipartFile);
    }

    @Override
    public FileMetadata uploadToVps(MultipartFile multipartFile) {
        storageService.storeFile(multipartFile);
        FileNameMap fileNameMap = URLConnection.getFileNameMap();
        String mimeType = fileNameMap.getContentTypeFor(multipartFile.getName());
        return FileMetadata.builder()
                .bucket("vps")
                .key("no-key")
                .name(multipartFile.getOriginalFilename())
                .extension(StringUtils.getFilenameExtension(multipartFile.getOriginalFilename()))
                .mime(mimeType)
                .size(multipartFile.getSize())
                .build();
    }
}
