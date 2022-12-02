package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.controller.dto.req.CategoryReq;
import com.gogitek.orderecommerce.controller.dto.req.MainCategoryReq;
import com.gogitek.orderecommerce.controller.service.CategoryService;
import com.gogitek.orderecommerce.exception.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/categories")
@Slf4j
@AllArgsConstructor
public class CategoryController {
    CategoryService categoryService;

    @GetMapping("/main")
    public Response getListMainCategory() {
        try {
            return GogitekResponse.ok(categoryService.findAllMainCategory());
        } catch (BadRequestException be) {
            return GogitekResponse.status(ResultCodes.INTERNAL_SERVER_ERROR);
        } catch (RuntimeException e) {
            log.error(e.getMessage(),e);
            return GogitekResponse.status(ResultCodes.NOT_FOUND);
        } catch (Exception ex) {
            return GogitekResponse.status(ResultCodes.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/category")
    public Response getCategoryById(@RequestParam(name = "id") Long id) {
        try {
            return GogitekResponse.ok(categoryService.findById(id));
        } catch (BadRequestException be) {
            return GogitekResponse.status(ResultCodes.BAD_REQUEST);
        } catch (RuntimeException e) {
            return GogitekResponse.status(ResultCodes.NOT_FOUND);
        } catch (Exception ex) {
            return GogitekResponse.status(ResultCodes.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/main-category/save")
    public Response createNewMainCategory(@RequestBody MainCategoryReq req) {
        try {
            categoryService.saveMainCategory(req);
            return GogitekResponse.ok(ResultCodes.SUCCESS);
        } catch (GogitekException e) {
            return GogitekResponse.fail(ResultCodes.CANT_SAVE, Collections.singletonList(new Error("", "", "Có lỗi xảy ra")));
        }
    }

    @PostMapping("/category/save")
    public Response createNewCategory(@RequestBody CategoryReq req) {
        try {
            categoryService.saveSubCategory(req);
            return GogitekResponse.ok();
        }catch (GogitekException e){
            return GogitekResponse.fail(ResultCodes.CANT_SAVE, Collections.singletonList(new Error("", "", "Có lỗi xảy ra")));
        }
    }
}
