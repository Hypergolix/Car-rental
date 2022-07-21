namespace car_rental.api.Models
{
    public class Car
    {
        public int Id { get; set; }

        public string Guid { get; set; }

        public decimal Price { get; set; }

        public CarType CarType { get; set; }

        public CarMake Make { get; set; }

        public string Name { get; set; }

        public Location Location { get; set; }

        public bool Automatic { get; set; }

        public string ImageUrl { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
