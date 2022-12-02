package com.gogitek.orderecommerce.dao.daoimp;

import com.gogitek.orderecommerce.common.constant.AccountRole;
import com.gogitek.orderecommerce.common.constant.AuthProvider;
import com.gogitek.orderecommerce.common.constant.Gender;
import com.gogitek.orderecommerce.controller.dto.payload.FacebookLoginRequest;
import com.gogitek.orderecommerce.controller.dto.payload.GoogleLoginRequest;
import com.gogitek.orderecommerce.controller.dto.payload.RegisterRequest;
import com.gogitek.orderecommerce.controller.dto.req.PasswordReq;
import com.gogitek.orderecommerce.controller.dto.req.UserReq;
import com.gogitek.orderecommerce.dao.UserDao;
import com.gogitek.orderecommerce.database.entity.common.User;
import com.gogitek.orderecommerce.database.repository.UserRepository;
import org.hibernate.validator.internal.engine.messageinterpolation.parser.MessageDescriptorFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserDaoImpl implements UserDao {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    PlatformTransactionManager transactionManager;

    @Override
    public User checkExistGoogleAccount(GoogleLoginRequest googleLoginRequest) {
        DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
        TransactionStatus transaction = transactionManager.getTransaction(definition);
        //Begin Transaction here
        try {
            if (userRepository.existsByEmail(googleLoginRequest.getUserGoogleInfo().getEmail())) {
                Optional<User> user = userRepository.getUserByEmailOrPhone(googleLoginRequest.getUserGoogleInfo().getEmail());
                User userUpdate = user.get();
                userUpdate.setImageUrl(googleLoginRequest.getUserGoogleInfo().getImageUrl());
                userUpdate.setProvider(AuthProvider.GOOGLE);
                userUpdate.setName(googleLoginRequest.getUserGoogleInfo().getName());
                userRepository.save(userUpdate);
                transactionManager.commit(transaction);
                return userUpdate;
            } else {
                User newUser = new User();
                newUser.setName(googleLoginRequest.getUserGoogleInfo().getName());
                newUser.setPoint(0L);
                newUser.setCartCount(0L);
                newUser.setGender(Gender.NONE.getValue());
                newUser.setProvider(AuthProvider.GOOGLE);
                newUser.setRole(AccountRole.CUSTOMER.getValue());
                newUser.setUserName(googleLoginRequest.getUserGoogleInfo().getEmail());
                newUser.setEmail(googleLoginRequest.getUserGoogleInfo().getEmail());
                userRepository.save(newUser);
                transactionManager.commit(transaction);
                return newUser;
            }
        } catch (Exception e) {
            transactionManager.rollback(transaction);
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public User checkExistFacebookAccount(FacebookLoginRequest facebookLoginRequest) {
        DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
        TransactionStatus transaction = transactionManager.getTransaction(definition);
        try {
            if (userRepository.existsByEmail(facebookLoginRequest.getEmail())) {
                Optional<User> user = userRepository.getUserByEmailOrPhone(facebookLoginRequest.getEmail());
                User userUpdate = user.get();
                userUpdate.setProvider(AuthProvider.FACEBOOK);
                userUpdate.setName(facebookLoginRequest.getName());
                userRepository.save(userUpdate);
                transactionManager.commit(transaction);
                return userUpdate;
            } else {
                User newUser = new User();
                newUser.setName(facebookLoginRequest.getName());
                newUser.setPoint(0L);
                newUser.setCartCount(0L);
                newUser.setGender(Gender.NONE.getValue());
                newUser.setProvider(AuthProvider.GOOGLE);
                newUser.setRole(AccountRole.CUSTOMER.getValue());
                newUser.setEmail(facebookLoginRequest.getEmail());
                newUser.setUserName(facebookLoginRequest.getEmail());
                userRepository.save(newUser);
                transactionManager.commit(transaction);
                return newUser;
            }
        } catch (Exception e) {
            transactionManager.rollback(transaction);
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public User registerUser(RegisterRequest registerRequest) {
        DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
        TransactionStatus transaction = transactionManager.getTransaction(definition);
        try {
            if(userRepository.existsByEmail(registerRequest.getEmail())) throw new MessageDescriptorFormatException("Email already exists");
            User user = new User();
            user.setName(registerRequest.getName());
            user.setUserName(registerRequest.getEmail());
            user.setPassword(registerRequest.getPassword());
            user.setEmail(registerRequest.getEmail());
            user.setPhone(registerRequest.getPhone());
            user.setGender(registerRequest.getGender());
            user.setDateOfBirth(registerRequest.getDateOfBirth());
            user.setRole(AccountRole.CUSTOMER.getValue());
            user.setPoint(0L);
            user.setCartCount(0L);
            user.setProvider(AuthProvider.LOCAL);
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            userRepository.save(user);
            transactionManager.commit(transaction);
            return user;
        } catch (Exception e) {
            transactionManager.rollback(transaction);
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void changePassword(PasswordReq passwordReq, User user) {
        DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
        TransactionStatus transaction = transactionManager.getTransaction(definition);
        try {
            User userSave = user;
            userSave.setPassword(passwordReq.getNewPassword());
            userRepository.save(userSave);
            transactionManager.commit(transaction);
        }catch (Exception e){
            transactionManager.rollback(transaction);
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public User changeInformation(UserReq userReq, User user) {
        DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
        TransactionStatus transaction = transactionManager.getTransaction(definition);
        try {
            User userSave = user;
            userSave.setName(userReq.getName());
            userSave.setGender(userReq.getGender());
            userSave.setDateOfBirth(userReq.getDateOfBirth());
            userRepository.save(userSave);
            transactionManager.commit(transaction);
            return userSave;
        }catch (Exception e){
            transactionManager.rollback(transaction);
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<User> findUserByIdAndEmail(String key) {
        List<User> userList = userRepository.findUserByIdAndEmail(key);
        if(userList.isEmpty()) return null;
        return userList;
    }
}
