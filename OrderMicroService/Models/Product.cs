using System.Text.Json.Serialization;
namespace OrderMicroService.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }

        [JsonIgnore]
        public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>(); // Navigation property
    }
}