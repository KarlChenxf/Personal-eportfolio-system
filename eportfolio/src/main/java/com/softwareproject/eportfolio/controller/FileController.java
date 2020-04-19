package com.softwareproject.eportfolio.controller;

import javax.servlet.http.HttpServletRequest;

import com.auth0.jwt.JWT;
import com.softwareproject.eportfolio.service.impl.AWSService;
import com.softwareproject.eportfolio.util.APIResponse;
import com.softwareproject.eportfolio.util.UserLoginToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-04-19 20:54:28
 * @LastEditTime: 2020-04-19 21:40:23
 */
@RestController
@RequestMapping("file")
@CrossOrigin(origins = "*")
public class FileController{


    @Autowired
    private HttpServletRequest request;

    @Autowired
    private AWSService awsService;

    @UserLoginToken
    @PostMapping("/upload")
    public Object uploadFile(@RequestParam("file") MultipartFile file){
        APIResponse res = new APIResponse();
        String userId = JWT.decode(request.getHeader("token")).getAudience().get(0);
        if (userId == null){
            return res
                .put("status", "fail")
                .put("message", "Wrong User")
                .export();
        } else {
            Object response = awsService.uploadFile(file, userId);
            return res
                .put("status", "success")
                .put("awsresponse", response)
                .export();
        }
    }

}