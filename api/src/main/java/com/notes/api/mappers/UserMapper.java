package com.notes.api.mappers;

import com.notes.api.models.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("ID"));
        user.setNome(rs.getString("NOME"));
        user.setEmail(rs.getString("EMAIL"));
        user.setSenha(rs.getString("SENHA"));
        return user;
    }
}
