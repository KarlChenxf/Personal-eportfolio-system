package com.softwareproject.eportfolio.service;

import com.softwareproject.eportfolio.domain.UserDO;

import org.springframework.stereotype.Service;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 21:55:04
 * @LastEditTime: 2020-03-14 22:55:29
 */
@Service
public interface UserService{

    public String getTokenByLogin(UserDO user);

    public String refreshToken();

	public UserDO findUserById(String userId);

	public UserDO findByEmail(String email);
    
    
}