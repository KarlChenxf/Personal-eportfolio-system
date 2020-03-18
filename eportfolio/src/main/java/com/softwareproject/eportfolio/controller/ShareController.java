/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-19 01:40:06
 * @LastEditTime: 2020-03-19 01:58:57
 */
package com.softwareproject.eportfolio.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.softwareproject.eportfolio.dao.ProfileDAO;
import com.softwareproject.eportfolio.domain.ProfileDO;
import com.softwareproject.eportfolio.dto.ProfileDTO;
import com.softwareproject.eportfolio.util.APIResponse;
import com.softwareproject.eportfolio.util.PassToken;
import com.softwareproject.eportfolio.util.UserLoginToken;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-19 01:07:30
 * @LastEditTime: 2020-03-19 01:27:18
 */
@RestController
@RequestMapping("share")
public class ShareController{

    @Autowired
    ProfileDAO profileDAO;

    ModelMapper modelMapper = new ModelMapper();

    @UserLoginToken
    @GetMapping("getlink")
    public Object getShareToken(@RequestBody JSONObject body) {
        APIResponse res = new APIResponse();
        if (body.get("profileid") != null){
            ProfileDO target = profileDAO.findProfileById(body.getLong("profileid"));
            if (target == null){
                return res
                    .put("status", "fail")
                    .put("message", "profile does not exist")
                    .export();
            } else {
                Long EXPSECOND = 24*60*60000l;
                String token = "";
                Long now = System.currentTimeMillis();
                Long expMills = now+EXPSECOND;
                System.out.println(new Date(now));
                System.out.println(new Date(expMills));
                token = JWT.create().withExpiresAt(new Date(expMills)).withAudience("team12sharelink"+target.getId()).sign(Algorithm.HMAC256("getgoodgradeplease"));
                return res
                    .put("status", "success")
                    .put("token", token)
                    .put("now", new Date(now))
                    .put("expiredate", new Date(expMills))
                    .export();
            }
        } else {
            return res
                .put("status", "fail")
                .put("message", "profileid is missing")
                .export();
        }
    }

    @PassToken
    @GetMapping("getprofile")
    public Object getMethodName(@RequestParam String token) {
        APIResponse res = new APIResponse();
        String profileid = JWT.decode(token).getAudience().get(0).replace("team12sharelink","");
        ProfileDO target = profileDAO.findProfileById(Long.parseLong(profileid));
        if (target == null){
            return res
                .put("status", "fail")
                .put("message", "profile does not exist")
                .export();
        } else {
            ProfileDTO profileToShow = modelMapper.map(target, ProfileDTO.class);
            return res
                .put("status", "success")
                .put("profile", profileToShow)
                .export();
        }
    }
}