package com.varunK.crud.repository;

import com.varunK.crud.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventsRepo extends JpaRepository<Event, Long> {
    public List<Event> findByUsername(String username);
    public List<Event> findByUsernameAndTriggerdate(String username, LocalDate triggerdate);
}
