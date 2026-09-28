using BidService.Models;

namespace BidService.Data;

public interface IBidRepository
{
    Task<Auction?> GetAuctionAsync(string auctionId);
    Task<Bid?> GetHighestBidAsync(string auctionId);
    Task<Bid> InsertBidAsync(Bid bid);
    Task<IEnumerable<Bid>> GetBidsForAuctionAsync(string auctionId);
}