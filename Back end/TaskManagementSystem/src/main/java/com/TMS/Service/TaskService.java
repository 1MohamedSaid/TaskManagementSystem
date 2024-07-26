package com.TMS.Service;

import com.TMS.Entity.Task;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TaskService {

    ResponseEntity<List<Task>> getAllTasks();

    ResponseEntity<?> getTaskById(int taskId);

    ResponseEntity<String> addTask (String email,Task task);

    ResponseEntity<String> updateTask(int taskId,Task task);

    ResponseEntity<String> deleteTask(int taskId);
}
