using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductMicroService.Data;
using ProductMicroService.Models;

namespace ProductMicroService.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductController : ControllerBase
  {
    private readonly AppDbContext _context;

    public ProductController(AppDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public IActionResult GetAllProducts()
    {
      return Ok(_context.Products.ToList());
    }

    [HttpGet("{id}")]
    public IActionResult GetProductById(int id)
    {
      var product = _context.Products.Find(id);
      if (product == null)
      {
        return NotFound();
      }
      return Ok(product);
    }

    [HttpPost]
    public IActionResult AddProduct([FromBody] ProductDto productDto)
    {
      Product product = new Product();
      product.Title = productDto.Title;
      product.Category = productDto.Category;
      product.Description = productDto.Description;
      product.Image = productDto.Image;
      product.Price = productDto.Price;

      _context.Products.Add(product);
      _context.SaveChanges();
      return Ok(_context.Products.ToList());
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, [FromBody] ProductDto productDto)
    {
      var product = _context.Products.Find(id);
      if (product == null)
      {
        return NotFound();
      }
      product.Title = productDto.Title;
      product.Price = productDto.Price;
      product.Description = productDto.Description;
      product.Category = productDto.Category;
      product.Image = productDto.Image;
      _context.SaveChanges();
      return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
      var product = _context.Products.Find(id);
      if (product == null)
      {
        return NotFound();
      }
      _context.Products.Remove(product);
      _context.SaveChanges();
      return Ok();
    }
  }
}