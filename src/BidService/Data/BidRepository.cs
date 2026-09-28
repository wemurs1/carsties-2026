using BidService.Models;
using Dapper;

namespace BidService.Data;

public class BidRepository(BidDbContext dbContext) : IBidRepository
{
    public async Task<Auction?> GetAuctionAsync(string auctionId)
    {
        return await dbContext.DbConnection.QuerySingleOrDefaultAsync<Auction>(
            "select * from auctions where id = @auctionId", new { auctionId }
        );
    }

    public async Task<Bid?> GetHighestBidAsync(string auctionId)
    {
        return await dbContext.DbConnection.QuerySingleOrDefaultAsync<Bid>(
            """
            select * from bids
            where auctionid = @auctionId and bidstatus in (@Accepted, @AcceptedBelowReserve)
            order by amount desc
            limit 1
            """, new
            {
                auctionId,
                Accepted = (int)BidStatus.Accepted,
                AcceptedBelowReserve = (int)BidStatus.AcceptedBelowReserve
            }
        );
    }

    public async Task<Bid> InsertBidAsync(Bid bid)
    {
        await dbContext.DbConnection.ExecuteAsync(
            """
            insert into bids (id, auctionid, bidder, bidtime, amount, bidstatus)
            values (@Id, @AuctionId, @Bidder, @BidTime, @Amount, @BidStatus)
            """, bid);
        return bid;
    }

    public async Task<IEnumerable<Bid>> GetBidsForAuctionAsync(string auctionId)
    {
        return await dbContext.DbConnection.QueryAsync<Bid>(
            """
            select * from bids 
            where auctionid = @auctionId
            order by bidtime desc
            """, new { auctionId });
    }
}