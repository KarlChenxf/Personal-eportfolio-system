package com.softwareproject.eportfolio.controller;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.softwareproject.eportfolio.dao.UserDAO;
import com.softwareproject.eportfolio.domain.UserDO;
import com.softwareproject.eportfolio.service.UserService;
import com.softwareproject.eportfolio.util.PassToken;
import com.softwareproject.eportfolio.util.PasswordEncoding;
import com.softwareproject.eportfolio.util.UserLoginToken;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 22:48:26
 * @LastEditTime: 2020-03-15 00:32:50
 */
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserDAO userDAO;

    @PassToken
    @PostMapping("/login")
    public Object login(@RequestBody UserDO user) {
        JSONObject loginResponse = new JSONObject();
        UserDO userForBase = userService.findByEmail(user.getEmail());
        if (userForBase == null) {
            loginResponse.put("status", "fail");
            loginResponse.put("message", "User does not exist");
            return loginResponse;
        } else {
            String passwordMD5 = "";
            try {
                passwordMD5 = PasswordEncoding.md5(user.getPassword());
            } catch (Exception e) {
                loginResponse.put("status", "fail");
                loginResponse.put("message", "Fail to encode password");
                return loginResponse;
            }
            if (!userForBase.getPassword().equals(passwordMD5)) {
                loginResponse.put("status", "fail");
                loginResponse.put("message", "Wrong password");
                return loginResponse;
            } else {
                String token = userService.getTokenByLogin(userForBase);
                loginResponse.put("status", "success");
                loginResponse.put("token", token);
                loginResponse.put("user", userForBase);
                return loginResponse;
            }
        }
    }

    @PassToken
    @PostMapping("/signup")
    public Object signup(@RequestBody UserDO user) {
        JSONObject signupResponse = new JSONObject();
        UserDO existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null){
            signupResponse.put("status", "fail");
            signupResponse.put("message", "Email already exists");
            return signupResponse;
        } else if (user.getEmail() != null && user.getPassword() != null) {
            try {
                user.setPassword(PasswordEncoding.md5(user.getPassword()));
            } catch (Exception e) {
                signupResponse.put("status", "fail");
                signupResponse.put("message", "Fail to encode password");
                return signupResponse;
            }
            userDAO.save(user);
            UserDO userForBase = userService.findByEmail(user.getEmail());
            String token = userService.getTokenByLogin(userForBase);
            signupResponse.put("status", "success");
            signupResponse.put("token", token);
            signupResponse.put("user", userForBase);
            return signupResponse;

        } else {
            signupResponse.put("status", "fail");
            signupResponse.put("message", "Email and password should not be empty");
            return signupResponse;
        }
    }

    @PassToken
    @GetMapping("/pass")
    public Object passTest(){
        Map<String,String> response = new HashMap<>();
        response.put("message", "yes");
        return response;
    }

    @UserLoginToken
    @GetMapping("/nope")
    public Object loginTest(){
        Map<String,String> response = new HashMap<>();
        response.put("message", "yes");
        return response;
    }
}