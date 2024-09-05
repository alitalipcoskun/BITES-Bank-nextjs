"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

import LabeledInput from './LabeledInput';
import UIImage from '../Image';
import { Button } from '../ui/button';
import FormButton from './FormButton';
import PageContainer from '../PageComponents/PageContainer';
import Link from 'next/link';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const digitsOnly = (value) => /^\d{10}$/.test(value)

const signInSchema = yup.object({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  mail: yup.string().email("Mail is not in e-mail format").required("Mail is required"),
  phone: yup.string().required("Phone number is required").test("Digits only", "This field should have only decimals with length of 10.", digitsOnly),
  password: yup.string().min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty"),
  password_again: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty")
});



const SignUpForm = (props) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm({resolver: yupResolver(signInSchema) });

  const signUpReq = [{ name: "name", label: "Name", type: "text", placeholder: "Your name", ruleSet: { required: "Name is required.", maxLength: 30, minLength: 2 } },
  { name: "surname", label: "Surname", type: "text", placeholder: "Your surname"},
  { name: "mail", type: "email", label: "Email", placeholder: "xxxxx@xxxx.com"}, //Turkish chars are problem currently
  { name: "phone", type: "tel", label: "Mobile phone number", placeholder: "5xxxxxxxxx(10 digits)" , maxlength: 50},
  { name: "password", type: "password", label: "Password", placeholder: "Your password (at least 6 characters)"},
  { name: "password_again", type: "password", label: "Password again", placeholder: "Should match with the above field" }
  ];



  const checkValidity = (duplicatedPassword) => {
    const { password } = getValues();
    return password === duplicatedPassword || "Password must match"

  }

  const onSubmit = (data) => {
    console.log(data);
  }
  console.log(errors);
  return (
      <Card className={`display-flex flex-col h-fit w-[80vw] sm:w-fit shadow-md  ${props.className}`}>
        <CardHeader>
          <CardTitle className="container">
            Sign Up
          </CardTitle>
          <CardDescription className="container">
            Sign Up to BITES bank for making operations and creating a bank account
          </CardDescription>
        </CardHeader>
        <CardContent className="display-flex flex-col h-full sm:min-h-96 items-center" >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center text-left" >
            <UIImage src={"/bites_logo.jpg"} className={"mb-4"}></UIImage>
            {signUpReq.map((label, idx) => {
              return <LabeledInput register={register} {...label} key={idx} errors={errors} isSubmitting={isSubmitting} ></LabeledInput>
            })}
            <p>If you're already have account on this service, you can log in from <Link href="/login" className="text-blue-500 underline">here.</Link></p>
            <FormButton type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Sign Up" />
          </form>
        </CardContent>
      </Card>

  );
};

export default SignUpForm;