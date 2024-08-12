using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Onwelo.API.Database.Context;
using Onwelo.API.Extensions;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<OnweloDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Database")));


builder.Services.AddScoped<IDbConnection>(sp =>
    new SqlConnection(sp.GetRequiredService<IConfiguration>().GetConnectionString("Database"))
);

builder.Services.RegisterRepositories();
builder.Services.RegisterQueries();
builder.Services.RegisterUnitOfWork();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(c => c.SetIsOriginAllowed(c => true)
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
);

app.Run();