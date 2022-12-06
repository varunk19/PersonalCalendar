package com.varunK.crud.contoller;

import com.varunK.crud.models.Event;
import com.varunK.crud.repository.EventsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {
    @Autowired
    private EventsRepo eventsRepo;

    @GetMapping("getToday")
    public ResponseEntity<List<Event>> getTodayPlans(@RequestParam String username, @RequestParam String date){
        try{
            LocalDate triggerdate = LocalDate.parse(date);
            return new ResponseEntity<List<Event>>(eventsRepo.findByUsernameAndTriggerdate(username, triggerdate), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<List<Event>>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("getAll")
    public ResponseEntity<List<Event>> getAllPlans(@RequestParam String username){
        try{
            return new ResponseEntity<List<Event>>(eventsRepo.findByUsername(username), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<List<Event>>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("addEvent")
    public ResponseEntity<List<Event>> addEvent(@RequestBody Event event){
        try{
            if(this.eventsRepo.save(event) != null){
                return new ResponseEntity<List<Event>>(HttpStatus.ACCEPTED);
            }
            else
                return new ResponseEntity<List<Event>>(HttpStatus.NOT_ACCEPTABLE);
        }
        catch (Exception e){
            return new ResponseEntity<List<Event>>(HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("updateEvent")
    public ResponseEntity<List<Event>> updateEvent(@RequestBody Event event){
        try{
            Event e = eventsRepo.findById(event.getId()).get();
            if(e != null)
            {
                e.setName(event.getName());
                e.setStart(event.getStart());
                e.setEnd(event.getEnd());
                e.setRecurrence(event.getRecurrence());
                e.setTriggerdate(event.getTriggerdate());
                this.eventsRepo.save(e);
                return new ResponseEntity<List<Event>>(HttpStatus.ACCEPTED);
            }
            else{
                return new ResponseEntity<List<Event>>(HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            return new ResponseEntity<List<Event>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("deleteEvent")
    public ResponseEntity<List<Event>> deleteEvent(@RequestParam String id){
        try{
            Event e = eventsRepo.findById(Long.parseLong(id)).get();
            if(e != null)
            {
                this.eventsRepo.delete(e);
                return new ResponseEntity<List<Event>>(HttpStatus.ACCEPTED);
            }
            else{
                return new ResponseEntity<List<Event>>(HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            return new ResponseEntity<List<Event>>(HttpStatus.BAD_REQUEST);
        }
    }
}
