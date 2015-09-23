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
    [Route("api/[controller]")]
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

        [HttpGet]
        public List<Grocery> Get()
        {
            return DbGrocery;
        }

        [HttpPost("Add")]
        public string Add(string name, int order)
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

            return grocery.Id;
        }

        // POST api/values
        [HttpPost("Move")]
        public void Move(string sourceId, int targetOrder)
        {
            var db = DbGrocery;
            var source = db.First(g => g.Id == sourceId);
            var target = db.First(g => g.Order == targetOrder);
            target.Order = source.Order;
            source.Order = targetOrder;
            DbGrocery = db;
        }

        [HttpPost("Done")]
        public void Done(string id)
        {
            var db = DbGrocery;
            var item = db.Find(g => g.Id == id);
            item.Done = !item.Done;
            DbGrocery = db;
        }

        // PUT api/values/5
        [HttpPost("Delete")]
        public void Put(string id)
        {
            var db = DbGrocery;
            var item = db.First(g => g.Id == id);
            db.Remove(item);
            DbGrocery = db;
        }
    }
}
