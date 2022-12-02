package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.common.constant.AccountRole;
import com.gogitek.orderecommerce.common.constant.Gender;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.controller.dto.payload.FacebookLoginRequest;
import com.gogitek.orderecommerce.controller.dto.payload.GoogleLoginRequest;
import com.gogitek.orderecommerce.controller.dto.payload.RegisterRequest;
import com.gogitek.orderecommerce.controller.dto.req.GetListUserReq;
import com.gogitek.orderecommerce.controller.dto.req.PasswordReq;
import com.gogitek.orderecommerce.controller.dto.req.UserReq;
import com.gogitek.orderecommerce.controller.dto.res.UserDto;
import com.gogitek.orderecommerce.controller.dto.res.UserRes;
import com.gogitek.orderecommerce.controller.service.UserService;
import com.gogitek.orderecommerce.dao.UserDao;
import com.gogitek.orderecommerce.database.entity.common.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDAO;

    @Override
    public User checkExistGoogleAccount(GoogleLoginRequest googleLoginRequest) {
        User user = userDAO.checkExistGoogleAccount(googleLoginRequest);
        if (user == null) throw new RuntimeException("Something wrong in our server");
        return user;
    }

    @Override
    public User checkExistFacebookAccount(FacebookLoginRequest facebookLoginRequest) {
        User user = userDAO.checkExistFacebookAccount(facebookLoginRequest);
        if (user == null) throw new RuntimeException("Something wrong in our server");
        return user;
    }

    @Override
    public User registerUser(RegisterRequest registerRequest) {
        User user = userDAO.registerUser(registerRequest);
        if (user == null) throw new RuntimeException("Something wrong in our server");
        return user;
    }

    @Override
    public UserDto getUserById() {
        UserPrincipal userDetails = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user = userDAO.getUserById(userDetails.getUser().getId()).get();
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setDateOfBirth(user.getDateOfBirth());
        userDto.setFullName(user.getName());
        userDto.setGender(Gender.valueOfType(user.getGender()).getTypeInStr());
        return userDto;
    }

    @Override
    public void changePassword(PasswordReq passwordReq) {
        UserPrincipal userDetails = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        userDAO.changePassword(passwordReq,userDetails.getUser());
    }

    @Override
    public User changeInformation(UserReq userReq) {
        UserPrincipal userDetails = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return userDAO.changeInformation(userReq,userDetails.getUser());
    }

    public List<UserRes> findUserByIdOrEmail(GetListUserReq req){
        UserPrincipal userDetails = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        if(!userDetails.getRole().equals(AccountRole.ADMIN.getTypeInStr()))
            throw new RuntimeException("You have no permission to do this feature");
        List<User> listUser = userDAO.findUserByIdAndEmail(req.getKey());
        if(listUser == null) throw new RuntimeException("Could not find user with id or email: " + req.getKey());
        return listUser.stream().map(item -> {
            UserRes res = new UserRes();
            res.setId(item.getId());
            res.setName(item.getName());
            res.setEmail(item.getEmail());
            return res;
        }).collect(Collectors.toList());
    }
}
