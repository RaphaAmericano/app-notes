package com.notes.api.daos;

import com.notes.api.mappers.UserMapper;
import com.notes.api.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public class UserDAO {

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public UserDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<User> getAllUsers(){
        String query = "SELECT * FROM USERS";
        RowMapper<User> rowMapper = new UserMapper();
        return this.jdbcTemplate.query(query, rowMapper);
    }
//
//    List<User> listarUser();
//
//    User listarPorId(int id);
//
    public void insertUser(User user){
           String query = "INSERT INTO USERS(NOME, EMAIL, SENHA) VALUES(?, ?, ?)";
            jdbcTemplate.update(query, user.getNome(), user.getEmail(), user.getSenha());

    }
//
//    User atualizar(User user);
//
//    void remover(int id);

}
