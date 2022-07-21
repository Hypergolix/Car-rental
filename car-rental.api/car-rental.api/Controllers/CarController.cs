using car.api.Data;
using car.api.Services;
using car_rental.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace car.api.Controllers
{
    [ApiController]
    [Route("api")]
    public class CarController : ControllerBase
    {
        private readonly CarContext _context;
        private readonly IUserService _userService;

        public CarController(CarContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var res = _context.Users.ToList();
            return Ok(res);
            //return Ok(new { response = "sanity test"});
        }

        [HttpGet("add")]
        public IActionResult AddUser()
        {
            _context.Users.Add(new User { Password = "a", Username = "a" });
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(AuthenticateRequest model)
        {
            var userExists = await _context.Users.FirstOrDefaultAsync(x => x.Username == model.Username);
            if (userExists != default) return BadRequest(new { message= "Bad username"});

            User newUser = new()
            { 
                Username = model.Username,
                Password = model.Password
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            var response = _userService.Authenticate(model);

            return Ok(response);
        }

        [Authorize]
        [HttpGet("users")]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        //[HttpGet("cars/available")]
        //public IActionResult GetAvailableCars(DateRange dateRange)
        //{
        //    return Ok();
        //}

        [HttpPost("cars/available")]
        public IActionResult GetAvailableCarsLocation(Location location, DateRange dateRange)
        {
            if (dateRange.Start > dateRange.End) return BadRequest();

            var foundCars = _context.Cars
                .Include(x => x.Bookings)
                .Where(x => x.Location == location);

            var carsInDate = foundCars
                .Where(x => x.Bookings.Any(x => dateRange.Start > x.DateRange.End || dateRange.End < x.DateRange.Start) || x.Bookings.Count == 0);

            return Ok(carsInDate);
        }
        // x => x.Bookings.Where(x => x.DateRange.Start > dateRange.End && x.DateRange.End < dateRange.Start).Any()
        [HttpGet("cars/all")]
        public IActionResult GetAvailableCars(DateRange dateRange, CarType carType, Location location)
        {
            return Ok();
        }

        [HttpPost("cars")]
        public async Task<IActionResult> AddCar(InputCar car)
        {
            if (car == null) return BadRequest();

            Car newCar = new()
            {
                Guid = Guid.NewGuid().ToString(),
                Name = car.Name,
                Price = car.Price,
                CarType = car.CarType,
                Make = car.Make,
                Location = car.Location,
                Automatic = car.Automatic,
                ImageUrl = car.ImageUrl,
            };
            await _context.Cars.AddAsync(newCar);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("booking")]
        public async Task<IActionResult> CreateBooking(string carId, string userName, DateRange dateRange)
        {
            if (carId == null || userName == null || dateRange == null) return BadRequest();

            var foundCar = await _context.Cars.Include(x => x.Bookings)
                .FirstOrDefaultAsync(x => x.Guid == carId);

            if (foundCar == null) return BadRequest(new {message = "car not found"});

            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Username == userName);

            if (foundUser == null) return BadRequest(new { message = "user not found" });

            Booking newBooking = new()
            {
                Guid = Guid.NewGuid().ToString(),
                User = foundUser,
                DateRange = new() { Start = dateRange.Start, End = dateRange.End},
                Car = foundCar,
                // for now
                Location = foundCar.Location
            };

            //foundCar.Bookings.Add(newBooking);
            foundUser.PastBookings.Add(newBooking);

            await _context.SaveChangesAsync();

            var a = _context.Users.Include(x => x.PastBookings).FirstOrDefault(x => x.Username == userName);
            var b = a.PastBookings;

            return Ok(new { bookingId = newBooking.Guid, b = b });
        }

        [HttpGet("user/bookings")]
        public async Task<IActionResult> GetAllUserBookings(string userName)
        {
            if (userName == null) return BadRequest();

            var foundUser = await _context.Users
                .Include(x => x.PastBookings)
                .FirstOrDefaultAsync(x => x.Username == userName);

            if (foundUser == null) return BadRequest();
            var foundBookings = foundUser.PastBookings;

            return Ok(foundBookings);
        }

        [HttpDelete("user/bookings")]
        public async Task<IActionResult> DeleteUserBooking(string userName, string bookingId)
        {
            if (userName == null) return BadRequest();

            var foundUser = await _context.Users
                .Include(x => x.PastBookings)
                .FirstOrDefaultAsync(x => x.Username == userName);

            if (foundUser == null) return BadRequest();
            var foundBookings = foundUser.PastBookings;
            _context.Bookings.RemoveRange(foundBookings);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("car")]
        public async Task<IActionResult> GetCar(string carId)
        {
            var foundCar = await _context.Cars.Include(x => x.Bookings).FirstOrDefaultAsync(x => x.Guid == carId);
            if (foundCar == null) return BadRequest();

            return Ok(foundCar);
        }

    }
}
