using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MyWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            
            return Ok(new ApiResponse("Success", Payment.GetAllPayments()));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Payment payment)
        {
            Payment.Insert(payment);
            return Ok(new ApiResponse("Payment added successfully", null));
        }

        [HttpPut]
        public IActionResult Put([FromBody] Payment payment)
        {
            Payment.Update(payment);
            return Ok(new ApiResponse("Payment updated successfully", null));
        }

        [HttpDelete("{paymentId}")]
        public IActionResult Delete(int paymentId)
        {
            Payment.Delete(paymentId);
            return Ok(new ApiResponse("Payment deleted successfully", null));
        }

        [HttpGet("order/{orderId}")]
        public IActionResult GetByOrderId(int orderId)
        {
            var payment = Payment.GetPaymentsByOrderId(orderId);
            if (payment == null || payment.Count == 0)
                return NotFound(new ApiResponse("No payments found for this OrderId", null));

            return Ok(new ApiResponse("Success", payment));
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            var payments = Payment.GetPaymentsByUserId(userId);
            if (payments == null || payments.Count == 0)
                return NotFound(new ApiResponse("No payments found for this userId", null));

            return Ok(new ApiResponse("Success", payments));
        }



    }
}
