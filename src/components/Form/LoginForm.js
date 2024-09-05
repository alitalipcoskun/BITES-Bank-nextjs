"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

import LabeledInput from './LabeledInput';
import UIImage from '../Image';
import FormButton from './FormButton';
import PageContainer from '../PageComponents/PageContainer';
import Link from 'next/link';
import axios from 'axios';

import Cookies from 'js-cookie';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';



// Rulesets may change. In my opinion, a library is mandatory to manage them to learn.
const logInReq = [
    { name: "phone", type: "number", label: "Mobile phone number", placeholder: "Your phone number 5xxxxxxxxx", ruleSet: { required: "Verify your phone number", minLength: { value: 10, message: "Phone number must have 10 characters." }, maxLength: { value: 10, message: "Phone number must have 10 characters." } } },

    { name: "password", type: "password", label: "Password", placeholder: "Your password", ruleSet: { required: "Invalid password", minLength: { value: 8, message: "Password length should be at least 8 characters." } } }
];

const LoginForm = (props) => {
    const router = useRouter();
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
    const onSubmit = async (payload) => {
        try {
            const response = await axios.post("http://127.0.0.1:8080/api/v1/auth/authenticate", payload);

            if(!response.ok){
                throw new Error("Log in process failed.")
            }

            const { token } = response.data;
            Cookies.set('jwt', token, { expires: 7, secure: false })
            console.log("Here!");
            router.push("/new")
            console.log("Here!!")
        } catch (error) {
            setError("root", error.message);
        }
    }
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
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center text-left" >
                        <UIImage src={"/bites_logo.jpg"} className={"mb-4"}></UIImage>
                        {logInReq.map((label, idx) => {
                            return <LabeledInput label={label.label} type={label.type} ruleSet={label.ruleSet} name={label.name} register={register} placeholder={label.placeholder} key={idx} errors={errors} isSubmitting={isSubmitting}></LabeledInput>
                        })}
                        <p>If you did not signed up yet, you can signup from <Link href="/signup" className="text-blue-500 underline">here.</Link></p>
                        <FormButton type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Login" />
                        {errors.root && <p className="text-red-500">{errors.root.message}</p>}

                    </form>
                </CardContent>
            </Card>
        </PageContainer>
    );
};

export default LoginForm;