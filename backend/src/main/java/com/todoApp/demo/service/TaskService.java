package com.todoApp.demo.service;

import com.todoApp.demo.model.Task;
import com.todoApp.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public Task getTaskById(Integer id) {
        return taskRepository.findById(id).get();
    }

    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }
}
