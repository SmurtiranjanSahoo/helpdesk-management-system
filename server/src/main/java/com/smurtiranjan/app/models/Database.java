package com.smurtiranjan.app.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "databases")
public class Database {


    @Id
    private String id;
    private List<String> categories;

    private List<Map<String, Object>> assignees;

    private Database( List<String> categories, List<Map<String, Object>> assignees) {
        this.categories = categories;
        this.assignees = assignees;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<Map<String, Object>> getAssignees() {
        return assignees;
    }

    public void setAssignees(List<Map<String, Object>> assignees) {
        this.assignees = assignees;
    }



}
