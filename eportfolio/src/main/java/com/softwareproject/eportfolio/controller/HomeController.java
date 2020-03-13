package com.softwareproject.eportfolio.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class HomeController{
    
    @RequestMapping("/")
    public String homeTest() {
        return "test";
    }
    
}