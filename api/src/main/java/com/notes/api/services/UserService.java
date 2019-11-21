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

    public synchronized boolean addUser(User user){
        userDAO.insertUser(user);
        return true;
    }

    public synchronized String checkUser( User user){
        String retorno;
        User userCheckEmail = userDAO.getByEmail(user.getEmail());
        User userCheckPassword = userDAO.getByPassword(user.getSenha());

        if( userCheckEmail == null || !userCheckEmail.getEmail().equals(user.getEmail()) ){
            retorno = "Email Inexistente";
            return retorno;
        }
        if( userCheckPassword == null || !userCheckPassword.getSenha().equals(user.getSenha())){
            retorno = "Senha Inválida";
            return retorno;
        }
        return "Ok";
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
