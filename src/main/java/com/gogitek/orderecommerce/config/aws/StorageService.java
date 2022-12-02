package com.gogitek.orderecommerce.config.aws;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class StorageService {
    private final AmazonS3 s3Client;
    private final Tika tika = new Tika();

    @Value("${application.bucket.name}")
    private String bucketName;

    public Bucket createBucket(String bucketName) {
        if (s3Client.doesBucketExistV2(bucketName)) {
            return null;
        } else return s3Client.createBucket(bucketName);
    }

    public List<FileMetadata> createAttachment(List<MultipartFile> files) {
        return files.stream()
                .map(file -> {
                    String fileKey = "uploadFile-" + file.getOriginalFilename();
                    return put(bucketName, fileKey, file, true);
                })
                .collect(Collectors.toList());
    }

    public FileMetadata createOnlyAttachment(MultipartFile file){
        String fileKey = "upload_file" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("_yyyy_MM_dd_HH_mm_ss_")) + file.getOriginalFilename();
        return put(bucketName, fileKey, file, true);
    }

    public FileMetadata put(String bucket, String key, MultipartFile file, Boolean publicAccess) {
        FileMetadata metadata = FileMetadata
                .builder()
                .bucket(bucket)
                .key(key)
                .name(file.getOriginalFilename())
                .extension(StringUtils.getFilenameExtension(file.getOriginalFilename()))
                .mime(tika.detect(file.getOriginalFilename()))
                .size(file.getSize())
                .build();

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(metadata.getSize());
        objectMetadata.setContentType(metadata.getMime());

        try {
            InputStream stream = file.getInputStream();
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, key, stream, objectMetadata);
            PutObjectResult putObjectResult = s3Client.putObject(putObjectRequest);
            metadata.setUrl(s3Client.getUrl(bucket, key).toString());
            metadata.setHash(putObjectResult.getContentMd5());
            metadata.setEtag(putObjectResult.getETag());
            metadata.setPublicAccess(publicAccess);
        } catch (IOException e) {
            throw new RuntimeException("IOException");
        }
        return metadata;
    }
}