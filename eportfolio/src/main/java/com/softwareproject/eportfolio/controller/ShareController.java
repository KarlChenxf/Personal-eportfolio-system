/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-19 01:40:06
 * @LastEditTime: 2020-04-01 16:49:28
 */
package com.softwareproject.eportfolio.controller;

import java.util.Date;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.softwareproject.eportfolio.dao.ProfileDAO;
import com.softwareproject.eportfolio.domain.ProfileDO;
import com.softwareproject.eportfolio.dto.ProfileDTO;
import com.softwareproject.eportfolio.util.APIResponse;
import com.softwareproject.eportfolio.util.PassToken;
import com.softwareproject.eportfolio.util.UserLoginToken;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-19 01:07:30
 * @LastEditTime: 2020-03-19 01:27:18
 */
@RestController
@RequestMapping("share")
@CrossOrigin(origins = "*")
public class ShareController{

    @Autowired
    ProfileDAO profileDAO;

    ModelMapper modelMapper = new ModelMapper();

    private final Long DEFAULT_EXPIRE_TIME = 24*60*600000l;

    @UserLoginToken
    @PostMapping("getlink")
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
                Long EXPSECOND = body.getLong("expire") != null ? body.getLong("expire") : DEFAULT_EXPIRE_TIME;
                String token = "";
                Long now = System.currentTimeMillis();
                Long expMills = now+EXPSECOND;
                System.out.println(new Date(now));
                System.out.println(new Date(expMills));
                token = JWT.create().withExpiresAt(new Date(expMills)).withAudience("team12sharelink"+target.getId()).sign(Algorithm.HMAC256("getgoodgradeplease"));
                return res
                    .put("status", "success")
                    .put("sharetoken", token)
                    .put("expireat", new Date(expMills))
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
    @PostMapping("getprofile")
    public Object getMethodName(@RequestBody JSONObject body) {
        APIResponse res = new APIResponse();
        if (body.get("token") == null) {
            return res
                .put("status", "fail")
                .put("message", "token is missing")
                .export();
        }
        String profileid = JWT.decode(body.getString("token")).getAudience().get(0).replace("team12sharelink","");
        ProfileDO target = profileDAO.findProfileById(Long.parseLong(profileid));
        if (target == null){
            return res
                .put("status", "fail")
                .put("message", "profile does not exist")
                .export();
        } else {
            ProfileDTO profileToShow = new ProfileDTO();
            if (body.getLong("profileid") != null){
                profileToShow = modelMapper.map(
                    profileDAO.findProfileById(body.getLong("profileid")), 
                    ProfileDTO.class
                    );
            } else {
                profileToShow = modelMapper.map(target, ProfileDTO.class);
            }
            if (profileToShow == null) {
                return res
                    .put("status", "fail")
                    .put("message", "profile does not exist")
                    .export();
            }
            return res
                .put("status", "success")
                .put("profile", profileToShow)
                .export();
        }
    }
}