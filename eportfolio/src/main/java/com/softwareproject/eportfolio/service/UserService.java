package com.softwareproject.eportfolio.service;

import java.util.UUID;

import com.softwareproject.eportfolio.domain.UserDO;

import org.springframework.stereotype.Service;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 21:55:04
 * @LastEditTime: 2020-03-16 21:33:17
 */
@Service
public interface UserService{

    public String getTokenByLogin(UserDO user);

    public String refreshToken();

	public UserDO findUserById(String userId);

	public UserDO findByEmail(String email);

	public UserDO findById(UUID userId);
    
    
}