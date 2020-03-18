package com.softwareproject.eportfolio.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.softwareproject.eportfolio.domain.ProfileDO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-16 22:55:34
 * @LastEditTime: 2020-03-19 00:43:33
 */
import org.springframework.data.jpa.repository.Query;

public interface ProfileDAO extends JpaRepository<ProfileDO, Long>, JpaSpecificationExecutor<ProfileDO> {


    @Query("select p from profile p where p.id=?1")
    public ProfileDO findProfileById(Long id);

    //@Query("select p from profile p where p.user_id=?1")
    //public List<ProfileDO> findProfileByUserid(UUID userid); 

}