package com.varunK.crud.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="event")
public class Event {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @Column(name="username", nullable=false)
    private String username;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "startTime", nullable = false)
    private LocalTime start;

    @Column(name = "endTime",nullable = false)
    private LocalTime end;

    @Column(name = "triggerdate", nullable = false)
    private LocalDate triggerdate;

    @Column(name = "recurrence", nullable = false)
    private int recurrence;

    public Event() {
        super();
    }

    public Event(String username, String name, LocalTime start, LocalTime end, LocalDate triggerdate, int recurrence) {
        super();
        this.username = username;
        this.name = name;
        this.start = start;
        this.end = end;
        this.triggerdate = triggerdate;
        this.recurrence = recurrence;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalTime getStart() {
        return start;
    }

    public void setStart(LocalTime start) {
        this.start = start;
    }

    public LocalTime getEnd() {
        return end;
    }

    public void setEnd(LocalTime end) {
        this.end = end;
    }

    public LocalDate getTriggerdate() {
        return triggerdate;
    }

    public void setTriggerdate(LocalDate triggerdate) {
        this.triggerdate = triggerdate;
    }

    public int getRecurrence() {
        return recurrence;
    }

    public void setRecurrence(int recurrence) {
        this.recurrence = recurrence;
    }
}
