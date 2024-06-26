package com.s1411mjava.edtech.repository;

import com.s1411mjava.edtech.entity.Course;
import com.s1411mjava.edtech.entity.Enrollment;
import com.s1411mjava.edtech.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findAllByUser(User user);
    List<Enrollment> findAllByCourse(Course course);

    boolean existsByUserIdAndCourseId(Long id, Long id1);

    Optional<Enrollment> findByUserIdAndCourseId(Long id, Long id1);
}
