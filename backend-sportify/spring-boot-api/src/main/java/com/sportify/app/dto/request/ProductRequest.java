package com.sportify.app.dto.request;

import com.sportify.app.entity.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Author: Paras Dongre
 * Date Created:20-12-2024
 * Time Created:18:12
 */
@ToString
public class ProductRequest {

    private String productName;
    private String brand;
    private String productDescription;
    private int productPrice;
    private int itemsInStock;
    private double rating;
    private Category category;

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
