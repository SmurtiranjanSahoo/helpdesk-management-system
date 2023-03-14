package com.smurtiranjan.app.controller;
import com.smurtiranjan.app.models.Ticket;
import com.smurtiranjan.app.repository.TicketRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;
    @PostMapping("/")
    public ResponseEntity<?> addTicket(@RequestBody Ticket ticket){
      Ticket createdTicket =  this.ticketRepository.save(ticket);
      System.out.println("createdTicket: " + createdTicket.getId());
        return ResponseEntity.ok(createdTicket);
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllTickets(){
        List<Ticket> tickets = this.ticketRepository.findAll();
        System.out.println("tickets: " + tickets);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTicket(@PathVariable("id") String id){
        return ResponseEntity.ok(this.ticketRepository.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTicket(@PathVariable("id") String id, @RequestBody Ticket ticket){
        System.out.println("id: " + ticket);
        Ticket ticketFromDb = this.ticketRepository.findById(id).get();
        ticketFromDb.setType(ticket.getType());
        ticketFromDb.setStatus(ticket.getStatus());
        ticketFromDb.setTitle(ticket.getTitle());
        ticketFromDb.setDescription(ticket.getDescription());
        ticketFromDb.setPriority(ticket.getPriority());
        ticketFromDb.setAssignedTo(ticket.getAssignedTo());
        ticketFromDb.setDeadline(ticket.getDeadline());
        Ticket updatedTicket = this.ticketRepository.save(ticketFromDb);
        return ResponseEntity.ok(updatedTicket);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable("id") String id){
        this.ticketRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Ticket deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchTicket(@PathVariable("keyword") String keyword){
        List<Ticket> tickets = this.ticketRepository.findByTitle(keyword);
        List<Ticket> ticketsByDescription = this.ticketRepository.findByDescription(keyword);
        tickets.addAll(ticketsByDescription);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/searchByType/{type}")
    public ResponseEntity<?> searchTicketByType(@PathVariable("type") String type){
        List<Ticket> tickets = this.ticketRepository.findByType(type);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/searchByPriority/{priority}")
    public ResponseEntity<?> searchTicketByPriority(@PathVariable("priority") String priority){
        List<Ticket> tickets = this.ticketRepository.findByPriority(priority);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/searchByStatus/{status}")
    public ResponseEntity<?> searchTicketByStatus(@PathVariable("status") String status){
        List<Ticket> tickets = this.ticketRepository.findByStatus(status);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/searchByAssignedTo/{assignedTo}")
    public ResponseEntity<?> searchTicketByAssignedTo(@PathVariable("assignedTo") String assignedTo){
        List<Ticket> tickets = this.ticketRepository.findByAssignedTo(assignedTo);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/searchByCreatedBy/{createdBy}")
    public ResponseEntity<?> searchTicketByCreatedBy(@PathVariable("createdBy") String createdBy){
        List<Ticket> tickets = this.ticketRepository.findByCreatedBy(createdBy);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics(){
        List<Ticket> tickets = this.ticketRepository.findAll();
        Map<String, Integer> response = new HashMap<>();
        int totalTickets = tickets.size();
        int totalOpenTickets = ticketRepository.findByStatus("open").size();
        int totalPendingTickets = ticketRepository.findByStatus("pending").size();
        int totalClosedTickets = ticketRepository.findByStatus("closed").size();
        int totalHighPriorityTickets = ticketRepository.findByPriority("high").size();
        int totalMediumPriorityTickets = ticketRepository.findByPriority("medium").size();
        int totalLowPriorityTickets = ticketRepository.findByPriority("low").size();
        response.put("totalTickets", totalTickets);
        response.put("totalOpenTickets", totalOpenTickets);
        response.put("totalPendingTickets", totalPendingTickets);
        response.put("totalClosedTickets", totalClosedTickets);
        response.put("totalHighPriorityTickets", totalHighPriorityTickets);
        response.put("totalMediumPriorityTickets", totalMediumPriorityTickets);
        response.put("totalLowPriorityTickets", totalLowPriorityTickets);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable("id") String id, @RequestBody Ticket ticket){
        Ticket ticketFromDb = this.ticketRepository.findById(id).get();
        ticketFromDb.setStatus(ticket.getStatus());
        Ticket updatedTicket = this.ticketRepository.save(ticketFromDb);
        return ResponseEntity.ok(updatedTicket);
    }

    @PutMapping("/updatePriority/{id}")
    public ResponseEntity<?> updatePriority(@PathVariable("id") String id, @RequestBody Ticket ticket){
        Ticket ticketFromDb = this.ticketRepository.findById(id).get();
        ticketFromDb.setPriority(ticket.getPriority());
        Ticket updatedTicket = this.ticketRepository.save(ticketFromDb);
        return ResponseEntity.ok(updatedTicket);
    }

    @PutMapping("/updateAssignedTo/{id}")
    public ResponseEntity<?> updateAssignedTo(@PathVariable("id") String id, @RequestBody Ticket ticket){
        Ticket ticketFromDb = this.ticketRepository.findById(id).get();
        ticketFromDb.setAssignedTo(ticket.getAssignedTo());
        Ticket updatedTicket = this.ticketRepository.save(ticketFromDb);
        return ResponseEntity.ok(updatedTicket);
    }

    @PutMapping("/updateDescription/{id}")
    public ResponseEntity<?> updateDescription(@PathVariable("id") String id, @RequestBody Ticket ticket){
        Ticket ticketFromDb = this.ticketRepository.findById(id).get();
        ticketFromDb.setDescription(ticket.getDescription());
        Ticket updatedTicket = this.ticketRepository.save(ticketFromDb);
        return ResponseEntity.ok(updatedTicket);
    }

    @PutMapping("/updateTitle/{id}")
    public ResponseEntity<?> updateTitle(@PathVariable("id") String id, @RequestBody Ticket ticket){
        Ticket ticketFromDb = this.ticketRepository.findById(id).get();
        ticketFromDb.setTitle(ticket.getTitle());
        Ticket updatedTicket = this.ticketRepository.save(ticketFromDb);
        return ResponseEntity.ok(updatedTicket);
    }

    @PutMapping("/updateType/{id}")
    public ResponseEntity<?> updateType(@PathVariable("id") String id, @RequestBody Ticket ticket) {
        Ticket ticketFromDb = this.ticketRepository.findById(id).get();
        ticketFromDb.setType(ticket.getType());
        Ticket updatedTicket = this.ticketRepository.save(ticketFromDb);
        return ResponseEntity.ok(updatedTicket);
    }

//    add custom field to ticket
    @PutMapping("/addCustomField/{id}")
    public ResponseEntity<?> addCustomField(@PathVariable("id") String id, @RequestBody Ticket ticket){
        Ticket ticketFromDb = this.ticketRepository.findById(id).get();
        ticketFromDb.setCustomFields(ticket.getCustomFields());
        Ticket updatedTicket = this.ticketRepository.save(ticketFromDb);
        return ResponseEntity.ok(updatedTicket);
    }
}
