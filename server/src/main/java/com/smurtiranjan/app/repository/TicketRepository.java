package com.smurtiranjan.app.repository;

import com.smurtiranjan.app.models.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    List<Ticket> findByTitle(String title);
    List<Ticket> findByDescription(String keyword);
    List<Ticket> findByStatus(String status);
    List<Ticket> findByPriority(String priority);
    List<Ticket> findByCreatedBy(String createdBy);
    List<Ticket> findByAssignedTo(String assignedTo);
    List<Ticket> findByType(String type);
}
