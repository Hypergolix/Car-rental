using System.ComponentModel.DataAnnotations.Schema;

namespace car_rental.api.Models
{
    [NotMapped]
    public class InputUser
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}
