'use client';

import BidItem from "@/features/listings/details/BidItem";
import {Bid} from "@/lib/types";
import {useState} from "react";
import {AnimatePresence, motion} from 'motion/react'

type Props = {
    bids: Bid[]
}

export default function BidHistory({bids}: Props) {
    const [newBidId, setNewBidId] = useState<string | null>(null);
    const [prevBids, setPrevBids] = useState(bids);

    if (bids !== prevBids) {
        const knownIds = new Set(prevBids.map(bid => bid.id));
        const newBid = bids.find(bid => !knownIds.has(bid.id))

        if (newBid && prevBids.length > 0) {
            setNewBidId(newBid.id);
        }
        setPrevBids(bids);
    }

    return (
        <div className=" overflow-y-auto space-y-4 scrollbar-thin max-h-[60vh]">
            {bids.length === 0 ? (
                <p>There are no bids for this listing yet</p>
            ) : (
                <AnimatePresence initial={false}>
                    {bids.map(bid => {
                        const isNew = bid.id === newBidId
                        return (
                            <motion.div
                                key={bid.id}
                                layout
                                initial={isNew ? {opacity: 0, x: -40} : false}
                                animate={{opacity: 1, x: 0}}
                                transition={{
                                    layout: {duration: 0.4, ease: 'easeOut'},
                                    opacity: {duration: 0.3, delay: isNew ? 0.4 : 0},
                                    x: {duration: 0.3, delay: isNew ? 0.4 : 0}
                                }}
                            >
                                <BidItem bid={bid}/>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            )}
        </div>
    );
}