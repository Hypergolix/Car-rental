using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace car_rental.api.Migrations
{
    public partial class updatecar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Automatic",
                table: "Cars",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Cars",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Cars",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Automatic",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Cars");
        }
    }
}
