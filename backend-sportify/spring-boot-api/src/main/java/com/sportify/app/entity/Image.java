package com.sportify.app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;

/**
 * Author: Paras Dongre
 * Date Created:17-12-2024
 * Time Created:12:57
 */
@Entity
@AllArgsConstructor
@ToString(callSuper = true)
public class Image extends BaseEntity{

    private String fileName;
    private String fileType;
    @Lob // Database-specified Large Object
    private Blob image;
    private String imageUrl;
    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Image(){}

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
