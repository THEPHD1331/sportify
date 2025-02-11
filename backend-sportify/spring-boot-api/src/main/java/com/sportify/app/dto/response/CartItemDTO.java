package com.sportify.app.dto.response;

/**
 * Author: Paras Dongre
 * Date Created:31-01-2025
 * Time Created:14:30
 */
public class CartItemDTO {

    private Long itemId;
    private int quantity;
    private int unitPrice;
    private int totalPrice;
    private ProductDTO product;

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(int unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "CartItemDTO{" +
                "itemId=" + itemId +
                ", quantity=" + quantity +
                ", unitPrice=" + unitPrice +
                ", totalPrice=" + totalPrice +
                ", product=" + product +
                '}';
    }
}
