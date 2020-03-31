package com.softwareproject.eportfolio.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.alibaba.fastjson.annotation.JSONField;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-16 22:23:04
 * @LastEditTime: 2020-03-31 20:17:04
 */
@Entity(name = "profile")
public class ProfileDO{

    @Id
    @GeneratedValue
    private Long id;

    @Lob
    private String html;

    private String url;

    @JSONField(serialize = false)
    @ManyToOne
    private UserDO user;

	public void setHTML(String html) {
        this.html = html;
	}

	public void setUrl(String url) {
        this.url = url;
	}

	public void setUser(UserDO user) {
        this.user = user;
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