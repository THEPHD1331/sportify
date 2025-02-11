package com.sportify.app.service.image;

import com.sportify.app.dto.response.ImageDTO;
import com.sportify.app.entity.Image;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    Image getImageById(long id);
    ImageDTO saveImage(MultipartFile image, long productId);
    void deleteImage(long id);
    void updateImage(MultipartFile image, long id);
}
