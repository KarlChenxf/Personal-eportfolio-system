/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 23:11:53
 * @LastEditTime: 2020-03-16 23:04:00
 */
package com.softwareproject.eportfolio;

import com.softwareproject.eportfolio.dao.ProfileDAO;
import com.softwareproject.eportfolio.dao.UserDAO;
import com.softwareproject.eportfolio.domain.ProfileDO;
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

	@Autowired
	ProfileDAO profileDAO;

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
		ProfileDO profile1 = new ProfileDO();
		profile1.setUser(admin);
		profile1.setHTML("<div blabla></div>");
		profile1.setUrl("https://google.com");
		ProfileDO profile2 = new ProfileDO();
		profile2.setHTML("<div blabla></div>");
		profile2.setUrl("https://google.com");
		profile2.setUser(admin);

		profileDAO.save(profile1);
		profileDAO.save(profile2);
		
	}	

}
