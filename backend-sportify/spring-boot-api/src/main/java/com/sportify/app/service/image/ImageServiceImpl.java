package com.sportify.app.service.image;

import com.sportify.app.dto.response.ImageDTO;
import com.sportify.app.entity.Image;
import com.sportify.app.entity.Product;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.repository.ImageRepository;
import com.sportify.app.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;

/**
 * Author: Paras Dongre
 * Date Created:29-12-2024
 * Time Created:11:44
 */
@Service
public class ImageServiceImpl implements ImageService{

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ProductService productService;

    @Override
    public Image getImageById(long id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found for Id:" +id));
    }

    @Override
    public ImageDTO saveImage(MultipartFile file, long productId) {

        Product product = productService.getProductById(productId);
        ImageDTO imageDTO = new ImageDTO();

        try {
            // Set properties of image to be saved
            Image image = new Image();
            image.setFileName(file.getOriginalFilename());
            image.setFileType(file.getContentType());
            image.setImage(new SerialBlob(file.getBytes()));
            image.setProduct(product);

            // Build the url to view or download image
//            String imageUrl = "/api/v1/images/view/"+image.getId();
//            image.setImageUrl(imageUrl);
            Image savedImage =  imageRepository.save(image);

            String imageUrl = "/api/v1/images/view/"+image.getId();
            savedImage.setImageUrl(imageUrl);
            imageRepository.save(savedImage);

            // Map the saved entity to Image DTO obj and return it
            imageDTO.setId(savedImage.getId());
            imageDTO.setImageName(savedImage.getFileName());
            imageDTO.setImageUrl(savedImage.getImageUrl());

        } catch (IOException | SQLException e) {
            throw new RuntimeException(e.getMessage());
        }
        return imageDTO;
    }

    @Override
    public void deleteImage(long imageId) {
            imageRepository.findById(imageId)
                    .ifPresentOrElse(i -> imageRepository.delete(i),
                    () -> {
                throw new ResourceNotFoundException("Image not found for Id:"+imageId);
                    });
    }

    @Override
    public void updateImage(MultipartFile file, long imageId) {

        Image image = getImageById(imageId);

        try {
            // Setting fileName and image from bytes to blob
            image.setFileName(file.getOriginalFilename());
            image.setImage(new SerialBlob(file.getBytes()));
            imageRepository.save(image);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
