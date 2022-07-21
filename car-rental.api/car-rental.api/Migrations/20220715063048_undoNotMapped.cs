using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace car_rental.api.Migrations
{
    public partial class undoNotMapped : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DateRangeId",
                table: "Bookings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DateRange",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Start = table.Column<DateTime>(type: "TEXT", nullable: false),
                    End = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DateRange", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_DateRangeId",
                table: "Bookings",
                column: "DateRangeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_DateRange_DateRangeId",
                table: "Bookings",
                column: "DateRangeId",
                principalTable: "DateRange",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_DateRange_DateRangeId",
                table: "Bookings");

            migrationBuilder.DropTable(
                name: "DateRange");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_DateRangeId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "DateRangeId",
                table: "Bookings");
        }
    }
}
