package com.sportify.app.service.product;
import com.sportify.app.dto.response.ProductDTO;
import com.sportify.app.dto.request.ProductRequest;
import com.sportify.app.entity.Product;
import java.util.List;

public interface ProductService {

    Product getProductById(long id);
    Product addProduct(ProductRequest product);
    Product updateProduct(ProductRequest productRequest, long id);
    void deleteProductById(long id);
    List<ProductDTO> getAllProducts();
    List<ProductDTO> getProductsByCategory(String category);
    List<ProductDTO> getProductByBrand(String brand);
    List<ProductDTO> getProductByName(String productName);
    List<ProductDTO> getProductsByCategoryAndBrand(String category, String brand);
    List<ProductDTO> getProductsByNameAndBrand(String productName, String brand);
    List<ProductDTO> getProductsByCategoryAndName(String category, String productName);
}
