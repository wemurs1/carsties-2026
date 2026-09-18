import {Card} from "@/components/ui/card";
import {JSX} from "react";

type Props = {
    auction: any
}

export default function AuctionCard({auction}: Props): JSX.Element {
    return (
        <Card className='p-4'>
            {auction.make} {auction.model}
        </Card>
    );
}