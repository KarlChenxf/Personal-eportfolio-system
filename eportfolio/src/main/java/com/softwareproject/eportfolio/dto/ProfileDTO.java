package com.softwareproject.eportfolio.dto;

import com.softwareproject.eportfolio.domain.ProfileDO;

import org.modelmapper.ModelMapper;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-18 23:21:35
 * @LastEditTime: 2020-03-19 00:01:03
 */
public class ProfileDTO{

    public Long id;

    public String html;

    public String url;

    public ProfileDTO(){};


    public void setHTML(String html) {
        this.html = html;
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

	public String getHtml() {
		return this.html;
	}

	public String getUrl() {
		return this.url;
	}
}