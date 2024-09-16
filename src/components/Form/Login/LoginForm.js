"use client"
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import LabeledInput from '../LabeledInput';
import UIImage from '../../Image';
import FormButton from '../FormButton';
import PageContainer from '../../DefaultPage/PageContainer';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Spinner } from '../../ui/spinner';
import { AuthContext, useAuthContext } from '../../AuthContext/AuthProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './LoginSchema';
import { logInLabels } from './LoginLabels';


// It is the input fields that is required to give authorization to user.
// Rulesets may change. In my opinion, a library is mandatory to manage them to learn.



const LoginForm = (props) => {
    // AuthContext is added for updating user profile.
    const { login, isAuthenticated, validateStatus, axiosInstance } = useAuthContext();

    // The variable is for directing user to another page after process
    const router = useRouter();

    // Library allows control and give feedback to user precisely.
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, clearErrors } = useForm(yupResolver(loginSchema));

    // The useState is used in order to see the results of the changes in this page.
    const [jwt, setJwt] = useState(Cookies.get("jwt") !== undefined);
    const onSubmit = async (payload) => {
        // Tries to fetch data if it is not ok, then error(s) are thrown and caught by form to give feedback to the user.
        try {
            await login(payload);
            // If login is successful, we can assume the JWT is set and user is authenticated
            // So we can redirect to the home page
            router.push("/");
        } catch (error) {
            console.log("Login error:", error);
            if(error.code === "ERR_NETWORK"){
                setError("root", {
                    message: error.message
                });
                return;
            }
            // Set a generic error message
            setError("root", {
                message: "Login failed. Please check your credentials and try again."
            });

            // Set specific error messages for phone and password fields
            setError("phone", { message: "Phone number or password incorrect" });
            setError("password", { message: "Phone number or password incorrect" });

            // If the error has a response with a message, use it for the root error
            if (error.response && error.response.data && error.response.data.message) {
                setError("root", {
                    message: error.response.data.message
                });
            }
        }
    }

    // If auth successfully done, then it routes back to the main page.
    // Also, If any user already authenticated to use this service, then it is unable to see this page
    // thanks to this if check.
    if (jwt) {
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
                    {isSubmitting ? <Spinner></Spinner> :
                        (<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center text-left" >
                            <UIImage src={"/bites_logo.jpg"} className={"mb-4"}></UIImage>
                            {logInLabels.map((label, idx) => {
                                return <LabeledInput label={label.label} type={label.type} ruleSet={label.ruleSet} name={label.name} register={register} placeholder={label.placeholder} key={idx} errors={errors} isSubmitting={isSubmitting}></LabeledInput>
                            })}
                            <p>If you did not signed up yet, you can signup from <Link href="/signup" className="text-blue-500 underline">here.</Link></p>
                            <FormButton type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Login" />
                            {errors.root && <p className={`text-red-500 ${errors.root ? 'visible' : 'invisible'}`}>{errors.root.message}</p>}

                        </form>)
                    }
                </CardContent>
            </Card>
        </PageContainer>
    );
};

export default LoginForm;