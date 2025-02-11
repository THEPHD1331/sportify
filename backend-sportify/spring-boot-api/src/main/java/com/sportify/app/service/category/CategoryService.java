package com.sportify.app.service.category;

import com.sportify.app.entity.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAllCategories();
    Category getCategoryById(long id);
    Category getCategoryByName(String categoryName);
    Category addCategory(Category category);
    Category updateCategory(Category category, long id);
    void deleteCategory(long id);
}
