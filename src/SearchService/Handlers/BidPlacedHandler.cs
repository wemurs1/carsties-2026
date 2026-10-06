using Contracts;
using Meilisearch;
using SearchService.Models;

namespace SearchService.Handlers;

public class BidPlacedHandler
{
    public async Task Handle(BidPlaced message, MeilisearchClient client)
    {
        Console.WriteLine($"Handling BidPlaced: {message.Id} with {message.Amount} for auction: {message.AuctionId}");
        var auction = await client.Index("items").GetDocumentAsync<Item>(message.AuctionId)
                      ?? throw new InvalidOperationException("Could not find auction");
        if ((auction.CurrentHighBid == null && message.BidStatus.Contains("Accepted")) ||
            message.BidStatus.Contains("Accepted") && message.Amount > auction.CurrentHighBid)
        {
            auction.CurrentHighBid = message.Amount;
            var updateTask = await client.Index("items").UpdateDocumentsAsync([auction]);
            await client.WaitForTaskAsync(updateTask.TaskUid);
        }
    }
}