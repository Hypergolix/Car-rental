using car_rental.api.Models;
using Microsoft.EntityFrameworkCore;

namespace car.api.Data
{
    public class CarContext : DbContext
    {
        public string DbPath { get; }

        public CarContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "car.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}").UseLazyLoadingProxies();

        public DbSet<User> Users { get; set; }

        public DbSet<Booking> Bookings { get; set; }

        public DbSet<Car> Cars { get; set; }
    }
}
