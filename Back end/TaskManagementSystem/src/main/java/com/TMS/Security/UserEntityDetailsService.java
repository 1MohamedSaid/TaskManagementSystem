package com.TMS.Security;

import com.TMS.Entity.UserEntity;
import com.TMS.Repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component
public class UserEntityDetailsService implements UserDetailsService {

    @Autowired
    UserEntityRepository userEntityRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserEntity> userInfo = userEntityRepository.findByEmail(email);
        return userInfo.map(UserEntityDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found " + email));
    }
}
