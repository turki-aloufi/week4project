// OrderMicroService/Models/OrderProduct.cs
using System.Text.Json.Serialization;

namespace OrderMicroService.Models
{
  public class OrderProduct
  {
        [JsonIgnore]
    public int OrderId { get; set; }

    [JsonIgnore]
    public Order Order { get; set; } // Navigation property
    [JsonIgnore]

    public int ProductId { get; set; }
    
    public Product Product { get; set; } // Navigation property

    public int Quantity { get; set; } // Quantity of this product in the order
  }
}