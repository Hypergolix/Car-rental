using System.ComponentModel.DataAnnotations.Schema;

namespace car_rental.api.Models
{
    public class DateRange
    {
        public int Id { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }
    }
}
