
package com.softwareproject.eportfolio.domain;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 21:59:50
 * @LastEditTime: 2020-03-14 23:21:50
 */
@Entity(name = "user")
public class UserDO{
    
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private UUID id;

    private String userName;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false, length = 20)
    private String password;

	public UUID getId() {
		return id;
	}
	public String getPassword() {
		return password;
	}
	public String getEmail() {
		return email;
	}
	public void setUserName(String userName) {
        this.userName = userName;
	}
	public void setEmail(String email) {
        this.email = email;
	}
	public void setPassword(String password) {
        this.password = password;
	}
}