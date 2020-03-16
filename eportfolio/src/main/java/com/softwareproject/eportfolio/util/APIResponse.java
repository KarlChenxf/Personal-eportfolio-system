package com.softwareproject.eportfolio.util;

import com.alibaba.fastjson.JSONObject;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-16 20:54:11
 * @LastEditTime: 2020-03-16 21:01:56
 */
public class APIResponse{
    private JSONObject response;

    public APIResponse(){
        this.response = new JSONObject();
    }

    public <T>APIResponse put(String key, T value){
        this.response.put(key, value);
        return this;
    }

    public JSONObject export(){
        return this.response;
    }
}