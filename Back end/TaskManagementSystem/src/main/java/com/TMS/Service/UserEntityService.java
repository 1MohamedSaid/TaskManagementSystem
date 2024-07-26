package com.TMS.Service;

import com.TMS.Entity.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserEntityService {
     ResponseEntity<String> registerUser(UserEntity user);

     ResponseEntity<String> login(UserEntity user);


}
