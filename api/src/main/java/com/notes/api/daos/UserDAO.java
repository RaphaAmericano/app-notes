package com.notes.api.daos;

import com.notes.api.models.User;

import java.util.List;

public interface UserDAO {
    List<User> listarUser();

    User listarPorId(int id);

    User cadastrar(User user);

    User atualizar(User user);

    void remover(int id);

}
