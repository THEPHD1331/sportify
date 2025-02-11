using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MyWebApi
{
    public class Payment
    {
        public int PaymentID { get; set; } // Primary Key
        public string PaymentMethod { get; set; }
        public int Amount { get; set; }
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime PaymentDate { get; set; }

        private static string connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Sportify;Integrated Security=True;";

       
        public static List<Payment> GetAllPayments()
        {
            List<Payment> payments = new List<Payment>();
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand("SELECT PaymentID, PaymentMethod, Amount, OrderId, UserId, PaymentDate FROM Payment", cn);
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    payments.Add(new Payment
                    {
                        PaymentID = dr.GetInt32(0),
                        PaymentMethod = dr.GetString(1),
                        Amount = dr.GetInt32(2),
                        OrderId = dr.GetInt32(3),
                        UserId = dr.GetInt32(4),
                        PaymentDate = dr.GetDateTime(5)
                    });
                }
                dr.Close();
            }
            return payments;
        }

        public static void Insert(Payment payment)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand(
                    "INSERT INTO Payment (PaymentMethod, Amount, OrderId, UserId, PaymentDate) " +
                    "VALUES (@PaymentMethod, @Amount, @OrderId, @UserId, @PaymentDate)", cn);

                cmd.Parameters.AddWithValue("@PaymentMethod", payment.PaymentMethod);
                cmd.Parameters.AddWithValue("@Amount", payment.Amount);
                cmd.Parameters.AddWithValue("@OrderId", payment.OrderId);
                cmd.Parameters.AddWithValue("@UserId", payment.UserId);
                cmd.Parameters.AddWithValue("@PaymentDate", DateTime.Now);

                cmd.ExecuteNonQuery();
            }
        }

        public static void Update(Payment payment)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand(
                    "UPDATE Payment SET PaymentMethod=@PaymentMethod, Amount=@Amount, OrderId=@OrderId, " +
                    "UserId=@UserId WHERE PaymentID=@PaymentID", cn);

                cmd.Parameters.AddWithValue("@PaymentID", payment.PaymentID);
                cmd.Parameters.AddWithValue("@PaymentMethod", payment.PaymentMethod);
                cmd.Parameters.AddWithValue("@Amount", payment.Amount);
                cmd.Parameters.AddWithValue("@OrderId", payment.OrderId);
                cmd.Parameters.AddWithValue("@UserId", payment.UserId);
                //cmd.Parameters.AddWithValue("@PaymentDate", );

                cmd.ExecuteNonQuery();
            }
        }

        public static void Delete(int paymentId)
        {
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                cn.Open();
                SqlCommand cmd = new SqlCommand("DELETE FROM Payment WHERE PaymentID=@PaymentID", cn);
                cmd.Parameters.AddWithValue("@PaymentID", paymentId);
                cmd.ExecuteNonQuery();
            }
        }



        public static List<Payment> GetPaymentsByOrderId(int orderId)
        {
            List<Payment> payments = new List<Payment>();
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                try
                {
                    cn.Open();
                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.CommandType = CommandType.Text;
                    cmd.CommandText = "SELECT * FROM Payment WHERE OrderId = @OrderId";
                    cmd.Parameters.AddWithValue("@OrderId", orderId);

                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        payments.Add(new Payment
                        {
                            PaymentID = dr.GetInt32("PaymentId"),
                            PaymentMethod = dr.GetString("PaymentMethod"),
                            Amount = dr.GetInt32("Amount"),
                            OrderId = dr.GetInt32("OrderId"),
                            UserId = dr.GetInt32("UserId"),
                            PaymentDate = dr.GetDateTime("PaymentDate")
                        });
                    }
                    dr.Close();
                }
                catch (Exception ex)
                {
                    throw new Exception("Error fetching payments by OrderId: " + ex.Message);
                }
            }
            return payments;
        }
        
        public static List<Payment> GetPaymentsByUserId(int userId)
        {
            List<Payment> payments = new List<Payment>();
            using (SqlConnection cn = new SqlConnection(connectionString))
            {
                try
                {
                    cn.Open();
                    SqlCommand cmd = new SqlCommand();
                    cmd.Connection = cn;
                    cmd.CommandType = CommandType.Text;
                    cmd.CommandText = "SELECT * FROM Payment WHERE UserId = @UserId";
                    cmd.Parameters.AddWithValue("@UserId", userId);

                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        payments.Add(new Payment
                        {
                            PaymentID = dr.GetInt32("PaymentId"),
                            PaymentMethod = dr.GetString("PaymentMethod"),
                            Amount = dr.GetInt32("Amount"),
                            OrderId = dr.GetInt32("OrderId"),
                            UserId = dr.GetInt32("UserId"),
                            PaymentDate = dr.GetDateTime("PaymentDate")
                        });
                    }
                    dr.Close();
                }
                catch (Exception ex)
                {
                    throw new Exception("Error fetching payments by UserId: " + ex.Message);
                }
            }
            return payments;
        }

    }
}
