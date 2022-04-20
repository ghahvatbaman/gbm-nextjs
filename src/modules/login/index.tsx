import {InputElement} from "components";
import {CustomFormProvider} from "providers";
import {Button, Container, VStack} from "@chakra-ui/react";

export const LoginContainer = () => {
    return (
        <VStack>
            <Container maxW='md'>
                <div dir={'rtl'}>
                    <CustomFormProvider onSubmit={(data) => console.log(data)}
                                        mode={'all'}
                                        defaultValues={{email: '',password:''}}>
                        <InputElement name={'email'}
                                      label={'ایمیل'}
                                      type={"text"}
                                      placeHolder={'لطفا ایمیل خود را وارد کنید'}/>
                        <InputElement name={'password'}
                                      label={'پسورد'}
                                      type={"password"}
                                      placeHolder={'لطفا ایمیل خود را وارد کنید.'}/>
                        <Button size='xs' type='submit'>
                            ورود به حساب کاربری
                        </Button>
                    </CustomFormProvider>
                </div>
            </Container>
        </VStack>

    )
}
