'use client';

import {FieldGroup, FieldSet} from "@/components/ui/field";
import {Button} from "@/components/ui/button";
import {FieldValues, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useEffect, useTransition} from "react";
import AppTextInput from "@/components/ui/app-text-input";
import {createListing, updateListing} from "@/features/listings/actions";
import {toast} from "@/components/ui/toast";
import {Auction} from "@/lib/types";
import {toDatetimeLocal} from "@/lib/utils";
import {FetchResult} from "@/lib/fetch-wrapper";

type Props = {
    auction?: Auction;
}

export default function AuctionForm({auction}: Props) {
    const {control, handleSubmit, reset, setFocus, formState: {isSubmitting, isValid, isDirty}} = useForm();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: FieldValues) => {
        const auctionValues = {
            ...data,
            reservePrice: data.reservePrice || 0,
            auctionEnd: new Date(data.auctionEnd).toISOString()
        }

        startTransition(async () => {
            let result: FetchResult<Auction | void>;
            let id = auction?.id ?? null;

            if (auction) {
                result = await updateListing(auctionValues);
            } else {
                result = await createListing(auctionValues);
                if (result.ok && result.data) id = result.data.id;
            }

            if (!result.ok) {
                toast.add({
                    type: "error",
                    title: result.status,
                    description: result.error
                })
                console.log(result);
            } else {
                router.push(`/listings/${id}`);
            }
        })
    }

    useEffect(() => {
        setFocus('make')
    }, [setFocus])

    useEffect(() => {
        if (auction) reset({
            ...auction,
            auctionEnd: toDatetimeLocal(auction.auctionEnd)
        });
    }, [auction, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className='w-full'>
                <FieldGroup>
                    <div className='grid grid-cols-2 gap-4'>
                        <AppTextInput name='make' label='Make of car' control={control} placeholder='Ferrari'
                                      rules={{required: 'Make is required'}}/>

                        <AppTextInput name='model' label='Model of car' control={control} placeholder='Testarossa'
                                      rules={{required: 'Model is required'}}/>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <AppTextInput name='color' label='Colour of car' control={control} placeholder='Red'
                                      rules={{required: 'Colour is required'}}/>

                        <AppTextInput name='year' label='Year of manufacture' control={control} placeholder='1984'
                                      rules={{required: 'Year is required'}} type='number'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <AppTextInput name='mileage' label='How many miles on the clock' control={control}
                                      placeholder='1000' rules={{required: 'Mileage is required'}} type='number'/>

                        <AppTextInput
                            name='auctionEnd'
                            label='When do you want the auction to finish?'
                            control={control}
                            rules={{
                                required: 'Auction end date/time is required',
                                validate: value => new Date(value) > new Date() || 'Auction end date must be in the future'
                            }}
                            type='datetime-local'
                            minDate={new Date()}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <AppTextInput name='reservePrice' label='Do you want a reserve price? Leave empty if no reserve'
                                      control={control}
                                      placeholder='0' type='number'/>

                        <AppTextInput name='imageUrl' label='Image URL of the car' placeholder='https://image.com'
                                      control={control} rules={{required: 'Image URL is required'}}
                        />
                    </div>
                    <AppTextInput
                        name='description'
                        label='Description'
                        control={control}
                        placeholder='Enter description'
                        multiline={true}
                        rows={4}
                        rules={{
                            required: 'Description is required',
                            minLength: {value: 3, message: 'Description must be at least 3 characters'}
                        }}
                    />

                </FieldGroup>
            </FieldSet>
            <div className='flex justify-end gap-3 mt-4'>
                <Button onClick={router.back} variant='outline'>Cancel</Button>
                <Button
                    variant='default'
                    type='submit'
                    disabled={isSubmitting || isPending || !isDirty || !isValid}
                >
                    {isPending ? 'Submitting...' : 'Submit'}
                </Button>
            </div>
        </form>
    );
}