/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-05-07 18:24:46
 * @LastEditTime: 2020-05-07 22:22:32
 */
package com.softwareproject.eportfolio;

import com.alibaba.fastjson.JSONObject;
import com.softwareproject.eportfolio.controller.UserController;
import com.softwareproject.eportfolio.domain.UserDO;
import com.softwareproject.eportfolio.service.UserService;
import com.softwareproject.eportfolio.*;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.MockBeans;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EportfolioApplicationTests {

	private MockMvc mvc;

	private String token;



	@Autowired
	private WebApplicationContext context;

	@Before
	public void setUp(){
		//mvc = MockMvcBuilders.standaloneSetup(new UserController()).build();
		mvc = MockMvcBuilders.webAppContextSetup(context).build();
	}

	@Test
	public void testSignup() throws Exception{
		JSONObject testUser = new JSONObject();
		testUser.put("email", "admin");
		testUser.put("password", "123");
		testUser.put("firstName", "1");
		testUser.put("lastName", "2");
		
		//Email already exists
		mvc.perform(
			MockMvcRequestBuilders.post("/user/signup")				
				.content(testUser.toJSONString())
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				)
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.status").value("fail"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Email already exists"))
				.andDo(new ResultHandler(){
					@Override
					public void handle(MvcResult result) throws Exception {
						System.out.println("----"+result.getResponse().getContentAsString());
					}
				});

				/*
        testUser.put("email", "adminTest");
		mvc.perform(
			MockMvcRequestBuilders.post("/user/signup")				
				.content(testUser.toJSONString())
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				)
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.status").value("success"))
				.andDo(new ResultHandler(){
					@Override
					public void handle(MvcResult result) throws Exception {
						System.out.println("----"+result.getResponse().getContentAsString());
					}
				});
				*/
	}

	@Test
	public void testLogin() throws Exception{
		JSONObject testUser = new JSONObject();
		testUser.put("email", "admin");
		testUser.put("password", "123");
		
		mvc.perform(
			MockMvcRequestBuilders.post("/user/login")				
				.content(testUser.toJSONString())
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				)
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.status").value("success"))
				.andDo(new ResultHandler(){
					@Override
					public void handle(MvcResult result) throws Exception {
						JSONObject res = JSONObject.parseObject(result.getResponse().getContentAsString());
						setToken(res.getString("token"));
						System.out.println("----"+getToken());
					}
				});
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
