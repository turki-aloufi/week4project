namespace OrderMicroService.Models
{
    public class OrderDto
    {
        public List<OrderProductDto> Products { get; set; } = new List<OrderProductDto>(); // List of products with quantities
    }
}