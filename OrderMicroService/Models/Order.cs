// OrderMicroService/Models/Order.cs
namespace OrderMicroService.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; } 

        public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>(); 
    }
}