package com.softwareproject.eportfolio.controller;

import java.util.HashMap;
import java.util.Map;

import com.softwareproject.eportfolio.domain.UserDO;
import com.softwareproject.eportfolio.service.UserService;
import com.softwareproject.eportfolio.util.PassToken;
import com.softwareproject.eportfolio.util.UserLoginToken;

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
 * @LastEditTime: 2020-03-14 23:41:24
 */
@RestController
@RequestMapping("user")
public class UserController{
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public Object login(@RequestBody UserDO user){
        Map<String, String> jsonObject=new HashMap<>();
        UserDO userForBase=userService.findByEmail(user.getEmail());
        if(userForBase==null){
            jsonObject.put("message","登录失败,用户不存在");
            return jsonObject;
        }else {
            if (!userForBase.getPassword().equals(user.getPassword())){
                jsonObject.put("message","登录失败,密码错误");
                return jsonObject;
            }else {
                String token = userService.getTokenByLogin(userForBase);
                jsonObject.put("token", token);
                jsonObject.put("user", userForBase.getId().toString());
                return jsonObject;
            }
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