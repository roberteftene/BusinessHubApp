package com.businesshub.be.controller;

import com.businesshub.be.models.AuthenticationRequest;
import com.businesshub.be.models.AuthenticationResponse;
import com.businesshub.be.models.UserModel;
import com.businesshub.be.service.UserService;
import com.businesshub.be.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping
public class UserController {

    @Resource
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @GetMapping(value = "/users")
    public List<UserModel> getUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }catch (BadCredentialsException e) {
            throw new Exception("Incorrect username of password",e);
        }
        final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping(value = "/createuser")
    public void createUser(@RequestBody UserModel userModel) {
        userService.createUser(userModel);
    }
}
