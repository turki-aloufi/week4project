// OrderMicroService/Controllers/OrderController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderMicroService.Data;
using OrderMicroService.Models;

namespace OrderMicroService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/order
        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var orders = _context.Orders
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .ToList();
            return Ok(orders);
        }

        // GET: api/order/{id}
        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _context.Orders
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .FirstOrDefault(o => o.Id == id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        // POST: api/order
        [HttpPost]
        public IActionResult AddOrder([FromBody] OrderDto orderDto)
        {
            if (orderDto.Products == null || !orderDto.Products.Any())
            {
                return BadRequest("At least one product is required.");
            }

            var order = new Order
            {
                OrderDate = DateTime.UtcNow,
                OrderProducts = new List<OrderProduct>()
            };

            decimal totalPrice = 0;
            foreach (var item in orderDto.Products)
            {
                var product = _context.Products.Find(item.ProductId);
                if (product == null)
                {
                    return BadRequest($"Product with ID {item.ProductId} not found.");
                }
                order.OrderProducts.Add(new OrderProduct
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                });
                totalPrice += item.Quantity * product.Price;
            }

            order.TotalPrice = totalPrice;
            _context.Orders.Add(order);
            _context.SaveChanges();

            // Reload order with products for response
            var createdOrder = _context.Orders
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .FirstOrDefault(o => o.Id == order.Id);
            return Ok(createdOrder);
        }

        // PUT: api/order/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] OrderDto orderDto)
        {
            var order = _context.Orders
                .Include(o => o.OrderProducts)
                .FirstOrDefault(o => o.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            if (orderDto.Products == null || !orderDto.Products.Any())
            {
                return BadRequest("At least one product is required.");
            }

            // Remove existing OrderProducts
            _context.OrderProducts.RemoveRange(order.OrderProducts);
            order.OrderProducts.Clear();

            // Add new OrderProducts
            decimal totalPrice = 0;
            foreach (var item in orderDto.Products)
            {
                var product = _context.Products.Find(item.ProductId);
                if (product == null)
                {
                    return BadRequest($"Product with ID {item.ProductId} not found.");
                }
                order.OrderProducts.Add(new OrderProduct
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                });
                totalPrice += item.Quantity * product.Price;
            }

            order.TotalPrice = totalPrice;
            _context.SaveChanges();
            return Ok();
        }

        // DELETE: api/order/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _context.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            _context.SaveChanges(); // Cascade delete removes OrderProducts
            return Ok();
        }
    }
}