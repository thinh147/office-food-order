package com.gogitek.orderecommerce.service.excel;

import com.gogitek.orderecommerce.dao.dto.ProductImportDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductImportService {
    List<ProductImportDto> importProduct(MultipartFile multipartFile) throws Exception;
}
