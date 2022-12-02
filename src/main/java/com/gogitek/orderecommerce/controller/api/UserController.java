package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.controller.dto.req.PasswordReq;
import com.gogitek.orderecommerce.controller.dto.req.UserReq;
import com.gogitek.orderecommerce.controller.service.UserService;
import com.gogitek.orderecommerce.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@Slf4j
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user-information")
    public Response getUserInformation(){
        try {
            return GogitekResponse.ok(this.userService.getUserById());
        }catch (BadRequestException e){
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Product",e.getMessage(),"")));
        } catch (Exception ex){
            log.error(ex.getMessage());
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product",ex.getMessage(),"")));
        }
    }

    @GetMapping("/change-information")
    public Response changeInformation(@RequestBody UserReq userReq){
        try {
            return GogitekResponse.ok(this.userService.changeInformation(userReq));
        }catch (BadRequestException e){
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Product",e.getMessage(),"")));
        } catch (Exception ex){
            log.error(ex.getMessage());
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product",ex.getMessage(),"")));
        }
    }

    @PostMapping("/change-password")
    public Response changePassword(@RequestBody PasswordReq passwordReq){
        try {
            this.userService.changePassword(passwordReq);
            return GogitekResponse.ok();
        }catch (BadRequestException e){
            return GogitekResponse.fail(ResultCodes.BAD_REQUEST, Collections.singletonList(new Error("Product",e.getMessage(),"")));
        } catch (Exception ex){
            log.error(ex.getMessage());
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("Product",ex.getMessage(),"")));
        }
    }
}
