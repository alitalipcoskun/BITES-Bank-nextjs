"use client"
import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import LabeledInput from './LabeledInput';
import UIImage from '../Image';
import FormButton from './FormButton';
import PageContainer from '../PageComponents/PageContainer';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { AuthContext } from '../AuthContext/AuthProvider';


// It is the input fields that is required to give authorization to user.
// Rulesets may change. In my opinion, a library is mandatory to manage them to learn.

// YUP MUST GET IMPLEMENTED TO THIS PAGE.
const logInReq = [
    { name: "phone", type: "number", label: "Mobile phone number", placeholder: "Your phone number 5xxxxxxxxx", ruleSet: { required: "Verify your phone number", minLength: { value: 10, message: "Phone number must have 10 characters." }, maxLength: { value: 10, message: "Phone number must have 10 characters." } } },

    { name: "password", type: "password", label: "Password", placeholder: "Your password", ruleSet: { required: "Invalid password", minLength: { value: 8, message: "Password length should be at least 8 characters." } } }
];

const LoginForm = (props) => {
    // AuthContext is added for updating user profile.
    const {login, isAuthenticated, setAuthenticated, validateStatus, axiosInstance} = useContext(AuthContext);
    // The variable is for directing user to another page after process
    const router = useRouter();
    // Library allows control and give feedback to user precisely.
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
    
    // The useState is used in order to see the results of the changes in this page.
    const [jwt, setJwt] = useState(Cookies.get("jwt") !== undefined);
    const onSubmit = async (payload) => {
        // Tries to fetch data if it is not ok, then error(s) are thrown and cought by form to give feedback to the user.
        try {
            const response = await axiosInstance.post("/api/v1/auth/authenticate", {
                "phone": payload.phone,
                "password": payload.password
            });
            // If token is empty, it throws error.
            const { token } = response.data;

            // Set the JWT in cookies and authenticate
            Cookies.set('jwt', token, { expires: 7, secure: false });

            setAuthenticated({ action: "AUTHENTICATE", payload: true });
            router.push("/");
        
        } catch (error) {
            console.log(error);
            // Handle the error, display custom message using setError
            const errMsg = validateStatus(error);
        
            // Set the error in the root if something goes wrong
            setError(errMsg.label, errMsg.value);
        }
    }

    // If auth successfully done, then it routes back to the main page.
    // Also, If any user already authenticated to use this service, then it is unable to see this page
    // thanks to this if check.
    if(jwt){
        router.push("/");
    }

    // Login form component
    return (
        <PageContainer>
            <Card className={`display-flex flex-col h-fit w-[80vw] sm:w-fit shadow-xl justify-center ${props.className}`}>
                <CardHeader>
                    <CardTitle className="container">
                        Login
                    </CardTitle>
                    <CardDescription className="container">
                        Welcome to BITES Bank! Please login to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="display-flex flex-col h-full sm:min-h-96 items-center" >
                    {isSubmitting ? <Spinner></Spinner> : (<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center text-left" >
                        <UIImage src={"/bites_logo.jpg"} className={"mb-4"}></UIImage>
                        {logInReq.map((label, idx) => {
                            return <LabeledInput label={label.label} type={label.type} ruleSet={label.ruleSet} name={label.name} register={register} placeholder={label.placeholder} key={idx} errors={errors} isSubmitting={isSubmitting}></LabeledInput>
                        })}
                        <p>If you did not signed up yet, you can signup from <Link href="/signup" className="text-blue-500 underline">here.</Link></p>
                        <FormButton type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Login" />
                        {errors.root && <p className="text-red-500">{errors.root.message}</p>}

                    </form>)}
                </CardContent>
            </Card>
        </PageContainer>
    );
};

export default LoginForm;