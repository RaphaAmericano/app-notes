package com.notes.api.controllers;

import com.notes.api.models.User;
import com.notes.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Properties;


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

    @GetMapping("email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email){
        User user = userService.getUserByEmail(email);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Boolean> addUser(@RequestBody User user){
        boolean flag = userService.addUser(user);
        if(flag == false){
            return new ResponseEntity<Boolean>(flag, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
    }

    @PostMapping(value = "check", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Properties> checkUser(@RequestBody User user){
        String userCheck = userService.checkUser(user);
        Properties props = new Properties();
        props.put("response", userCheck);
        if(userCheck == null){
            return new ResponseEntity<Properties>(props,  HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Properties>(props  ,HttpStatus.OK);
    }

    @PostMapping(value = "check/email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> checkEmail(@RequestBody String email ){
        Boolean emailCheck = userService.checkEmail(email);
        if(emailCheck == null ){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Boolean>(emailCheck, HttpStatus.OK);
    }

    @PostMapping("check/password")
    public ResponseEntity<Boolean> checkPassword(@RequestBody User user){
        Boolean flag = userService.checkPassword(user);
        if(flag == null ){
            return new ResponseEntity<Boolean>(flag, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
    }

    @PutMapping("update")
    public ResponseEntity<Boolean> updateUser(@RequestBody User user ){
        Boolean updateUserCheck = userService.updateUser(user);
        if(updateUserCheck == null ){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Boolean>(updateUserCheck, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") int id ){
        Boolean deleteUserCheck = userService.deleteUser(id);
        if(deleteUserCheck == null ){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Boolean>(deleteUserCheck, HttpStatus.OK);
    }

    @PutMapping("update/password")
    public ResponseEntity<Boolean> updatePassword(@RequestBody User user){
        Boolean flag = userService.updatePassword(user);
        if(flag == null){
            return new ResponseEntity<Boolean>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
    }



}
