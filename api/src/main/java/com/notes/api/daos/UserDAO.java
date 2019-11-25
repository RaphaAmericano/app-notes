package com.notes.api.daos;

import com.notes.api.mappers.UserMapper;
import com.notes.api.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
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

    public User getByEmail(String email){
        String query = "SELECT * FROM USERS WHERE EMAIL = ? LIMIT 1";
        RowMapper<User> rowMapper = new UserMapper();
        try{
            User user = this.jdbcTemplate.queryForObject(query, rowMapper, email);
            return user;
        } catch (IncorrectResultSizeDataAccessException se ){
            return null;
        }

    }

    public User getByPassword(String password){
        String query = "SELECT * FROM USERS WHERE SENHA = ? LIMIT 1";
        RowMapper<User> rowMapper = new UserMapper();
        try{
            User user = this.jdbcTemplate.queryForObject(query, rowMapper, password);
            return user;
        } catch (IncorrectResultSizeDataAccessException se ) {
            return null;
        }
    }
//
//    List<User> listarUser();
//
//    User listarPorId(int id);
//
    public boolean insertUser(User user){
        String query = "INSERT INTO USERS(NOME, EMAIL, SENHA) VALUES(?, ?, ?)";
        try {
            jdbcTemplate.update(query, user.getNome(), user.getEmail(), user.getSenha());
            return true;
        } catch (IncorrectResultSizeDataAccessException se ){
            return false;
        }
    }
//
//    User atualizar(User user);
//
//    void remover(int id);

}
