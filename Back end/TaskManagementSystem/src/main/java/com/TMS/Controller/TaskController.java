package com.TMS.Controller;

import com.TMS.Entity.Task;
import com.TMS.Service.JwtService;
import com.TMS.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api")
public class TaskController {
    @Autowired
    JwtService jwtService;
    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks(){

        return taskService.getAllTasks();
    }
    @CrossOrigin
    @GetMapping("/tasks1")
    public String getAllTasks1(){
        return "1";
    }

    @GetMapping("/tasks/{id}")
    public ResponseEntity<?> findTaskById(@PathVariable("id") int taskId){
        return taskService.getTaskById(taskId);
    }

    @PostMapping("/tasks")
    public ResponseEntity<String> addNewTask(@RequestBody Task task){
        String email = jwtService.getUsernameFromAuthentication();
        return taskService.addTask(email,task);
    }

    @PostMapping("/tasks/{id}")
    public ResponseEntity<String> updateTask(@PathVariable("id")int taskId,@RequestBody Task task){
        return taskService.updateTask(taskId,task);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id")int taskId){
        return taskService.deleteTask(taskId);
    }
}
