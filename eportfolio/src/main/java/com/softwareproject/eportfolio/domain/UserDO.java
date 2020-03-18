
package com.softwareproject.eportfolio.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 21:59:50
 * @LastEditTime: 2020-03-19 00:42:41
 */
@Entity(name = "user")
public class UserDO{
        @Id
        @GeneratedValue(generator = "uuid2")
        @GenericGenerator(name = "uuid2", strategy = "uuid2")
        @Type(type = "org.hibernate.type.UUIDCharType")
        private UUID id;

        private String userName;
        @Column(nullable = false)
        private String email;
        @Column(nullable = false, length = 33)
        private String password;

        private String linkedIn;
        private String gitHub;
        private String twitter;

        @OneToMany(cascade = {CascadeType.ALL})
        @JoinColumn(name = "user_id")
        private List<ProfileDO> profiles = new ArrayList<>();

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
        public List<ProfileDO> getProfiles(){
                return this.profiles;
        }
}