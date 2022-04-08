package com.todoApp.demo.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "task")
public class Task {
    private int id;
    private String name;
    private int active;
    private Date created_date;

    public Task() {
    }

    public Task(int id, String name, int active, Date createdDate) {
        this.id = id;
        this.name = name;
        this.active = active;
        this.created_date = createdDate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }
}
