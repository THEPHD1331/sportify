package com.sportify.app.service.product;
import com.sportify.app.dto.response.ProductDTO;
import com.sportify.app.dto.request.ProductRequest;
import com.sportify.app.entity.Category;
import com.sportify.app.entity.Product;
import com.sportify.app.exception.AlreadyExistsException;
import com.sportify.app.exception.ProductNotFoundException;
import com.sportify.app.repository.CategoryRepository;
import com.sportify.app.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Author: Paras Dongre
 * Date Created:18-12-2024
 * Time Created:21:30
 */
@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Product getProductById(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not Found for id: "+id));
    }

    @Override
    public Product addProduct(ProductRequest productRequest) {
    // Check if the category exists in the db
        // If YES, set it as new product for the category
        // If NO, save it as new Category and set the product

        if (productExists(productRequest.getProductName(), productRequest.getBrand())) {
            throw new AlreadyExistsException(productRequest.getBrand() + " "
                    + productRequest.getProductName() + " already exists, you may update this product instead!");
        }

        Category category = Optional.ofNullable(categoryRepository
                .findByName(productRequest.getCategory().getName()))
                .orElseGet(() -> {
                    Category newCategory = new Category(productRequest.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });
        productRequest.setCategory(category);

        return productRepository.save(createProduct(productRequest, category));
    }

    // public Product(String productName, String brand, String productDescription,
    //                   int productPrice, int itemsInStock, double rating, Category category) {
    private Product createProduct(ProductRequest request, Category category) {
        return new Product(
                request.getProductName(),
                request.getBrand(),
                request.getProductDescription(),
                request.getProductPrice(),
                request.getItemsInStock(),
                request.getRating(),
                category);
    }

    @Override
    public Product updateProduct(ProductRequest productRequest, long id) {

        // Find product by ID then, map request into product obj for updation and save it
        return productRepository.findById(id)
                .map(product -> updateExistingProduct(product, productRequest))
                .map(updatedProduct -> productRepository.save(updatedProduct))
                .orElseThrow(() -> new ProductNotFoundException("Product not Found for id: "+id));
    }

    // Helper method to map Product update req to product obj
    private Product updateExistingProduct(Product existingProduct, ProductRequest productRequest){

        // Map Product update request to new product object and return it
        existingProduct.setProductName(productRequest.getProductName());
        existingProduct.setBrand(productRequest.getBrand());
        existingProduct.setProductPrice(productRequest.getProductPrice());
        existingProduct.setProductDescription(productRequest.getProductDescription());
        existingProduct.setItemsInStock(productRequest.getItemsInStock());
        existingProduct.setRating(productRequest.getRating());

        Category category = categoryRepository.findByName(productRequest.getCategory().getName());
        existingProduct.setCategory(category);
        return existingProduct;
    }

    @Override
    public void deleteProductById(long id) {
        productRepository.findById(id)
                .ifPresentOrElse(p -> productRepository.delete(p),
                        () -> {
                    throw new ProductNotFoundException("Product not Found for id: "+id);
                });
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .toList();
    }

    @Override
    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategoryName(category).stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .toList();
    }

    @Override
    public List<ProductDTO> getProductByBrand(String brand) {
        return productRepository.findByBrand(brand).stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .toList();
    }

    @Override
    public List<ProductDTO> getProductsByCategoryAndBrand(String category, String brand) {
        return productRepository.findByCategoryNameAndBrand(category, brand).stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .toList();
    }

    @Override
    public List<ProductDTO> getProductsByNameAndBrand(String productName, String brand) {
        return productRepository.findByProductNameAndBrand(productName, brand).stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .toList();
    }

    @Override
    public List<ProductDTO> getProductsByCategoryAndName(String category, String productName) {
        return productRepository.findByCategoryNameAndProductName(category, productName).stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .toList();
    }

    @Override
    public List<ProductDTO> getProductByName(String productName) {
        return productRepository.findByProductName(productName).stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .toList();
    }

    private boolean productExists(String name, String brand) {
        return productRepository.existsByProductNameAndBrand(name, brand);
    }
}
