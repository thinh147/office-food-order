package com.gogitek.orderecommerce.config.storage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    private final PlatformTransactionManager transactionManager;
    @Autowired
    public FileStorageService(Environment env, PlatformTransactionManager transactionManager) {
        this.fileStorageLocation = Paths.get(env.getProperty("app.file.upload-dir", "./upload-file"))
                .toAbsolutePath().normalize();
        this.transactionManager = transactionManager;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException(
                    "Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    private String getFileExtension(String fileName) {
        if (fileName == null) {
            return null;
        }
        String[] fileNameParts = fileName.split("\\.");

        return fileNameParts[fileNameParts.length - 1];
    }

    public void storeFile(MultipartFile file) {
        // Normalize file name
        String fileName =
                new Date().getTime() + "-file." + getFileExtension(file.getOriginalFilename());

        try {
            // Check if the filename contains invalid characters
            if (fileName.contains("..")) {
                throw new RuntimeException(
                        "Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public String save(MultipartFile[] files){
        try{
            String message = "";
            List<String> filesNames = new ArrayList<>();
            Arrays.stream(files).forEach(file -> {
                DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
                TransactionStatus transaction = transactionManager.getTransaction(definition);
                try{
                    storeFile(file);
                    transactionManager.commit(transaction);
                }catch (Exception e){
                    transactionManager.rollback(transaction);
                    throw new RuntimeException(e.getMessage());
                }
                filesNames.add(file.getOriginalFilename());
            });
            message = "upload successfully" + filesNames;
            return  message;
        }catch (Exception e){
            throw  new RuntimeException("Loi");
        }
    }
}
