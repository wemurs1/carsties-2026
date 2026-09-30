import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Bid} from "@/lib/types";
import BidItem from "@/features/listings/details/BidItem";

type Props = {
    bids: Bid[]
}

export default function BidPanel({bids}: Props) {
    return (
        <Card className='max-h-[80vh]'>
            <CardHeader>
                <CardTitle>Bid panel</CardTitle>
                <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4 px-5 pb-5 overflow-y-auto'>
                {bids.map(bid => (
                    <BidItem bid={bid} key={bid.id}/>
                ))}
            </CardContent>
        </Card>

    );
}