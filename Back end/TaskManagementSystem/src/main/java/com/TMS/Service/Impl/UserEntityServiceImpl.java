package com.TMS.Service.Impl;

import com.TMS.Entity.UserEntity;
import com.TMS.Repository.UserEntityRepository;
import com.TMS.Service.JwtService;
import com.TMS.Service.UserEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserEntityServiceImpl implements UserEntityService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserEntityRepository userEntityRepository;
    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public ResponseEntity<String> registerUser(UserEntity user) {
        Optional<UserEntity> getEmailInDatabase = userEntityRepository.findByEmail(user.getEmail());
        if (getEmailInDatabase.isPresent()) {
            return new ResponseEntity<>("Sorry, this email is taken", HttpStatus.BAD_REQUEST);

        } else {
            UserEntity user1 = new UserEntity();
            user1.setEmail(user.getEmail());
            user1.setPassword(passwordEncoder.encode(user.getPassword()));
            userEntityRepository.save(user1);
            return new ResponseEntity<>("User Registered Successfully", HttpStatus.OK);
        }
    }

    @Override
    public ResponseEntity<String> login(UserEntity user) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(user.getEmail());
            return new ResponseEntity<>(token, HttpStatus.OK);
        } else
            throw new UsernameNotFoundException("invalid user!");
    }
}
