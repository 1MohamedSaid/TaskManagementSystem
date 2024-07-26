package com.TMS.Service.Impl;

import com.TMS.Entity.Task;
import com.TMS.Entity.UserEntity;
import com.TMS.Repository.TaskRepository;
import com.TMS.Repository.UserEntityRepository;
import com.TMS.Service.JwtService;
import com.TMS.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    TaskRepository taskRepository;
    @Autowired
    UserEntityRepository userEntityRepository;
    @Autowired
    JwtService jwtService;

    @Override
    public ResponseEntity<List<Task>> getAllTasks() {
        try{
            String email = jwtService.getUsernameFromAuthentication();
            UserEntity user = userEntityRepository.findByEmail(email).get();
            System.out.println("here");
            return new ResponseEntity<>(taskRepository.findAllByUserId(user.getId()), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<?> getTaskById(int taskId) {
        try{
            String email = jwtService.getUsernameFromAuthentication();
            UserEntity user = userEntityRepository.findByEmail(email).get();
            return new ResponseEntity<>(taskRepository.findByIdAndUserId(taskId, user.getId()),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Error getting task, check your information and try again", HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<String> addTask(String userId,Task task) {
        try {
            String email= jwtService.getUsernameFromAuthentication();
            UserEntity user = userEntityRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            Task task1 = new Task();
            task1.setTitle(task.getTitle());
            task1.setStatus(task.getStatus());
            task1.setDescription(task.getDescription());
            task1.setDueDate(task.getDueDate());
            task1.setUserId(user.getId());
            taskRepository.save(task1);
            return new ResponseEntity<>("Task added to schedule!",HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Couldn't add task, check your info and try again",HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<String> updateTask(int taskId, Task task) {
        try {
            String email = jwtService.getUsernameFromAuthentication();
            UserEntity user1 = userEntityRepository.findByEmail(email).get();
            int user1Id = user1.getId();
            Task task1 = taskRepository.findById(taskId).get();
            int user2Id = task1.getUserId();
            if(user1Id==user2Id){
                task1.setTitle(task.getTitle());
                task1.setStatus(task.getStatus());
                task1.setDescription(task.getDescription());
                task1.setDueDate(task.getDueDate());
                taskRepository.save(task1);
                return new ResponseEntity<>("Task updated successfully!", HttpStatus.OK);
            }else {
                return new ResponseEntity<>("You are not authorized to update this task",HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Couldn't update task",HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<String> deleteTask(int taskId) {
        try {
            String email = jwtService.getUsernameFromAuthentication();
            UserEntity user1 = userEntityRepository.findByEmail(email).get();
            int user1Id = user1.getId();
            Task task1 = taskRepository.findById(taskId).get();
            int user2Id = task1.getUserId();
            if(user1Id==user2Id) {
                taskRepository.deleteById(taskId);
                return new ResponseEntity<>("task deleted successfully", HttpStatus.OK);
            }else {
                return new ResponseEntity<>("You are not authorized to delete this task",HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Couldn't delete task",HttpStatus.BAD_REQUEST);
    }
}
