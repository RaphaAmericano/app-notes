package com.notes.api.repositorys;

import com.notes.api.models.User;
import org.springframework.data.repository.Repository;

public interface UserRepository extends Repository<User, Integer> {}
