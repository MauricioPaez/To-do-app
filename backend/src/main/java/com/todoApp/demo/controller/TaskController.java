package com.todoApp.demo.controller;

import com.todoApp.demo.model.Task;
import com.todoApp.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping("")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping("/create")
    public Task createTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTask(@RequestBody Task task, @PathVariable Integer id) {
        try {
            Task existingTask = taskService.getTaskById(id);
            task.setId(id);
            taskService.saveTask(task);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
    }

}
