import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useController, UseControllerProps} from "react-hook-form";
import {Textarea} from "@/components/ui/textarea";

type Props = {
    label?: string;
    type?: string;
    rows?: number;
    placeholder?: string;
    multiline?: boolean;
} & UseControllerProps

export default function AppTextInput(props: Props) {
    const {label, multiline, rows, placeholder, type, ...controllerProps} = props;
    const {field, fieldState} = useController({...controllerProps, defaultValue: ''});

    return (
        <Field data-invalid={!!fieldState.error}>
            {label &&
                <FieldLabel htmlFor={props.name}>{label}</FieldLabel>
            }
            {multiline ? (
                <Textarea {...field} id={props.name} rows={rows} placeholder={placeholder}
                          aria-invalid={!!fieldState.error}/>
            ) : (
                <Input id={props.name} {...field} type={type}
                       placeholder={placeholder} aria-invalid={!!fieldState.error}/>
            )}
            <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
    );
}