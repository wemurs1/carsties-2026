'use client';

import {Field, FieldGroup, FieldSet, FieldLabel, FieldError} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FieldValues, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AuctionForm() {
    const {register, handleSubmit, setFocus, formState: {errors}} = useForm();
    const router = useRouter();
    const onSubmit = (data: FieldValues) => {
        console.log(data);
    }

    useEffect(() => {
        setFocus('make')
    }, [setFocus])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className='w-full'>
                <FieldGroup>
                    <div className='grid grid-cols-2 gap-4'>
                        <Field data-invalid={!!errors.make}>
                            <FieldLabel htmlFor='make'>Make</FieldLabel>
                            <Input id='make' {...register('make', {required: 'Make is required'})} type='text'
                                   placeholder='Ferrari' aria-invalid={!!errors.make}/>
                            <FieldError>{errors.make?.message as string}</FieldError>
                        </Field>

                        <Field data-invalid={!!errors.model}>
                            <FieldLabel htmlFor='model'>Model</FieldLabel>
                            <Input id='model' {...register('model', {required: 'Model is required'})} type='text'
                                   placeholder='Testarossa' aria-invalid={!!errors.model}/>
                            <FieldError>{errors.model?.message as string}</FieldError>
                        </Field>
                    </div>
                </FieldGroup>
            </FieldSet>
            <div className='flex justify-end gap-3 mt-4'>
                <Button onClick={router.back} variant='outline'>Cancel</Button>
                <Button variant='default' type='submit'>Submit</Button>
            </div>
        </form>
    );
}