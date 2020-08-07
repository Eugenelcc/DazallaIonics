using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Dazala.Models;
using Dazala.Data;
using Newtonsoft.Json;

namespace Dazala.Controllers {
    public class ProductPOCO {
        public string Name {get; set;}
        public string Description {get; set;}
        public double Price {get; set;}
    }

    [Route("api/product")]
    [ApiController]
    public class ProductAPIController : ControllerBase 
    {
        private readonly DazalaContext _context;

        public ProductAPIController(DazalaContext context) {
            this._context = context;
        }
        // If the database migration is created properly  2 marks

        // POST: api/product/new
        [HttpPost("new")]
        public IEnumerable<Product> Post([FromBody] ProductPOCO value)  // 7 marks
        {
            var productPOCO = value; 
            var product = new Product { 
                Name = productPOCO.Name,
                Description = productPOCO.Description,
                Price = productPOCO.Price
            };
            this._context.Product.Add(product);
            this._context.SaveChanges();
            List<Product> products = this._context.Product
                                .Where(p => p.Id == product.Id)
                                .ToList();
            return products;
        }

        // GET: api/product/all
        [HttpGet("all")] 
        public IEnumerable<Product> Get(){                              // 3 marks
            List<Product> products = this._context.Product.ToList();
            return products;
        }

        // GET: api/product/get/1
        [HttpGet("get/{id}")]
        public IEnumerable<Product> Get(int id){                        // 3 marks
            List<Product> products = this._context.Product
                .Where(p => p.Id == id).ToList();
            return products;
        }
    }
}