package com.softwareproject.eportfolio.TestUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-05-08 19:32:42
 * @LastEditTime: 2020-05-08 19:44:40
 */
@Configuration
public class TestConfig{

    @Autowired
    private WebApplicationContext context;
    
    private String token = null;

    @Bean
    public MockMvc mvc(){
        return MockMvcBuilders.webAppContextSetup(context).build();
    }

    /**
     * @param token the token to set
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * @return the token
     */
    public String getToken() {
        return token;
    }
}