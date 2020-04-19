package com.softwareproject.eportfolio.service.impl;
/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-04-06 16:50:47
 * @LastEditTime: 2020-04-19 22:05:32
 */

import java.io.File;
import java.security.MessageDigest;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.ClientConfiguration;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.glacier.model.CannedACL;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;

import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AWSService {

	AmazonS3 s3 = null;
	Regions clientRegion = Regions.DEFAULT_REGION;
	String bucketName = "eportfolio-sofwareproject";
	String objectKey = "test/${filename}";
	String accessKey = "AKIAJIS77JAMH4HXBSEA";
	String secretKey = "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";
	String urlPrefix = "https://eportfolio-sofwareproject.s3-ap-southeast-2.amazonaws.com/";
	MessageDigest md = null;

	public AWSService(){
		if (this.s3 == null) initS3();
		try {
			this.md = MessageDigest.getInstance("MD5");
		} catch (Exception e) {
			//TODO: handle exception
		}
	}

	public AmazonS3 initS3() {
		if (this.s3 != null)
			return this.s3;
		else {
			try {
				AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

				ClientConfiguration config = new ClientConfiguration();
				String proxyHost = System.getProperty("http.proxyHost");
				String proxyPort = System.getProperty("http.proxyPort");
				if (proxyHost != null && proxyPort != null) {
					config.setProxyHost(proxyHost);
					config.setProxyPort(Integer.valueOf(proxyPort));
				}
				this.s3 = new AmazonS3Client(credentials, config);

				this.s3.setRegion(com.amazonaws.regions.Region.getRegion(Regions.AP_SOUTHEAST_2));
				return this.s3;

			} catch (AmazonServiceException e) {
				e.printStackTrace();
			} catch (SdkClientException e) {
				e.printStackTrace();
			}
			return null;
		}
	}

	public String uploadFile(MultipartFile file, String userid) {
		PutObjectResult putObjectResponse = null;
		String tempPath = userid+"/"+ DigestUtils.md5DigestAsHex((userid + file.getOriginalFilename()).getBytes());
		String originalName = file.getOriginalFilename();
		try {
			String contentType = file.getContentType();
			long fileSize = file.getSize();
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(contentType);
			objectMetadata.setContentLength(fileSize);

			System.out.println("---------------- START UPLOAD FILE ----------------");
			System.out.println("Uploading to bucket '" + bucketName);
			String key = file.getName();
			putObjectResponse = this.s3.putObject(new PutObjectRequest(bucketName+"/"+tempPath, originalName, file.getInputStream(), objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
			
			
			System.out.println("===================== Upload File - Done! =====================");
			System.out.println("===================== Get url! =====================");

			
        	return urlPrefix+tempPath+"/"+originalName;
        } catch (Exception e) {
			System.out.println("Exception e:" + e.toString());
			return "error";
        }
    }
}