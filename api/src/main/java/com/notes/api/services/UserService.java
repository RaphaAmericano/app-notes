package com.notes.api.services;

import com.notes.api.daos.UserDAO;
import com.notes.api.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
//
    @Autowired
    private UserDAO userDAO;

    public List<User> getAllUsers(){
        return userDAO.getAllUsers();
    }
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public List<User> listarUser() {
//        return this.userRepository.;
//    }
//
//    @Override
//    public User atualizar(User user) {
//        return null;
//    }
//
//    @Override
//    public User cadastrar(User user) {
//        return null;
//    }
//
//    @Override
//    public User listarPorId(int id) {
//        return null;
//    }
//
//    @Override
//    public void remover(int id) {
//
//    }
}
