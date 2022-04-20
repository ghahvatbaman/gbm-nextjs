import {memo} from 'react'
import {FormProvider, useForm} from 'react-hook-form';
import {TFormProvider} from "./TFormProvider";
// import {yupResolver} from '@hookform/resolvers/yup';
// import * as yup from "yup";


const Provider = FormProvider as any;

export const CustomFormProvider = memo(
    ({
         children,
         onSubmit,
         defaultValues,
         className,
         mode,
         // schema = yup.object().shape({}),
         schema,
     }: TFormProvider) => {
        const {
            control,
            handleSubmit,
            setValue,
            reset,
            clearErrors,
            setError,
            getValues,
            trigger,
        } = useForm({
            defaultValues,
            mode: `${mode}`,
            // resolver: yupResolver(schema)
        });

        return (
            <Provider control={control}
                      setValue={setValue}
                      getValues={getValues}
                      setError={setError}
                      reset={reset}
                      trigger={trigger}
                      clearErrors={clearErrors}>
                <form onSubmit={handleSubmit(onSubmit)}
                      className={className}>
                    {children}
                </form>
            </Provider>
        )
    }
)
