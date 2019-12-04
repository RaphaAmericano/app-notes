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

        // varificar email
        System.out.println(user.getEmail());
        //User userToCheck = userDAO.getByEmail(user.getEmail());
        //System.out.println(userToCheck.getEmail());
//        if(user.getEmail().equals(userToCheck.getEmail())){
//            return false;
//        }
        System.out.println("SERVICE TRUE");
        return userDAO.insertUser(user);
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
        return "OK";
    }

    public synchronized Boolean checkEmail( String email ){
        User emailCheck = userDAO.getByEmail(email);
        if(emailCheck == null || email.trim().equals("")){
            return false;
        }
        return true;
    }

    public synchronized User getUserByEmail(String email ){
        User user = userDAO.getByEmail(email);
        if(user == null){
            return null;
        }
        return user;
    }

    public synchronized Boolean updateUser(User user){
        Boolean check = userDAO.updateUser(user);
        if(user == null ){
            return null;
        }
        return check;
    }

    public synchronized Boolean deleteUser(int id){
        Boolean check = userDAO.deleteUser(id);
        if(check == null){
            return null;
        }
        return check;
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
