package com.gogitek.orderecommerce.controller.api;

import com.amazonaws.services.kms.model.NotFoundException;
import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.config.storage.FileStorageService;
import com.gogitek.orderecommerce.controller.dto.req.*;
import com.gogitek.orderecommerce.controller.dto.req.ProductListReq;
import com.gogitek.orderecommerce.controller.dto.req.ProductReq;
import com.gogitek.orderecommerce.controller.service.ProductService;
import com.gogitek.orderecommerce.controller.service.UploadImageService;
import com.gogitek.orderecommerce.exception.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;

@Slf4j
@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    ProductService productService;

    UploadImageService uploadImageService;

    FileStorageService storageService;

    @GetMapping()
    public Response getListProduct(ProductListReq req,
                                   @RequestParam(name = "page", defaultValue = "0") Integer page,
                                   @RequestParam(name = "size", defaultValue = "20") Integer size,
                                   @RequestParam(name = "sort", defaultValue = "1") Integer sortType){
        try{
            return GogitekResponse.ok(productService.getListProduct(req,page,size,sortType));
        }catch (BadRequestException e){
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Product",e.getMessage(),"")));
        } catch (Exception ex){
            log.error(ex.getMessage());
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product",ex.getMessage(),"")));
        }
    }



    @GetMapping("/product-detail/{id}")
    public Response getProductDetail(@PathVariable Long id){
        try{
            return GogitekResponse.ok(productService.getProductById(id));
        }catch (BadRequestException be){
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Product",be.getMessage(),"")));
        }
        catch (RuntimeException e){
            return GogitekResponse.fail(ResultCodes.NOT_FOUND, Collections.singletonList(new Error("Product",e.getMessage(),"")));
        }catch (Exception ex){
            log.error(ex.getMessage());
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product",ex.getMessage(),"")));
        }
    }

    @PostMapping("/delete-product")
    public Response deletedProduct(@RequestBody AlterProductReq ids) {
        try {
            productService.deleted(ids.id);
            return GogitekResponse.ok("Success");
        } catch (BadRequestException be) {
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Product","","")));
        } catch (NotFoundException e) {
            return GogitekResponse.fail(ResultCodes.NOT_FOUND, Collections.singletonList(new Error("Product","","")));
        } catch (Exception ex) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product","","")));
        }
    }

    @PostMapping("/add")
    public Response addNewProduct(@ModelAttribute ProductReq req) {
        try {
            return GogitekResponse.ok(productService.save(req));
        } catch (BadRequestException be) {
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Product","","")));
        } catch (RuntimeException e) {
            log.error(e.getMessage(),e);
            return GogitekResponse.fail(ResultCodes.NOT_FOUND, Collections.singletonList(new Error("Product", "Check log BE", "")));
        } catch (Exception ex) {
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product","","")));
        }
    }

    @PostMapping("/upload-image")
    public Response uploadFile(@ModelAttribute MultipartFile image){
        try {
            return GogitekResponse.ok(uploadImageService.uploadToVps(image));
        }catch (Exception e){
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.NOT_FOUND, Collections.singletonList(new Error("Product", e.getMessage(), "")));
        }
    }
    @PostMapping("/upload")
    public Response uploadMulFile(@RequestParam("files") MultipartFile[] files){
        try {
            return GogitekResponse.ok(storageService.save(files));
        }catch (Exception e){
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.NOT_FOUND, Collections.singletonList(new Error("Product", e.getMessage(), "")));
        }
    }
}
