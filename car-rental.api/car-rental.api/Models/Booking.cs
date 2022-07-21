namespace car_rental.api.Models
{
    public class Booking
    {
        public int Id { get; set; }

        public string Guid { get; set; }

        public virtual User User { get; set; }

        public virtual DateRange DateRange { get; set; }

        // public LocationRange?

        public virtual Car Car { get; set; }

        public Location Location { get; set; }
    }
}
