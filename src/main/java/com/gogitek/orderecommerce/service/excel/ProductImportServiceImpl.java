package com.gogitek.orderecommerce.service.excel;

import com.gogitek.orderecommerce.config.common.excel.req.ProviderProductHeader;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;
import com.gogitek.orderecommerce.controller.dto.res.ProductDto;
import com.gogitek.orderecommerce.dao.dto.ProductImportDto;
import com.gogitek.orderecommerce.database.entity.common.Product;
import com.gogitek.orderecommerce.database.repository.ProductRepo;
import com.monitorjbl.xlsx.StreamingReader;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductImportServiceImpl implements ProductImportService{
    private final ProductRepo productRepo;

    @Override
    @Transactional
    public List<ProductImportDto> importProduct(MultipartFile multipartFile) throws Exception{
        List<ProductImportDto> list = readExcelFile(multipartFile.getInputStream());
        List<Product> productList = new ArrayList<>();
        for(ProductImportDto dto : list){
            Product product = new Product();
            product.setName(dto.getName());
            product.setProductCode(dto.getProductCode());
            product.setDescription(dto.getDescription());
            product.setProductUrl(dto.getProductUrl());
            product.setAffiliateUrl(dto.getAffiliateUrl());
            product.setImageUrl(dto.getImageUrl());
            product.setPrice(Double.parseDouble(dto.getPrice() == null || "".equals(dto.getPrice()) ? "0" : dto.getPrice()));
            product.setPercentDiscount(Double.parseDouble(dto.getPercentDiscount() == null || "".equals(dto.getPercentDiscount()) ? "0" : dto.getPercentDiscount()));
            product.setChannel(dto.getChannel());
            product.setTrademark(dto.getTrademark());
            //TODO chua noi category
            product.setMetaData(dto.getMetadata());
            productList.add(product);
        }
        productRepo.saveAll(productList);
        return list;
    }

    private List<ProductImportDto> readExcelFile(InputStream inputStream){
        Workbook workbook = null;
        try {
            workbook = StreamingReader.builder()
                    .rowCacheSize(100)
                    .bufferSize(4096)
                    .open(inputStream);
        }catch (Exception e){
            throw new RuntimeException("");
        }
        if (workbook == null) {
            return null;
        }
        List<ProductImportDto> rowData = new LinkedList<>();
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rows = sheet.iterator();
        rows.next(); //remove header
        while(rows.hasNext()){
            List<String> cellData = new LinkedList<>();
            Row row = rows.next();
            for(Cell cell : row){
                cellData.add(cell.getStringCellValue());
            }
            rowData.add(convertCellDataToProductDto(cellData));
        }
        return rowData;
    }

    private ProductImportDto convertCellDataToProductDto(List<String> list){
        ProductImportDto productDto = new ProductImportDto();
        productDto.setName(list.get(ProviderProductHeader.PRODUCT_NAME.ordinal()));
        productDto.setProductCode(list.get(ProviderProductHeader.PRODUCT_CODE.ordinal()));
        productDto.setDescription(list.get(ProviderProductHeader.PRODUCT_DESCRIPTION.ordinal()));
        productDto.setProductUrl(list.get(ProviderProductHeader.LINK.ordinal()));
        productDto.setAffiliateUrl(list.get(ProviderProductHeader.AFFILIATE_LINK.ordinal()));
        productDto.setImageUrl(list.get(ProviderProductHeader.IMAGE_LINK.ordinal()));
        productDto.setPrice(list.get(ProviderProductHeader.PRICE.ordinal()));
        productDto.setPercentDiscount(list.get(ProviderProductHeader.DISCOUNT_PERCENT.ordinal()));
        productDto.setChannel(list.get(ProviderProductHeader.CHANNEL.ordinal()));
        productDto.setTrademark(list.get(ProviderProductHeader.TRADE_MARK.ordinal()));
        productDto.setMetadata(list.get(ProviderProductHeader.META_DATA.ordinal()));
        return productDto;
    }
}
