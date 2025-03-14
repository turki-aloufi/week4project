using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace ProductMicroService.Models
{
  public class ProductDto
  {
    public string Title { get; set; }

    public decimal Price { get; set; }

    public string Description { get; set; }

    public string Category { get; set; }

    public string Image { get; set; }

  }
}