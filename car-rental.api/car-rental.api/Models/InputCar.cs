using System.ComponentModel.DataAnnotations.Schema;

namespace car_rental.api.Models
{
    [NotMapped]
    public class InputCar
    {
        public decimal Price { get; set; }

        public CarType CarType { get; set; }

        public CarMake Make { get; set; }

        public string Name { get; set; }

        public Location Location { get; set; }

        public bool Automatic { get; set; }

        public string ImageUrl { get; set; }
    }
}
