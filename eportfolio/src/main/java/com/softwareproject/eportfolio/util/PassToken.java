package com.softwareproject.eportfolio.util;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 21:44:48
 * @LastEditTime: 2020-03-14 22:08:23
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PassToken {
    boolean required() default true;
}