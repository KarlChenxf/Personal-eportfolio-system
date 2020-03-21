package com.softwareproject.eportfolio.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.softwareproject.eportfolio.dao.UserDAO;
import com.softwareproject.eportfolio.domain.UserDO;
import com.softwareproject.eportfolio.service.UserService;
import com.softwareproject.eportfolio.util.APIResponse;
import com.softwareproject.eportfolio.util.PassToken;
import com.softwareproject.eportfolio.util.PasswordEncoding;
import com.softwareproject.eportfolio.util.UserLoginToken;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserDAO userDAO;

    @Autowired
    private HttpServletRequest request;

    @PassToken
    @PostMapping("/login")
    public Object login(@RequestBody UserDO user) {
        APIResponse res = new APIResponse();
        UserDO userForBase = userService.findByEmail(user.getEmail());
        if (userForBase == null) {
            return res
                .put("status", "fail")
                .put("message", "User does not exist")
                .export();
        } else {
            String passwordMD5 = "";
            try {
                passwordMD5 = PasswordEncoding.md5(user.getPassword());
            } catch (Exception e) {
                return res
                    .put("status", "fail")
                    .put("message", "Fail to encode password")
                    .export();
            }
            if (!userForBase.getPassword().equals(passwordMD5)) {
                return res
                    .put("status", "fail")
                    .put("message", "Wrong password")
                    .export();
            } else {
                return res
                    .put("status", "success")
                    .put("token", userService.getTokenByLogin(userForBase))
                    .put("user", userForBase)
                    .export();
            }
        }
    }

    @PassToken
    @PostMapping("/signup")
    public Object signup(@RequestBody UserDO user) {
        APIResponse res = new APIResponse();
        UserDO existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return res
                .put("status", "fail")
                .put("message", "Email already exists")
                .export();
        } else if (user.getEmail() != null && user.getPassword() != null) {
            try {
                user.setPassword(PasswordEncoding.md5(user.getPassword()));
            } catch (Exception e) {
                return res
                .put("status", "fail")
                .put("message", "Fail to encode password")
                .export();
            }
            userDAO.save(user);
            UserDO userForBase = userService.findByEmail(user.getEmail());
            String token = userService.getTokenByLogin(userForBase);
            return res
                .put("status", "success").put("token", token).put("user", userForBase)
                .export();
        } else {
            return res
                .put("status", "fail")
                .put("message", "Email and password should not be empty")
                .export();
        }
    }

    @UserLoginToken
    @PostMapping("/changepassword")
    public Object changePassword(@RequestBody UserDO user) {
        APIResponse res = new APIResponse();
        String userId = JWT.decode(request.getHeader("token")).getAudience().get(0);
        UserDO userToChange = userService.findByEmail(user.getEmail());
        if (!userId.equals(userToChange.getId().toString())) {
            return res
                .put("status", "fail")
                .put("message", "Wrong user")
                .export();
        } else {
            try {
                userToChange.setPassword(PasswordEncoding.md5(user.getPassword()));
            } catch (Exception e) {
                // TODO Auto-generated catch block
                return res
                    .put("status", "fail")
                    .put("message", "Fail to encode password")
                    .export();
            }
            userDAO.save(userToChange);
            return res
                .put("status", "success")
                .put("user", userToChange)
                .put("token", userService.getTokenByLogin(userToChange))
                .export();
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