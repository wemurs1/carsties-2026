import {clsx} from "cn";
import {usdFormatter} from "@/lib/utils";

type Props = {
    amount?: number;
    reservePrice: number;
}

export default function CurrentHighBidBadge({amount, reservePrice}: Props) {
    const text = amount ? `${usdFormatter.format(amount)}` : 'No bids';

    return (
        <div className={clsx('border-2 border-white text-white py-1 px-2 rounded-lg', {
            'bg-green-600': amount && amount >= reservePrice,
            'bg-amber-600': amount && amount < reservePrice,
            'bg-red-600': !amount
        })}>
            {text}
        </div>
    );
}