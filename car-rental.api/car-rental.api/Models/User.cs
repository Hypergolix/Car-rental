using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace car_rental.api.Models
{
    [NotMapped]
    public class AuthenticateRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public virtual ICollection<Booking> PastBookings { get; set; } = new List<Booking>();

        //public virtual Booking? CurrentBooking { get; set; }
    }
}
