using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace car_rental.api.Migrations
{
    public partial class booking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Location",
                table: "Bookings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Bookings");
        }
    }
}
