package com.TMS.Controller;

import com.TMS.Entity.UserEntity;
import com.TMS.Service.UserEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserEntityService userEntityService;


    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserEntity user) {
        return userEntityService.registerUser(user);
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserEntity user) {
        return userEntityService.login(user);
    }
}
