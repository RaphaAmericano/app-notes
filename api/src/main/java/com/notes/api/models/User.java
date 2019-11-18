package com.notes.api.models;


import org.springframework.data.annotation.Id;

public class User {

    @Id
    private int id;
    private String nome;
    private String email;
    private String senha;

    public User(){}



}
