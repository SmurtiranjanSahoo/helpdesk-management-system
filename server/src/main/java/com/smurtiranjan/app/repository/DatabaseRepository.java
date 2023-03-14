package com.smurtiranjan.app.repository;

import com.smurtiranjan.app.models.Database;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DatabaseRepository extends MongoRepository<Database, String> {
}
