package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.*;
import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.controller.dto.payload.*;
import com.gogitek.orderecommerce.controller.dto.req.GetListUserReq;
import com.gogitek.orderecommerce.controller.service.UserService;
import com.gogitek.orderecommerce.database.entity.common.User;
import com.gogitek.orderecommerce.config.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;

@SuppressWarnings("ALL")
@RestController
@RequestMapping("/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil tokenProvider;

    @PostMapping("/login")
    public Response authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = this.tokenProvider.generateJwtToken(authentication);

            return GogitekResponse.ok(new AuthResponse(token, userPrincipal.getEmail(),
                    userPrincipal.getName(), userPrincipal.getPhone(),
                    String.valueOf(userPrincipal.getPoint()),
                    String.valueOf(userPrincipal.getCartCount()),
                    userPrincipal.getRole(), userPrincipal.getGender()));
        } catch (RuntimeException re) {
            log.error(re.getMessage(), re);
            return GogitekResponse.fail(ResultCodes.INVALID_LOGIN_INFO, Collections.singletonList(new Error("User", re.getMessage(), "")));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("User", e.getMessage(), "")));
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            User user = this.userService.registerUser(registerRequest);
            String token = this.tokenProvider.generateToken(registerRequest.getEmail());
            return GogitekResponse.ok(new AuthResponse(token, user.getEmail(), user.getName(), user.getPhone()
                    , String.valueOf(user.getPoint()), String.valueOf(user.getCartCount()),
                    AccountRole.valueOfType(user.getRole()).getTypeInStr(), Gender.valueOfType(user.getGender()).getTypeInStr()));
        } catch (RuntimeException re) {
            log.error(re.getMessage(), re);
            return GogitekResponse.fail(ResultCodes.INVALID_LOGIN_INFO, Collections.singletonList(new Error("User", re.getMessage(), "")));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.status(ResultCodes.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login-google")
    public ResponseEntity<?> loginGoogle(@Valid @RequestBody GoogleLoginRequest googleLoginRequest) {
        try {
            User userGoogle = this.userService.checkExistGoogleAccount(googleLoginRequest);
            String token = this.tokenProvider.generateToken(googleLoginRequest.getUserGoogleInfo().getEmail());
            return GogitekResponse.ok(new AuthResponse(
                    token, userGoogle.getEmail(),
                    userGoogle.getName(), userGoogle.getPhone(),
                    String.valueOf(userGoogle.getPoint()),
                    String.valueOf(userGoogle.getCartCount()),
                    AccountRole.valueOfType(userGoogle.getRole()).getTypeInStr(),
                    Gender.valueOfType(userGoogle.getGender()).getTypeInStr()));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.status(ResultCodes.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login-facebook")
    public ResponseEntity<?> loginFacebook(@Valid @RequestBody FacebookLoginRequest facebookLoginRequest) {

        try {
            User userFacebook = this.userService.checkExistFacebookAccount(facebookLoginRequest);
            String token = this.tokenProvider.generateToken(facebookLoginRequest.getEmail());
            return GogitekResponse.ok(new AuthResponse(
                    token, userFacebook.getEmail(), userFacebook.getName(),
                    userFacebook.getPhone(), String.valueOf(userFacebook.getPoint()),
                    String.valueOf(userFacebook.getCartCount()),
                    AccountRole.valueOfType(userFacebook.getRole()).getTypeInStr(),
                    Gender.valueOfType(userFacebook.getGender()).getTypeInStr()));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return GogitekResponse.status(ResultCodes.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("list-user")
    public Response getListUser(GetListUserReq req){
        try{
            return GogitekResponse.ok(userService.findUserByIdOrEmail(req));
        }catch (Exception e){
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("", "","")));
        }
    }
}
