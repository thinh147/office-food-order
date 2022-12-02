package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.controller.dto.payload.FacebookLoginRequest;
import com.gogitek.orderecommerce.controller.dto.payload.GoogleLoginRequest;
import com.gogitek.orderecommerce.controller.dto.payload.RegisterRequest;
import com.gogitek.orderecommerce.controller.dto.req.GetListUserReq;
import com.gogitek.orderecommerce.controller.dto.req.PasswordReq;
import com.gogitek.orderecommerce.controller.dto.req.UserReq;
import com.gogitek.orderecommerce.controller.dto.res.UserDto;
import com.gogitek.orderecommerce.controller.dto.res.UserRes;
import com.gogitek.orderecommerce.database.entity.common.User;

import java.util.List;

public interface UserService {
    User checkExistGoogleAccount(GoogleLoginRequest googleLoginRequest);

    User checkExistFacebookAccount(FacebookLoginRequest facebookLoginRequest);

    User registerUser(RegisterRequest registerRequest);

    UserDto getUserById();

    void changePassword(PasswordReq passwordReq);

    User changeInformation(UserReq userReq);

    List<UserRes> findUserByIdOrEmail(GetListUserReq req);
}
