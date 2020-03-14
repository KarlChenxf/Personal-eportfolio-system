package com.softwareproject.eportfolio.util;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 21:45:52
 * @LastEditTime: 2020-03-14 22:08:37
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface UserLoginToken {
    boolean required() default true;
}