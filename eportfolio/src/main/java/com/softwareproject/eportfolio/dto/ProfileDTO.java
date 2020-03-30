package com.softwareproject.eportfolio.dto;

import com.alibaba.fastjson.JSONObject;
import com.softwareproject.eportfolio.domain.ProfileDO;

import org.modelmapper.ModelMapper;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-18 23:21:35
 * @LastEditTime: 2020-03-30 17:33:20
 */
public class ProfileDTO{

    public Long id;

    public JSONObject html;

    public String url;

    public ProfileDTO(){};


    public void setHTML(String html) {
        this.html = JSONObject.parseObject(html);
	}

	public void setUrl(String url) {
        this.url = url;
	}

	public void setId(Long id) {
        this.id = id;
	}

	public Long getId() {
		return this.id;
	}

	public JSONObject getHtml() {
		return this.html;
	}

	public String getUrl() {
		return this.url;
	}
}