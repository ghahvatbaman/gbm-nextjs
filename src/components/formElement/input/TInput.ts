import {ComponentProps, HTMLInputTypeAttribute, ReactNode} from "react";

export type TInput = {
    className?: string
    label?: string | ReactNode
    name: string
    placeHolder: string
    max?: number
    isDisable?: boolean
    type: HTMLInputTypeAttribute
} & ComponentProps<'input'>
