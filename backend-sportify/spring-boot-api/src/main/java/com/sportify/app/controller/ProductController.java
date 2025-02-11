package com.sportify.app.controller;

import com.sportify.app.dto.response.ProductDTO;
import com.sportify.app.dto.request.ProductRequest;
import com.sportify.app.dto.response.ApiResponse;
import com.sportify.app.entity.Product;
import com.sportify.app.exception.AlreadyExistsException;
import com.sportify.app.exception.ProductNotFoundException;
import com.sportify.app.service.product.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Author: Paras Dongre
 * Date Created:27-01-2025
 * Time Created:19:26
 */
@RestController
@RequestMapping("${api.prefix}/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProducts(){

        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(new ApiResponse("Success", products));
    }

    @GetMapping("/by-name")
    public ResponseEntity<ApiResponse> getProductsByName(@RequestParam String productName){

        List<ProductDTO> products = productService.getProductByName(productName);
        if (products.isEmpty())
            throw new ProductNotFoundException("Not Found");

        return ResponseEntity.ok(new ApiResponse("Success", products));
    }

    @GetMapping("/by-category")
    public ResponseEntity<ApiResponse> getProductsByCategory(@RequestParam String categoryName){

        List<ProductDTO> products = productService.getProductsByCategory(categoryName);
        if (products.isEmpty())
            throw new ProductNotFoundException("Not Found");

        return ResponseEntity.ok(new ApiResponse("Success", products));
    }

    @GetMapping("/by-brand")
    public ResponseEntity<ApiResponse> getProductsByBrand(@RequestParam String brandName){

        List<ProductDTO> products = productService.getProductByBrand(brandName);
        if (products.isEmpty())
            throw new ProductNotFoundException("Not Found");

        return ResponseEntity.ok(new ApiResponse("Success", products));
    }

    @GetMapping("/by-category-and-brand")
    public ResponseEntity<ApiResponse> getByProductsCategoryAndBrand(@RequestParam String categoryName,
                                                                     @RequestParam String brandName){

        List<ProductDTO> products = productService.getProductsByCategoryAndBrand(categoryName, brandName);
        if (products.isEmpty())
            throw new ProductNotFoundException("Not Found");

        return ResponseEntity.ok(new ApiResponse("Success", products));
    }

    @GetMapping("/by-name-and-brand")
    public ResponseEntity<ApiResponse> getByProductNameAndBrand(@RequestParam String productName,
                                                                     @RequestParam String brandName){

        List<ProductDTO> products = productService.getProductsByNameAndBrand(productName, brandName);
        if (products.isEmpty())
            throw new ProductNotFoundException("Not Found");

        return ResponseEntity.ok(new ApiResponse("Success", products));
    }

    @GetMapping("/by-category-and-name")
    public ResponseEntity<ApiResponse> getByProductsCategoryAndName(@RequestParam String categoryName,
                                                                     @RequestParam String productName){

        List<ProductDTO> products = productService.getProductsByCategoryAndName(categoryName, productName);
        if (products.isEmpty())
            throw new ProductNotFoundException("Not Found");

        return ResponseEntity.ok(new ApiResponse("Success", products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable long id){

            Product product = productService.getProductById(id);
            return ResponseEntity.ok(new ApiResponse("Success", mapper.map(product, ProductDTO.class)));

    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse> addProduct(@RequestBody ProductRequest productRequest){

            Product product = productService.addProduct(productRequest);
            return ResponseEntity.ok(new ApiResponse("Success", mapper.map(product, ProductDTO.class)));

    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable long id,
                                                     @RequestBody ProductRequest productRequest){
            Product product = productService.updateProduct(productRequest, id);
            return ResponseEntity.ok(new ApiResponse("Success",  mapper.map(product, ProductDTO.class)));

    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable long id){
            productService.deleteProductById(id);
            return ResponseEntity.ok(new ApiResponse("Product Deleted", null));

    }
}
