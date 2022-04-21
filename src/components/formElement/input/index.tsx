import React, {memo} from "react";
import {FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react";
import {Controller} from "react-hook-form";
import {TInput} from "./TInput";

export const InputElement = memo(({
                                      name,
                                      label,
                                      type,
                                      placeHolder,
                                      max = 512,
                                      isDisable = false,
                                      className
                                  }: TInput) => {
    return (
        <Controller
            name={name}
            render={({field, fieldState: {error}}) =>
                <FormControl className={className}>
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <Input id={name}
                           type={type}
                           maxLength={max}
                           placeholder={placeHolder}
                           value={field.value}
                           onChange={field.onChange}/>
                    {(error && "error") &&
                    <FormHelperText>{error?.message}</FormHelperText>
                    }
                </FormControl>
            }
        />
    )
})
