using BidService.Data;
using BidService.Models;
using Contracts;

namespace BidService.Handlers;

public class AuctionCreatedHandler(IBidRepository repository)
{
    public async Task Handle(AuctionCreated message, CancellationToken cancellationToken)
    {
        var auction = new Auction
        {
            Id = message.Id,
            AuctionEnd = message.AuctionEnd,
            Seller = message.Seller,
            ReservePrice = message.ReservePrice,
        };

        await repository.CreateAuctionAsync(auction);
    }
}