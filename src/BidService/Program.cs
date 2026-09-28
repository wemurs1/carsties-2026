using System.Security.Claims;
using BidService.Data;
using BidService.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Wolverine;
using Wolverine.RabbitMQ;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<BidDbContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });

builder.Host.UseWolverine(opts =>
{
    opts.UseRabbitMq(rabbit =>
        {
            rabbit.HostName = builder.Configuration["RabbitMQ:Host"] ?? "localhost";
            rabbit.UserName = builder.Configuration["RabbitMQ:Username"] ?? "guest";
            rabbit.Password = builder.Configuration["RabbitMQ:Password"] ?? "guest";
        })
        .AutoProvision();
});

builder.Services.AddScoped<IBidRepository, BidRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapPost("/api/bids", async (
    string auctionId, int amount, ClaimsPrincipal user, IBidRepository repository
) =>
{
    var auction = await repository.GetAuctionAsync(auctionId);
    if (auction == null) return Results.NotFound();

    if (auction.Seller == user.Identity?.Name) return Results.BadRequest("You cannot bid on your own item");

    var bid = new Bid
    {
        AuctionId = auctionId,
        Amount = amount,
        Bidder = user.Identity?.Name ?? "Unknown bidder",
    };

    if (auction.AuctionEnd < DateTime.UtcNow || auction.Finished)
    {
        bid.BidStatus = BidStatus.Finished;
    }
    else
    {
        bid.BidStatus = amount >= auction.ReservePrice ? BidStatus.Accepted : BidStatus.AcceptedBelowReserve;
    }

    await repository.InsertBidAsync(bid);

    return Results.Ok(bid);
}).RequireAuthorization();

app.MapGet("/api/bids/{auctionId", async (string auctionId, IBidRepository repository) =>
{
    var bids = await repository.GetBidsForAuctionAsync(auctionId);

    return Results.Ok(bids);
});

try
{
    DbInitializer.InitDb(app);
}
catch (Exception e)
{
    Console.WriteLine($"Error initializing bid db: {e.Message}");
}

app.Run();