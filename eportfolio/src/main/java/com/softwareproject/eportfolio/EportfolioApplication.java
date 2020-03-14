/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 23:11:53
 * @LastEditTime: 2020-03-15 00:51:08
 */
package com.softwareproject.eportfolio;

import com.softwareproject.eportfolio.dao.UserDAO;
import com.softwareproject.eportfolio.domain.UserDO;
import com.softwareproject.eportfolio.util.PasswordEncoding;

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
		admin.setEmail("admin");
		String test = PasswordEncoding.md5("123");
		admin.setPassword(test);
		userDAO.save(admin);
	}	

}
