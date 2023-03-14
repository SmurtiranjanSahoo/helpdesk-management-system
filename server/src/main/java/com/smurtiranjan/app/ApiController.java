package com.smurtiranjan.app;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ApiController {

    @GetMapping("/api")
    public String helloWorld(){
        return "Hello World from Spring Boot";
    }

//    @GetMapping("/api2")
//    public ResponseEntity<Map<String, String>> helloWorld2(){
//        Map<String, String> response = new HashMap<>();
//        response.put("key", "value");
//
//        return ResponseEntity.ok(response);
//
//    }
}
