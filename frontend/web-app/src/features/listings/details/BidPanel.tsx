import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Auction, Bid} from "@/lib/types";
import BidItem from "@/features/listings/details/BidItem";
import BidForm from "@/features/listings/details/BidForm";
import BidHistory from "@/features/listings/details/BidHistory";

type Props = {
    bids: Bid[],
    auction: Auction,
}

export default function BidPanel({bids, auction}: Props) {
    const highBid = bids.reduce((prev, current) => {
        return prev > current.amount ? prev : current.amount
    }, 0)

    return (
        <Card className='max-h-[80vh]'>
            <CardHeader>
                <CardTitle>Bid panel</CardTitle>
                <CardDescription>Minimum next bid is $200</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4 px-5 pb-5'>
                <BidForm auctionId={auction.id} highBid={highBid}/>
                <BidHistory bids={bids}/>
            </CardContent>
        </Card>

    );
}