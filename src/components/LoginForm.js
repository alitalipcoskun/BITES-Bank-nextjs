"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

import LabeledInput from './LabeledInput';
import UIImage from './Image';
import { Button } from './ui/button';



const logInReq = [
    { name: "phone", type: "tel", label: "Mobile phone number", placeholder: "Your phone number 5xxxxxxxxx", ruleSet: { required: "Verify your phone number", minLength: { value: 10, message: "Phone number must have 10 characters." }, maxLength: { value: 10, message: "Phone number must have 10 characters." } } },

    { name: "password", type: "password", label: "Password", placeholder: "Your password", ruleSet: { required: "Invalid password", minLength: { value: 8, message: "Password length should be at least 8 characters." } } }
];

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    console.log(errors);

    return (
        <Card className="display-flex flex-col h-full min-w-[20vw] shadow-xl">
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
                        return <LabeledInput label={label.label} type={label.type} ruleSet={label.ruleSet} name={label.name} register={register} placeholder={label.placeholder} key={idx} errors={errors}></LabeledInput>
                    })}
                    <Button type="submit" className="mt-4">Login</Button> 
                </form>
            </CardContent>
        </Card>
    );

};

export default LoginForm;