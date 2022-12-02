package com.gogitek.orderecommerce.service.impl.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.gogitek.orderecommerce.common.constant.ChannelList;
import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.controller.dto.MetadataDto;
import com.gogitek.orderecommerce.controller.dto.req.ProductListReq;
import com.gogitek.orderecommerce.controller.dto.req.ProductReq;
import com.gogitek.orderecommerce.controller.dto.res.ProductListRes;
import com.gogitek.orderecommerce.controller.service.CategoryService;
import com.gogitek.orderecommerce.controller.service.ProductService;
import com.gogitek.orderecommerce.dao.dto.ProductImportDto;
import com.gogitek.orderecommerce.database.converter.ProductConverter;
import com.gogitek.orderecommerce.database.entity.common.Metadata;
import com.gogitek.orderecommerce.database.entity.common.Product;
import com.gogitek.orderecommerce.database.repo_abstract.Dao;
import com.gogitek.orderecommerce.service.mapper.CategoryMapper;
import com.gogitek.orderecommerce.service.mapper.ProductMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class ProductServiceImp implements ProductService {

    ApplicationContext context;

    ProductMapper productMapper;

    CategoryService categoryService;

    CategoryMapper categoryMapper;


    private final Gson gson = new Gson();

    public Dao getDao() {
        return (Dao) context.getBean("productDao");
    }

    @Override
    public PaginationPage<ProductListRes> getListProduct(ProductListReq req, Integer page, Integer size, Integer sortType) {
        try {
            PaginationPage<ProductConverter> converters = getDao().product().getListProduct(req, page, size, sortType);
            PaginationPage<ProductListRes> res = new PaginationPage<>();
            List<ProductListRes> content = converters.getElements().stream()
                    .map(element -> productMapper.converterToResponse(element)).collect(Collectors.toList());

            res.setElements(content);
            res.setTotalElements(converters.getTotalElements());
            return res;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new MultiLangException(ResultCodes.GENERAL_ERROR);
        }
    }

    @Override
    @Transactional
    public ProductListRes save(ProductReq req) throws GogitekException {
        try {
            Product product = new Product();
            if (req.getId() != null) {
                Optional<Product> productOpt = getDao().product().findById(req.getId());
                if (productOpt.isPresent()) {
                    product = productOpt.get();
                    product.setUpdatedAt(Instant.now());
                }
            }
            if (req.getId() == null) product.setCreatedAt(Instant.now());

            //set Product properties
            product = productMapper.requestToEntity(req);
            product.setIsDelete(false);

            product.setMetaData(req.getMetaDataReqs());
            String metadata = req.getMetaDataReqs();
            Type listType = new TypeToken<List<MetadataDto>>() {
            }.getType();
            List<MetadataDto> metadataDtos = gson.fromJson(metadata, listType);
            List<Metadata> meta = metadataDtos.stream().map(item -> {
                Metadata metaRes = new Metadata();
                metaRes.setConfigName(item.getConfigurationName());
                metaRes.setOptions(item.getOptions());
                metaRes.setIsActive(1);
                metaRes.setCreatedAt(Instant.now());
                metaRes.setUpdatedAt(Instant.now());
                metaRes.setQuantity(item.getQuantity());
                return metaRes;
            }).collect(Collectors.toList());
            product.getMetadataList().addAll(meta);
            //set tracking
            getDao().product().saveAndFlush(product, req.getCategoryId());

            //set meta data


            ProductListRes res = productMapper.convertToResponse(product);
            res.setMetaData(req.getMetaDataReqs());
            res.setSubCategoryId(req.getCategoryId());
            res.setSubCategoryName(req.getCategoryName());
            return res;
        } catch (MultiLangException e) {
            log.error("failed to save product with name {} and channel {}", req.getName(), req.getChannel());
            throw e;
        }
    }

    @Transactional
    @Override
    public void deleted(List<Long> ids) throws GogitekException {
        try {
            List<Product> product = getDao().product().findByIdIn(ids).stream().peek(item -> item.setIsDelete(Boolean.TRUE)).collect(Collectors.toList());
            getDao().product().saveAll(product);
        } catch (Exception e) {
            log.error("can't not delete product!");
            throw new RuntimeException();
        }
    }
//
//    @Override
//    public void saveFileToDatabase(MultipartFile multipartFile) {
//        List<ProductImportDto> listDto = convertFileToProductDto(multipartFile);
//        List<Product> res = listDto.stream().map(item -> {
//            Product product = productMapper.dtoToEntity(item);
//            product.setMetaData("");
//            Metadata metadata = new Metadata();
//            metadata.setQuantity(item.getQuantity());
//            metadata.setOptions(item.getOption());
//            metadata.setConfigName(item.getConfig());
//            metadata.setCreatedAt(Instant.now());
//            product.getMetadataList().add(metadata);
//            return product;
//        }).collect(Collectors.toList());
//        getDao().product().saveAll(res);
//    }
//
//    private Object getCellValue(Cell cell) {
//        switch (cell.getCellType()) {
//            case STRING:
//                return cell.getStringCellValue();
//
//            case BOOLEAN:
//                return cell.getBooleanCellValue();
//
//            case NUMERIC:
//                return cell.getNumericCellValue();
//        }
//        return null;
//    }
//
//    public List<ProductImportDto> convertFileToProductDto(MultipartFile file) {
//        List<ProductImportDto> listImportDto = new ArrayList<>();
//        try {
//            InputStream inputStream = new BufferedInputStream(file.getInputStream());
//            Workbook workbook = new XSSFWorkbook(inputStream);
//            Sheet firstSheet = workbook.getSheet("Format");
//
//            for (Row nextRow : firstSheet) {
//                Iterator<Cell> cellIterator = nextRow.cellIterator();
//                ProductImportDto product = new ProductImportDto();
//                while (cellIterator.hasNext()) {
//                    Cell nextCell = cellIterator.next();
//                    int columnIndex = nextCell.getColumnIndex();
//
//                    switch (columnIndex) {
//                        case 0:
//                            product.setProductCode((String) getCellValue(nextCell));
//                        case 1:
//                            product.setName((String) getCellValue(nextCell));
//                        case 2:
//                            product.setDescription((String) getCellValue(nextCell));
//                            break;
//                        case 3:
//                            product.setProductUrl((String) getCellValue(nextCell));
//                            break;
//                        case 4:
//                            product.setAffiliateUrl((String) getCellValue(nextCell));
//                            break;
//                        case 5:
//                            product.setImageUrl((String) getCellValue(nextCell));
//                            break;
//                        case 6:
//                            product.setPrice((Double) getCellValue(nextCell));
//                            break;
//                        case 7:
//                            product.setPercentDiscount((Double) (getCellValue(nextCell)));
//                            break;
//                        case 8:
//                            Double channel = (Double) getCellValue(nextCell);
//                            if (channel == null) product.setChannel(null);
//                            else {
//                                product.setChannel(ChannelList.valueOfType(channel.intValue()).getTypeInStr());
//                            }
//                            break;
//                        case 9:
//                            product.setTrademark((String) getCellValue(nextCell));
//                            break;
//                        case 10:
//                            Double category = (Double) getCellValue(nextCell);
//                            product.setCategory(category == null ? null : category.intValue());
//                            break;
//                        case 11:
//                            product.setConfig((String) getCellValue(nextCell));
//                            break;
//                        case 12:
//                            product.setOption((String) getCellValue(nextCell));
//                            break;
//                        case 13:
//                            Double quantity = (Double) getCellValue(nextCell);
//                            product.setQuantity(quantity == null ? null : quantity.intValue());
//                            break;
//                        default:
//                            break;
//                    }
//                }
//
//                listImportDto.add(product);
//            }
//            workbook.close();
//            inputStream.close();
//        } catch (Exception e) {
//            log.error(e.getMessage(), e);
//        }
//
//        return listImportDto;
//    }

    @Override
    public ProductListRes getProductById(Long id) {
        try {
            Optional<ProductConverter> productOpt = getDao().product().findProductByIdNativeQuery(id);
            if (productOpt.isEmpty()) throw new MultiLangException(ResultCodes.FORBIDDEN);
            ProductConverter product = productOpt.get();
            return productMapper.converterToResponse(product);
        } catch (NotFoundException e) {
            log.error(e.getMessage(), e);
            throw e;
        }
    }
}
