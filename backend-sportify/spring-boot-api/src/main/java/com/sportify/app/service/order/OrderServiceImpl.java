package com.sportify.app.service.order;

import com.sportify.app.dto.response.OrderDTO;
import com.sportify.app.entity.*;
import com.sportify.app.enums.OrderStatus;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.repository.OrderRepository;
import com.sportify.app.repository.ProductRepository;
import com.sportify.app.service.cart.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

/**
 * Author: Paras Dongre
 * Date Created:30-01-2025
 * Time Created:20:15
 */
@Service
@Transactional
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private ModelMapper mapper;

    @Override
    public Order placeOrder(long userId) {

        /*
        1. Get Cart from user Id
        2. Initialize an Order obj by createOrder helper method
        3. Get order items from Cart using createOrderItems method
        4. Get total amt from calculateTotalAmount method
        5. Add it to initialized order and save it.
        6. Clear the cart once order is placed(saved).
         */
        Cart cart = cartService.getCartByUserId(userId);
        Order order = createOrder(cart);

        List<OrderItem> orderItems = createOrderItems(order, cart);
        order.setOrderItems(new HashSet<>(orderItems));
        order.setTotalAmount(calculateTotalAmount(orderItems));
        Order savedOrder = orderRepository.save(order);
        cartService.clearCart(cart.getId());

        return savedOrder;
    }

    @Override
    public OrderDTO getOrder(long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> mapper.map(order, OrderDTO.class))
                .orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
    }

    @Override
    public List<OrderDTO> getOrdersByUser(long userId){
        return orderRepository.findByUserId(userId)
                .stream()
                .map(order -> mapper.map(order, OrderDTO.class))
                .toList();
    }

    @Override
    public void cancelOrder(long orderId) {
        orderRepository.findById(orderId).get().setOrderStatus(OrderStatus.CANCELLED);
    }

    @Override
    public void updateOrderStatus(long orderId, OrderStatus orderStatus) {
        orderRepository.findById(orderId).get().setOrderStatus(orderStatus);
    }

    // Initialize an order with no order items
    private Order createOrder(Cart cart){
        Order order = new Order();

        order.setUser(cart.getUser());
        order.setOrderStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDate.now());
        return order;
    }

    // Map items from cart to order items in Order
    private List<OrderItem> createOrderItems(Order order, Cart cart){

        return cart.getCartItems()
                .stream()
                .map(cartItem -> {

                    // For every cart item(product) update the Stock quantity
                    Product product = cartItem.getProduct();
                    product.setItemsInStock(product.getItemsInStock() - cartItem.getQuantity());
                    productRepository.save(product);

                    // return new OrderItem for every cart item
                    return new OrderItem(order, product, cartItem.getQuantity(), cartItem.getUnitPrice());
                })
                .toList();
    }

    // calculate total price of all items in an order
    private int calculateTotalAmount(List<OrderItem> orderItems){
        return orderItems.stream()
                .map(item -> item.getQuantity() * item.getPrice())
                .reduce(0, Integer::sum);
    }
}
