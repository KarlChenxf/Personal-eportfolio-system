package com.softwareproject.eportfolio.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.Base64;

/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-03-14 23:51:03
 * @LastEditTime: 2020-03-14 23:57:03
 */
public class PasswordEncoding{
    public static String md5(String password) throws Exception{

	    try {
	        MessageDigest md = MessageDigest.getInstance("MD5");
	        md.update(password.getBytes());
	        return new BigInteger(1, md.digest()).toString(16);
	    } catch (Exception e) {
	        throw new Exception("Fail to encode password"+e.toString());
	    }
    }
}