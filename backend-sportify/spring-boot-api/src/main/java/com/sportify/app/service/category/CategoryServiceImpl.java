package com.sportify.app.service.category;

import com.sportify.app.entity.Category;
import com.sportify.app.exception.AlreadyExistsException;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Author: Paras Dongre
 * Date Created:20-12-2024
 * Time Created:23:17
 */
@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found for Id: "+id));
    }

    @Override
    public Category getCategoryByName(String categoryName) {
        return categoryRepository.findByName(categoryName);
    }

    @Override
    public Category addCategory(Category category) {

        return Optional.of(category)
                .filter(c -> !categoryRepository.existsByName(c.getName()))
                .map(c -> categoryRepository.save(c))
                .orElseThrow(() -> new AlreadyExistsException(category.getName()+" Category Already Exists!"));
    }

    @Override
    public Category updateCategory(Category category, long id) {
        // We check if Category exists by ID
        // If yes, map the changes into the oldCategory and save it
        // Otherwise throw Exception
        return Optional.ofNullable(getCategoryById(id))
                .map(oldCategory -> {
                    oldCategory.setName(category.getName());
                    oldCategory.setCategoryDescription(category.getCategoryDescription());
                    return categoryRepository.save(oldCategory);
                }).orElseThrow(() -> new ResourceNotFoundException("Category not found for Id: "+id));
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepository.findById(id)
                .ifPresentOrElse(p -> categoryRepository.delete(p), () -> {
                    throw new ResourceNotFoundException("Category not found for Id: "+id);
                });
    }
}
