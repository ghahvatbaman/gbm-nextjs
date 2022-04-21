import {ComponentProps} from 'react'

export type TFormProvider = {
    className?: string
    defaultValues?: {}
    onSubmit: (state: any) => void
    mode: 'onBlur' | 'onChange' | 'onSubmit' | 'all' | 'onTouched'
    schema?: any | undefined
} & Omit<ComponentProps<'form'>, 'onSubmit'>
