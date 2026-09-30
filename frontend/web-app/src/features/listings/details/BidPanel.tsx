import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Auction, Bid} from "@/lib/types";
import BidForm from "@/features/listings/details/BidForm";
import BidHistory from "@/features/listings/details/BidHistory";
import {getCurrentUser} from "@/lib/auth";
import {usdFormatter} from "@/lib/utils";
import {Alert, AlertTitle} from "@/components/ui/alert";
import {Gavel} from "lucide-react";

type Props = {
    bids: Bid[],
    auction: Auction,
}

export default async function BidPanel({bids, auction}: Props) {
    const user = await getCurrentUser();
    const isSeller = user?.username === auction.seller;
    const highBid = bids.reduce((prev, current) => {
        return prev > current.amount ? prev : current.amount
    }, 0)
    const isSold = auction.currentHighBid > auction.reservePrice;

    return (
        <Card className='max-h-[80vh]'>
            <CardHeader>
                <CardTitle>Bid panel</CardTitle>
                <CardDescription>Minimum next bid is
                    <span className='font-bold text-foreground'>
                        {usdFormatter.format(highBid + 100)}
                    </span></CardDescription>
            </CardHeader>
            <CardContent className='space-y-4 px-5 pb-5'>
                {isSeller ? (
                    <Alert>
                        <Gavel/>
                        <AlertTitle>
                            The item is currently {isSold ? 'sold' : 'unsold'}
                        </AlertTitle>
                    </Alert>
                ) : (
                    <BidForm
                        auctionId={auction.id}
                        highBid={highBid}
                        isLoggedIn={!!user}
                    />
                )}
                <BidHistory bids={bids}/>
            </CardContent>
        </Card>

    );
}