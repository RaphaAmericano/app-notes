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

    public User getById(int id){
        String query = "SELECT * FROM USERS WHERE ID = ? LIMIT 1";
        RowMapper<User> rowMapper = new UserMapper();
        try{
            User user = this.jdbcTemplate.queryForObject(query, rowMapper, id);
            return user;
        } catch (IncorrectResultSizeDataAccessException se ){
            return null;
        }
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

    public boolean insertUser(User user){
        String query = "INSERT INTO USERS(NOME, EMAIL, SENHA) VALUES(?, ?, ?)";
        try {
            jdbcTemplate.update(query, user.getNome(), user.getEmail(), user.getSenha());
            return true;
        } catch (IncorrectResultSizeDataAccessException se ){
            return false;
        }
    }

    public boolean updateUser(User user){
        String query = "UPDATE USERS SET NOME = ?, EMAIL = ? WHERE ID = ?";
        try {
            jdbcTemplate.update(query, user.getNome(), user.getEmail(), user.getId());
            return true;
        } catch (IncorrectResultSizeDataAccessException se ){
            return false;
        }
    }

    public boolean updatePassword(User user){
        String query = "UPDATE USERS SET SENHA = ? WHERE ID = ?";
        try {
            jdbcTemplate.update(query, user.getSenha(), user.getId());
            return true;
        } catch(IncorrectResultSizeDataAccessException se) {
            return false;
        }
    }

    public boolean deleteUser(int id ){
        String query = "DELETE FROM USERS WHERE ID = ?";
        try {
            jdbcTemplate.update(query, id);
            return true;
        } catch (IncorrectResultSizeDataAccessException se ){
            return false;
        }
    }

}
