import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Auction, Bid} from "@/lib/types";
import BidItem from "@/features/listings/details/BidItem";
import BidForm from "@/features/listings/details/BidForm";

type Props = {
    bids: Bid[],
    auction: Auction,
}

export default function BidPanel({bids, auction}: Props) {
    const highBid = bids.reduce((prev, current) => {
        return prev > current.amount ? prev : current.amount
    },0)

    return (
        <Card className='max-h-[80vh]'>
            <CardHeader>
                <CardTitle>Bid panel</CardTitle>
                <CardDescription>Minimum next bid is $200</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4 px-5 pb-5 overflow-y-auto'>
                <BidForm auctionId={auction.id} highBid={highBid}/>
                {bids.map(bid => (
                    <BidItem bid={bid} key={bid.id}/>
                ))}
            </CardContent>
        </Card>

    );
}