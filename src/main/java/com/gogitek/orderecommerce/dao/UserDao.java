package com.gogitek.orderecommerce.dao;

import com.gogitek.orderecommerce.controller.dto.payload.FacebookLoginRequest;
import com.gogitek.orderecommerce.controller.dto.payload.GoogleLoginRequest;
import com.gogitek.orderecommerce.controller.dto.payload.RegisterRequest;
import com.gogitek.orderecommerce.controller.dto.req.GetListUserReq;
import com.gogitek.orderecommerce.controller.dto.req.PasswordReq;
import com.gogitek.orderecommerce.controller.dto.req.UserReq;
import com.gogitek.orderecommerce.database.entity.common.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    User checkExistGoogleAccount(GoogleLoginRequest googleLoginRequest);

    User checkExistFacebookAccount(FacebookLoginRequest facebookLoginRequest);

    User registerUser(RegisterRequest registerRequest);

    Optional<User> getUserById(Long id);

    void changePassword(PasswordReq passwordReq, User user);

    User changeInformation(UserReq userReq, User user);

    List<User> findUserByIdAndEmail(String key);
}
