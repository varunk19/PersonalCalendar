package com.varunK.crud.repository;

import com.varunK.crud.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;


@Repository
public interface UsersRepo extends JpaRepository<User, String> {
    public User findByUsernameAndPassword(String username, String password);
}
