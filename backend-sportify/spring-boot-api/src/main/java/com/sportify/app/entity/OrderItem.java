package com.sportify.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.math.BigDecimal;

/**
 * Author: Paras Dongre
 * Date Created:30-01-2025
 * Time Created:16:06
 */
@Entity
public class OrderItem extends BaseEntity{

    private int quantity;
    private int price;

    // items *-->1 Order
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    // items *-->1 product
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public OrderItem(){}
    public OrderItem(Order order, Product product, int quantity, int price) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
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

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
