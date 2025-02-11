package com.sportify.app.repository;

import com.sportify.app.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryName(String category);
    List<Product> findByBrand(String brand);
    List<Product> findByCategoryNameAndBrand(String category, String brand);
    List<Product> findByProductName(String productName);
    List<Product> findByProductNameAndBrand(String productName, String brand);
    List<Product> findByCategoryNameAndProductName(String category, String productName);

    boolean existsByProductNameAndBrand(String name, String brand);


}
