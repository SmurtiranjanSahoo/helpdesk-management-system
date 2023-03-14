package com.smurtiranjan.app.controller;

import com.smurtiranjan.app.models.User;
import com.smurtiranjan.app.repository.UserRepository;
import com.sun.jdi.InterfaceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> addUser(@RequestBody User user){

        String email = user.getEmail();
        String role = user.getRole();

        // BUG: If the same user have multiple roles, then this will not work i.e Admin and Customer
        User userFromDb = this.userRepository.findByEmail(email);
        System.out.println(userFromDb);
        if(userFromDb != null && userFromDb.getRole().equals(role)){
            return ResponseEntity.status(400).body("User already exists");
        }
       return ResponseEntity.ok(this.userRepository.save(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") String id, @RequestBody User user){
        User userFromDb = this.userRepository.findById(id).get();
        userFromDb.setName(user.getName());
        userFromDb.setEmail(user.getEmail());
        userFromDb.setPassword(user.getPassword());
        userFromDb.setRole(user.getRole());
        return ResponseEntity.ok(this.userRepository.save(userFromDb));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> getUser(@RequestBody User user){
            String email = user.getEmail();
            String role = user.getRole();
            String password = user.getPassword();
           User userFromDb = this.userRepository.findByEmail(email);
            if(userFromDb == null){
                return ResponseEntity.status(400).body("User does not exists");
            }
            if(userFromDb.getRole().equals(role)){
                if(userFromDb.getPassword().equals(password)){
                    return ResponseEntity.ok(userFromDb);
                }
                return ResponseEntity.status(400).body("Password is incorrect");
            }
            return ResponseEntity.status(400).body("User does not exists");

    }


}
