package com.softwareproject.eportfolio.configs;

import com.softwareproject.eportfolio.Security.AuthenticationInterceptor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 22:34:46
 * @LastEditTime: 2020-03-14 22:42:41
 */
@Configuration
public class InterceptorConfig extends WebMvcConfigurerAdapter{
    
    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(authenticationInterceptor()).addPathPatterns("/**");
    }

    @Bean
    public AuthenticationInterceptor authenticationInterceptor(){
        return new AuthenticationInterceptor();
    }
}