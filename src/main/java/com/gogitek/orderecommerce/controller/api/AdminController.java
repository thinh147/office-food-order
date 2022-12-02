package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.controller.dto.PropertyDto;
import com.gogitek.orderecommerce.controller.dto.req.SectionDto;
import com.gogitek.orderecommerce.controller.dto.req.VoucherReq;
import com.gogitek.orderecommerce.controller.service.CommonService;
import com.gogitek.orderecommerce.controller.service.ProductService;
import com.gogitek.orderecommerce.controller.service.SectionService;
import com.gogitek.orderecommerce.controller.service.VoucherService;
import com.gogitek.orderecommerce.service.excel.ProductImportService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/admin")
public class AdminController {
    CommonService commonService;
    ProductService productService;
    VoucherService voucherService;
    SectionService sectionService;

    ProductImportService productImportService;

    @GetMapping("/properties")
    public Response getListPropertySetting() {
        try {
            return GogitekResponse.ok(commonService.getListPropertySetting());
        } catch (Exception e) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Property", "Server Error", "Check Server at line 23 CommonController")));
        }
    }

    @PostMapping("/property/save")
    public Response alterPropertySetting(@RequestBody PropertyDto req) {
        try {
            return GogitekResponse.ok(commonService.settingProperty(req));
        } catch (Exception e) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Property", "Server Error", "Check Server at line 23 CommonController")));
        }
    }

    @PostMapping("/import-products")
    public Response importProductByExcel(@ModelAttribute MultipartFile file) {
        try {
            return GogitekResponse.ok(productImportService.importProduct(file));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Import", "", "")));
        }
    }

    @PostMapping("/create-voucher")
    public Response createVoucher(@RequestBody VoucherReq req) {
        try {
            return GogitekResponse.ok(voucherService.saveVoucherAndRelationTable(req));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Voucher", e.getMessage(), "")));
        }
    }

    @GetMapping("newest-property")
    public Response getNewestProperty() {
        try {
            return GogitekResponse.ok(commonService.getNewestPropertySetting());
        } catch (Exception e) {
            return GogitekResponse.fail(ResultCodes.NOT_FOUND, Collections.singletonList(new Error("Property", e.getMessage(), "")));
        }
    }

    @PostMapping("update-section")
    public Response updateSection(@RequestBody SectionDto sectionDto) {
        try {
            return GogitekResponse.ok(sectionService.updateSectionDto(sectionDto));
        } catch (Exception e) {
            return GogitekResponse.fail(ResultCodes.NOT_FOUND, Collections.singletonList(new Error("Property", e.getMessage(), "")));
        }
    }
}