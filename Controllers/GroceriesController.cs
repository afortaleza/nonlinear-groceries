using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json;
using Nonlinear.Groceries.Models;

namespace Nonlinear.Groceries.Controllers
{
    [Route("api/groceries")]
    public class GroceriesController : Controller
    {
        public List<Grocery> DbGrocery
        {
            get
            {
                var jsonGroceries = Context.Session.GetString("groceries");
                if (string.IsNullOrWhiteSpace(jsonGroceries))
                {
                    jsonGroceries = JsonConvert.SerializeObject(new List<Grocery>());
                    Context.Session.SetString("groceries", jsonGroceries);
                }

                return JsonConvert.DeserializeObject<List<Grocery>>(jsonGroceries);
            }
            set
            {
                var jsonGroceries = JsonConvert.SerializeObject(value);
                Context.Session.SetString("groceries", jsonGroceries);
            }
        }

        // GET: api/values
        [HttpGet]
        public List<Grocery> Get()
        {
            return DbGrocery;
        }

        [HttpPost]
        public void Add([FromBody]string name, int order)
        {
            var db = DbGrocery;
            var grocery = new Grocery
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                Order = order,
                Done = false
            };

            db.Add(grocery);
            DbGrocery = db;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
