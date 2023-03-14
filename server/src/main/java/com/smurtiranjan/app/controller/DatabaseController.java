package com.smurtiranjan.app.controller;

import com.smurtiranjan.app.models.Database;
import com.smurtiranjan.app.repository.DatabaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/databases")
public class DatabaseController {

    @Autowired
    private DatabaseRepository databaseRepository;

    @GetMapping("/")
    public ResponseEntity<List<Database>> getAllDatabases(){
        List<Database> database = this.databaseRepository.findAll();
        System.out.println("database: " + database);
        return ResponseEntity.ok(database);
    }

    @PutMapping("/")
    public ResponseEntity<?> updateDatabase(@RequestBody Database database){
        String id = "63ff8e1587232343939c69f5";
        Database databaseFromDb = this.databaseRepository.findById(id).get();
        System.out.println("database: " + database.getCategories());
        databaseFromDb.setCategories(database.getCategories());
        databaseFromDb.setAssignees(database.getAssignees());
        Database updatedDatabase = this.databaseRepository.save(databaseFromDb);
        return ResponseEntity.ok(updatedDatabase);
    }

    @PostMapping("/")
    public ResponseEntity<?> addDatabase(@RequestBody Database database){
        Database createdDatabase =  this.databaseRepository.save(database);
        return ResponseEntity.ok(createdDatabase);
    }
}
