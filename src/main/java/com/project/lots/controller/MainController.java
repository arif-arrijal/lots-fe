package com.project.lots.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping("/")
    public String index(){
        return "dashboard/index";
    }

    @RequestMapping("/login")
    public String login(){
        return "auth/login";
    }
}
