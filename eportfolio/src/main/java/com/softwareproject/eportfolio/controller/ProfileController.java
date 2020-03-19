/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-18 23:29:03
 * @LastEditTime: 2020-03-19 22:36:30
 */
package com.softwareproject.eportfolio.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.softwareproject.eportfolio.dao.ProfileDAO;
import com.softwareproject.eportfolio.domain.ProfileDO;
import com.softwareproject.eportfolio.domain.UserDO;
import com.softwareproject.eportfolio.dto.ProfileDTO;
import com.softwareproject.eportfolio.service.UserService;
import com.softwareproject.eportfolio.util.APIResponse;
import com.softwareproject.eportfolio.util.UserLoginToken;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-16 23:04:43
 * @LastEditTime: 2020-03-16 23:45:04
 */
@RestController
@RequestMapping("profile")
public class ProfileController{

    @Autowired
    UserService userService;

    @Autowired 
    ProfileDAO profileDAO;
    
    @Autowired
    private HttpServletRequest request;

    ModelMapper modelMapper = new ModelMapper();

    @UserLoginToken
    @PostMapping("/add")
    public Object addProfile(@RequestBody JSONObject body){
        APIResponse res = new APIResponse();
        UserDO user = userService.findById(UUID.fromString(body.getString("userid")));
        if (user == null){
            return res
                .put("status", "fail")
                .put("message", "Wrong User")
                .export();
        } else {
            ProfileDO profile = new ProfileDO();
            profile.setHTML(body.getString("html"));
            profile.setUrl(body.getString("url"));
            profile.setUser(user);
            ProfileDTO newProfile = modelMapper.map(profileDAO.save(profile), ProfileDTO.class);
            return res
                .put("status", "success")
                .put("user", user)
                .put("profile", newProfile)
                .export();
        }
    }

    @UserLoginToken
    @PutMapping("/update")
    public Object updateProfile(@RequestBody JSONObject body){
        APIResponse res = new APIResponse();
        ProfileDO profile = profileDAO.findProfileById(body.getLong("id"));
        if (profile == null) {
            return res
                .put("status", "fail")
                .put("message", "profile does not exists")
                .export();
        }
        profile.setHTML(body.getString("html"));
        profile.setUrl(body.getString("url"));
        ProfileDTO newProfile = modelMapper.map(profileDAO.save(profile), ProfileDTO.class);
        return res 
            .put("status", "success")
            .put("profile", newProfile)
            .export();
    }

    @UserLoginToken
    @GetMapping("/get")
    public Object getProfile(@RequestBody JSONObject body){
        APIResponse res = new APIResponse();
        if (body.get("profileid") != null){
            ProfileDO target = profileDAO.findProfileById(body.getLong("profileid"));
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
        } else if (body.get("userid") != null){
            UserDO user = userService.findById(UUID.fromString(body.getString("userid")));
            if (user == null){
                return res
                    .put("status", "fail")
                    .put("message", "user does not exist")
                    .export();
            }
            //List<ProfileDO> targets = profileDAO.findProfileByUserid(UUID.fromString(body.getString("userid")));
            return res
                .put("status", "success")
                .put("profile", user.getProfiles())
                .export();
        }
        return res;
    }

    @UserLoginToken
    @DeleteMapping("/delete")
    public Object delteProfile(@RequestBody JSONObject body){
        APIResponse res = new APIResponse();
        ProfileDO profile = profileDAO.findProfileById(body.getLong("id"));
        if (profile == null) {
            return res
                .put("status", "fail")
                .put("message", "profile does not exists")
                .export();
        }
        profileDAO.delete(profile);
        return res 
            .put("status", "success")
            .export();
    }

    
    
}