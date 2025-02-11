package com.sportify.app.controller;

import com.sportify.app.dto.response.ImageDTO;
import com.sportify.app.dto.response.ApiResponse;
import com.sportify.app.entity.Image;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.service.image.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;

/**
 * Author: Paras Dongre
 * Date Created:27-01-2025
 * Time Created:19:27
 */
@RestController
@RequestMapping("${api.prefix}/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse> saveImage(@RequestParam MultipartFile file, @PathVariable Long productId){

        try{
            ImageDTO imageDTO = imageService.saveImage(file, productId);
            return ResponseEntity.ok(new ApiResponse("Upload Success", imageDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Upload Failed", e.getMessage()));
        }
    }


    @GetMapping("/view/{id}")
    public ResponseEntity<?> displayImage(@PathVariable long id) throws SQLException
    {
            Image image = imageService.getImageById(id);
            byte[] imageBytes = image.getImage().getBytes(1, (int) image.getImage().length());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageBytes);

    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadImage(@PathVariable long id) throws SQLException {

            Image image = imageService.getImageById(id);
           ByteArrayResource resource =
                    new ByteArrayResource(image.getImage().getBytes(1, (int)image.getImage().length()));

            return ResponseEntity.ok().contentType(MediaType.parseMediaType(image.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\""+image.getFileName()+"\"")
                    .body(resource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateImage(@PathVariable long id, @RequestBody MultipartFile file){

            Image image = imageService.getImageById(id);
            if (image != null){
                imageService.updateImage(file, id);
                return ResponseEntity.ok(new ApiResponse("Image Updated for Id: "+id, null));
            }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Update Failed", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteImage(@PathVariable long id){

            Image image = imageService.getImageById(id);
            if (image != null){
                imageService.deleteImage(id);
                return ResponseEntity.ok(new ApiResponse("Image Deleted for Id: "+id, null));
            }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Delete Failed", null));
    }
}
