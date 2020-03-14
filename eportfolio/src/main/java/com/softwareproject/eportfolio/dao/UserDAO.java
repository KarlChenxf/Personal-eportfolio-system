
package com.softwareproject.eportfolio.dao;

import java.util.List;

import com.softwareproject.eportfolio.domain.UserDO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 21:57:34
 * @LastEditTime: 2020-03-14 23:00:46
 */
public interface UserDAO extends JpaRepository<UserDO, String>, JpaSpecificationExecutor<UserDO>{
    public UserDO findByEmail(String email);
}