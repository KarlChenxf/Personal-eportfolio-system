/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 23:11:53
 * @LastEditTime: 2020-03-14 23:34:40
 */
package com.softwareproject.eportfolio;

import com.softwareproject.eportfolio.dao.UserDAO;
import com.softwareproject.eportfolio.domain.UserDO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EportfolioApplication implements ApplicationRunner{

	@Autowired
	UserDAO userDAO;

	public static void main(String[] args) {
		SpringApplication.run(EportfolioApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		UserDO admin = new UserDO();
		admin.setEmail("email");
		admin.setPassword("123");
		userDAO.save(admin);
	}

}
