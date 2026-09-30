'use client';

import {Field, FieldContent} from "@/components/ui/field";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Button} from "@/components/ui/button";
import {Controller, FieldValues, useForm} from "react-hook-form";
import {placeBidForAuction} from "@/features/listings/actions";
import {toast} from "@/components/ui/toast";

type Props = {
    auctionId: string;
    highBid: number;
}

export default function BidForm({auctionId, highBid}: Props) {
    const {control, handleSubmit, setValue} = useForm({
        values: {
            amount: highBid + 100,
        }
    })

    const onSubmit = async (data: FieldValues) => {
        const result = await placeBidForAuction(auctionId, +data.amount);
        if (!result.ok) {
            toast.add({
                type: "error",
                title: result.status,
                description: result.error
            })
        } else {
            setValue('amount', highBid + 100)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <Controller render={({field}) => (
                <Field>
                    <FieldContent>
                        <InputGroup className='h-16 rounded-lg'>
                            <InputGroupAddon className='text-3xl'>$</InputGroupAddon>
                            <InputGroupInput className='text-3xl!' value={field.value} onChange={field.onChange}/>
                        </InputGroup>
                    </FieldContent>
                </Field>
            )} name='amount' control={control}/>
            <Button
                type="submit"
                className="w-full rounded-lg"
            >
                Place bid
            </Button>
        </form>
    );
}