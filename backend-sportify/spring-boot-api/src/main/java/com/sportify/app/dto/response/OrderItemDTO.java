package com.sportify.app.dto.response;

import java.math.BigDecimal;

/**
 * Author: Paras Dongre
 * Date Created:31-01-2025
 * Time Created:13:54
 */
public class OrderItemDTO {

    private Long productId;
    private String productName;
    private String productBrand;
    private int quantity;
    private int price;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductBrand() {
        return productBrand;
    }

    public void setProductBrand(String productBrand) {
        this.productBrand = productBrand;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "OrderItemDTO{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", productBrand='" + productBrand + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
