/*
 * @Descripsion: 
 * @Author: Xuefeng Chen
 * @Date: 2020-05-07 18:24:46
 * @LastEditTime: 2020-05-08 20:38:18
 */
package com.softwareproject.eportfolio;

import com.alibaba.fastjson.JSONObject;

import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ProfileControllerTest {

    @Autowired
    private MockMvc mvc;

	private String token;

    private String userid;

    private JSONObject profile;

	@Autowired
	private WebApplicationContext context;

	@Before
	public void setUp() throws Exception{
		//mvc = MockMvcBuilders.standaloneSetup(new UserController()).build();
        //mvc = MockMvcBuilders.webAppContextSetup(context).build();
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
                        setUserid(res.getJSONObject("user").getString("id"));
						System.out.println("----login-------"+getToken());
						System.out.println("----login-------"+getUserid());
					}
				});
	}

	@Test
	public void testAdd() throws Exception{
		JSONObject testProfile = new JSONObject();
		testProfile.put("html", JSONObject.parse("{\"contetnt\":{\"fefa\":\"feafefef\"}}"));
        testProfile.put("url", "http://google.com");
        testProfile.put("userid", getUserid());
		
		//Email already exists
		mvc.perform(
			MockMvcRequestBuilders.post("/profile/add")				
				.content(testProfile.toJSONString())
                .contentType(MediaType.APPLICATION_JSON)
                .header("token", getToken())
				.accept(MediaType.APPLICATION_JSON)
				)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("success"))
				.andDo(new ResultHandler(){
					@Override
					public void handle(MvcResult result) throws Exception {
                        JSONObject res = JSONObject.parseObject(result.getResponse().getContentAsString());
                        System.out.println("----"+result.getResponse().getContentAsString());
                        setProfile(res.getJSONObject("profile"));
					}
				});
				
    }

    @Test
	public void testGet() throws Exception{
        JSONObject testProfile = new JSONObject();
        testProfile.put("profileid", "1");
		
		//Get by profileid
		mvc.perform(
			MockMvcRequestBuilders.post("/profile/get")				
				.content(testProfile.toJSONString())
                .contentType(MediaType.APPLICATION_JSON)
                .header("token", getToken())
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
        
        //Get by userid
        testProfile.put("userid", getUserid());
        testProfile.put("profileid", null);
        mvc.perform(
			MockMvcRequestBuilders.post("/profile/get")				
				.content(testProfile.toJSONString())
                .contentType(MediaType.APPLICATION_JSON)
                .header("token", getToken())
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
				
    }

    @Test
	public void testUpdate() throws Exception{
        JSONObject testProfile = new JSONObject();
        testProfile.put("id", "1");
		testProfile.put("html", JSONObject.parse("{\"contetnt\":{\"updated\":\"updated\"}}"));
        testProfile.put("url", "http://google.com");
        testProfile.put("userid", getUserid());
		//Get by profileid
		mvc.perform(
			MockMvcRequestBuilders.put("/profile/update")				
				.content(testProfile.toJSONString())
                .contentType(MediaType.APPLICATION_JSON)
                .header("token", getToken())
				.accept(MediaType.APPLICATION_JSON)
				)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("success"))
				.andDo(new ResultHandler(){
					@Override
					public void handle(MvcResult result) throws Exception {
                        System.out.println("----update----"+result.getResponse().getContentAsString());
					}
                });
        
        //Get by userid
        testProfile.put("userid", getUserid());
        testProfile.put("profileid", null);
        mvc.perform(
			MockMvcRequestBuilders.post("/profile/get")				
				.content(testProfile.toJSONString())
                .contentType(MediaType.APPLICATION_JSON)
                .header("token", getToken())
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

    /**
     * @return the userid
     */
    public String getUserid() {
        return userid;
    }

    /**
     * @param userid the userid to set
     */
    public void setUserid(String userid) {
        this.userid = userid;
    }

    /**
     * @param profile the profile to set
     */
    public void setProfile(JSONObject profile) {
        this.profile = profile;
    }
}