package com.smurtiranjan.app.repository;

import com.smurtiranjan.app.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
