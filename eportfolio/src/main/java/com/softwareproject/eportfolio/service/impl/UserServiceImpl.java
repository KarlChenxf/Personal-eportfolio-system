package com.softwareproject.eportfolio.service.impl;

import java.util.Optional;
import java.util.UUID;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.softwareproject.eportfolio.dao.UserDAO;
import com.softwareproject.eportfolio.domain.UserDO;
import com.softwareproject.eportfolio.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 22:14:04
 * @LastEditTime: 2020-03-16 21:49:46
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDAO userDAO;

    @Override
    public String getTokenByLogin(UserDO user) {
        String token = "";
        token = JWT.create().withAudience(user.getId().toString()).sign(Algorithm.HMAC256(user.getPassword()));
        // System.out.println(JWT.decode(token).getAudience());
        return token;
    }

    @Override
    public String refreshToken() {
        return null;
    }

    @Override
    public UserDO findUserById(String userId) {
        Optional<UserDO> userDO = userDAO.findById(userId);
        return userDO.get();
    }

    @Override
    public UserDO findByEmail(String email) {
        return userDAO.findByEmail(email);
    }

    @Override
    public UserDO findById(UUID userId) {
        return userDAO.findById(userId);
    }
    
}