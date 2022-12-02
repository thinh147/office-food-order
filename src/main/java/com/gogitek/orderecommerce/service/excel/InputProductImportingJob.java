//package com.gogitek.orderecommerce.service.excel;
//
//
//import com.gogitek.orderecommerce.common.constant.ProductImportStatus;
//import com.gogitek.orderecommerce.config.dto.excel.req.ProviderProductData;
//import com.gogitek.orderecommerce.config.dto.excel.req.ProviderProductHeader;
//import com.gogitek.orderecommerce.config.excel.ValidateCell;
//import com.gogitek.orderecommerce.config.excel.ValidateRow;
//import com.gogitek.orderecommerce.database.entity.InputProductFileEntity;
//import com.gogitek.orderecommerce.database.repository.InputProductFileRepo;
//import com.gogitek.orderecommerce.database.repository.InputProductRepo;
//import com.nimbusds.oauth2.sdk.util.StringUtils;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.CellType;
//import org.apache.poi.ss.usermodel.DataFormatter;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.xssf.usermodel.XSSFSheet;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.springframework.scheduling.annotation.Async;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Slf4j
//@RequiredArgsConstructor
//@Component
//public class InputProductImportingJob{
//    private final InputProductFileRepo inputProductFileRepo;
//    private final InputProductRepo inputProductRepo;
//
//    @Async
//    public void importInputProductFile(XSSFWorkbook workbook, Long inputProductFileId,
//                                       Long userId, String userName){
//        Optional<InputProductFileEntity> fileOpt = inputProductFileRepo.findById(inputProductFileId);
//        if(fileOpt.isEmpty()) return;
//        InputProductFileEntity file = fileOpt.get();
//
//        try{
//            List<ValidateRow> invalidRows = new ArrayList<>();
//            List<ProviderProductData> validRows = new ArrayList<>();
//            XSSFSheet worksheet = workbook.getSheetAt(0);
//            file.setStatus(ProductImportStatus.IN_PROCESSING.name());
//            inputProductFileRepo.save(file);
//            int totalRows = worksheet.getPhysicalNumberOfRows();
//            for(int i = 1; i<worksheet.getPhysicalNumberOfRows(); i++){
//                Row row = worksheet.getRow(i);
//                if(isRowEmpty(row)) {
//                    totalRows -= 1;
//                    continue;
//                }
//                ValidateRow validateRow = validateRowData(row,1);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    private String getString(Cell cell) {
//        try {
//            cell.setCellType(CellType.STRING);
//            return cell.getStringCellValue();
//        } catch (Exception e) {
//            return null;
//        }
//    }
//
//    private Double getDouble(Cell cell) {
//        try {
//            return cell.getNumericCellValue();
//        } catch (Exception e) {
//            return null;
//        }
//    }
//
//    private ValidateCell validateCellNumericRequired(Row row, ProviderProductHeader header) {
//        DataFormatter formatter = new DataFormatter();
//        Cell numericCell = row.getCell(header.ordinal());
//        Double amount = null;
//        String errorMessage = "";
//        if (StringUtils.isNotBlank(formatter.formatCellValue(numericCell))) {
//            amount = getDouble(numericCell);
//        } else {
//            errorMessage = "Thiếu thông tin";
//        }
//
//        if (amount == null)
//            return ValidateCell.builder()
//                    .cellTitle(header.name())
//                    .value(formatter.formatCellValue(numericCell)).valid(false)
//                    .description(StringUtils.isBlank(errorMessage)? "Dữ liệu không phải số" : errorMessage).build();
//
//        String cellValue = header.equals(ProviderProductHeader.PRICE) || header.equals(ProviderProductHeader.DISCOUNT_PERCENT)
//                ? String.valueOf(amount.longValue()) : amount.toString();
//
//        return ValidateCell.builder()
//                .cellTitle(header.name())
//                .value(cellValue).valid(true).description("").build();
//    }
//
//    private ValidateCell validateCellStringRequired(Row row, ProviderProductHeader header) {
//        Cell cell = row.getCell(header.ordinal());
//        String cellValue = getString(cell);
//        if (StringUtils.isBlank(cellValue)) {
//            return ValidateCell.builder()
//                    .cellTitle(header.name())
//                    .value("").valid(false)
//                    .description("Thiếu thông tin").build();
//        }
//
//        return ValidateCell.builder()
//                .cellTitle(header.name())
//                .value(cellValue).valid(true).description("").build();
//    }
//
//    private ValidateRow validateRowData(Row row, int index) {
//        List<ValidateCell> cells = new ArrayList<>();
//        cells.add(validateCellNumericRequired(row, ProviderProductHeader.PRICE));
//        ValidateCell productNoCell = validateCellStringRequired(row, ProviderProductHeader.INVOICE_NO);
//        if (productNoCell.isValid()) {
//            String invoiceNo = excludeWhiteSpaces(
//                    getString(row.getCell(ProviderProductHeader.INVOICE_NO.ordinal())));
//            boolean isValid = invoiceNoPattern.matcher(invoiceNo).matches();
//            if (!isValid) {
//                cells.add(ValidateCell.builder()
//                        .cellTitle(ProviderProductHeader.INVOICE_NO.name())
//                        .value(invoiceNo).valid(false)
//                        .description("Số hóa đơn đầu vào tối đa 20 kí tự và chỉ gồm số").build());
//            } else {
//                cells.add(invoiceNoCell);
//            }
//        } else {
//            cells.add(invoiceNoCell);
//        }
//        ValidateCell requestDateCell = validateCellStringRequired(row, ProviderProductHeader.REQUEST_DATE);
//        if (requestDateCell.isValid()) {
//            String requestDate = excludeWhiteSpaces(
//                    getString(row.getCell(ProviderProductHeader.REQUEST_DATE.ordinal())));
//            if(DateTimeUtils.isDateValid(requestDate, DateTimeUtils.VN_DATE_FORMAT)) {
//                cells.add(requestDateCell);
//            } else {
//                cells.add(ValidateCell.builder()
//                        .cellTitle(ProviderProductHeader.REQUEST_DATE.name())
//                        .value(requestDate)
//                        .valid(false)
//                        .description("Vui lòng nhập đúng định dạng: dd/MM/yyyy")
//                        .build());
//            }
//        } else {
//            cells.add(requestDateCell);
//        }
//
//        cells.add(validateCellNumericRequired(row, ProviderProductHeader.AMOUNT));
//        cells.add(validateCellStringRequired(row, ProviderProductHeader.SIGN));
//        ValidateCell taxPercentCell = validateCellNumericRequired(row, ProviderProductHeader.TAX_PERCENT);
//        if (taxPercentCell.isValid()) {
//            double taxPercent = getDouble(row.getCell(ProviderProductHeader.TAX_PERCENT.ordinal()));
//            if (taxPercent > 1.0) {
//                cells.add(ValidateCell.builder()
//                        .cellTitle(ProviderProductHeader.TAX_PERCENT.name())
//                        .value(String.valueOf(taxPercent))
//                        .valid(false)
//                        .description("Thuế suất tối đa là 1 (tương ứng 100%)")
//                        .build());
//            } else {
//                cells.add(taxPercentCell);
//            }
//        } else {
//            cells.add(taxPercentCell);
//        }
//        String taxCode = excludeWhiteSpaces(
//                getString(row.getCell(ProviderProductHeader.HOTEL_TAX_CODE.ordinal())));
//        if (StringUtils.isNotBlank(taxCode) && !taxCodePattern.matcher(taxCode).matches()) {
//            cells.add(ValidateCell.builder()
//                    .cellTitle(ProviderProductHeader.HOTEL_TAX_CODE.name())
//                    .value(taxCode).valid(false)
//                    .description("Mã số thuế tối đa 20 kí tự và chỉ gồm chữ, số và gạch ngang").build());
//        } else {
//            cells.add(ValidateCell.builder()
//                    .cellTitle(ProviderProductHeader.HOTEL_TAX_CODE.name())
//                    .value(taxCode).valid(true).description("").build());
//        }
//        boolean valid = cells.stream().allMatch(it -> BooleanUtils.isTrue(it.isValid()));
//        String description = "";
//        if (!valid) {
//            description = "Dữ liệu không hợp lệ";
//        }
//        return ValidateRow.builder().description(description)
//                .cells(cells).valid(valid).index(index).build();
//    }
//
//    public static String excludeWhiteSpaces(String text) {
//        if (text == null)
//            return "";
//
//        return text.replaceAll("\\s+", "");
//    }
//
//    private static boolean isRowEmpty(Row row) {
//        boolean isEmpty = true;
//        DataFormatter dataFormatter = new DataFormatter();
//
//        if (row != null) {
//            for (Cell cell : row) {
//                if (dataFormatter.formatCellValue(cell).trim().length() > 0) {
//                    isEmpty = false;
//                    break;
//                }
//            }
//        }
//
//        return isEmpty;
//    }
//}