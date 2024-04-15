package com.s1411mjava.edtech.service.impl;
import com.s1411mjava.edtech.dtos.CreateCourseDTO;
import com.s1411mjava.edtech.dtos.CreatedCourseDTO;
import com.s1411mjava.edtech.dtos.TeacherDto;
import com.s1411mjava.edtech.entity.*;
import com.s1411mjava.edtech.entity.Module;
import com.s1411mjava.edtech.exception.ResourceNotFoundException;
import com.s1411mjava.edtech.mapper.CourseModuleMapper;
import com.s1411mjava.edtech.repository.*;
import com.s1411mjava.edtech.service.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final CategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;

    private final UserRepository userRepository;

    private final CourseModuleMapper courseMapper;

    @Override
    public TeacherDto createTeacher(TeacherDto teacherDto) {


        Teacher teacher = new Teacher();
        teacher.setExperience(teacherDto.getExperience());
        teacher.setCredentials(teacherDto.getCredentials());
        teacher.setInfo(teacherDto.getInfo());
        teacher.setUser(getCurrentUser());

        Teacher savedTeacher = teacherRepository.save(teacher);

        return convertToDto(savedTeacher);
    }

    @Override
    public CreatedCourseDTO createCourse(CreateCourseDTO createCourseDTO) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email);

        Teacher teacher = teacherRepository
                .findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no está registrado"));


        Category category = categoryRepository
                .findById(createCourseDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        Course course = courseMapper.toEntity(createCourseDTO);

        course.setTeacher(teacher);

        course.setCategory(category);

        Course savedCourse = courseRepository.save(course);

        List<Module> moduleList = course.getModules();

        moduleList.forEach(module -> module.setCourse(savedCourse));

        moduleList = moduleRepository.saveAll(moduleList);

        savedCourse.setModules(moduleList);

        courseRepository.save(savedCourse);

        return courseMapper.toDTO(savedCourse);
    }

    private TeacherDto convertToDto(Teacher teacher) {
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setId(teacher.getId());
        teacherDto.setExperience(teacher.getExperience());
        teacherDto.setCredentials(teacher.getCredentials());
        teacherDto.setInfo(teacher.getInfo());
        teacherDto.setUser_id(teacher.getUser().getId());

        return teacherDto;
    }

    private User getCurrentUser(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email);
    }
}
