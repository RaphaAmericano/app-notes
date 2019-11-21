package com.notes.api.controllers;

import com.notes.api.models.User;
import com.notes.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> list = userService.getAllUsers();
        return new ResponseEntity<List<User>>(list, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Void> addUser(@RequestBody User user){
        boolean flag = userService.addUser(user);
        if(flag == false){
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("check")
    public ResponseEntity<String> checkUser(@RequestBody User user){
        String userCheck = userService.checkUser(user);
        if(userCheck == null){
            return new ResponseEntity<String>("Erro",  HttpStatus.CONFLICT);
        }
        return new ResponseEntity<String>(userCheck, HttpStatus.OK);
    }


}
