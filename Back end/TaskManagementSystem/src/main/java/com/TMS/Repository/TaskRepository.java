package com.TMS.Repository;

import com.TMS.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findAllByUserId(int userId);
    Optional<Task> findByIdAndUserId(int taskId, int userId);

}
