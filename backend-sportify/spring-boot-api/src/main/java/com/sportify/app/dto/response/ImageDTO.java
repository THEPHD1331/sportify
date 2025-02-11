package com.sportify.app.dto.response;

/**
 * Author: Paras Dongre
 * Date Created:29-12-2024
 * Time Created:11:58
 */
public class ImageDTO {
    private long id;
    private String imageName;
    private String imageUrl;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
