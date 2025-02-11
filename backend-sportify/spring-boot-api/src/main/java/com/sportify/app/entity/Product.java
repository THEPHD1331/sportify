package com.sportify.app.entity;

/**
 * Author: Paras Dongre
 * Date Created:17-12-2024
 * Time Created:12:55
 */

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString(callSuper = true)
public class Product extends BaseEntity{

    private String productName;
    private String brand;
    private String productDescription;
    private int productPrice;
    private int itemsInStock;
    private double rating;

    @OneToOne(mappedBy = "product", orphanRemoval = true, cascade = CascadeType.ALL)
    private Image image;

    // Product *-->1 Category
    // Child, owning, non-inverse
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public Product(String productName, String brand, String productDescription,
                   int productPrice, int itemsInStock, double rating, Category category) {
        this.productName = productName;
        this.brand = brand;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.itemsInStock = itemsInStock;
        this.rating = rating;
        this.category = category;
    }
    public Product(){}
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public int getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(int productPrice) {
        this.productPrice = productPrice;
    }

    public int getItemsInStock() {
        return itemsInStock;
    }

    public void setItemsInStock(int itemsInStock) {
        this.itemsInStock = itemsInStock;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}