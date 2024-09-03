"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

import LabeledInput from './LabeledInput';
import UIImage from './Image';
import { Button } from './ui/button';





const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const signUpReq = [{ name: "name", label: "Name", type: "text", placeholder: "Your name", ruleSet: { required: "Name is required.", maxLength: 30, minLength: 2 } },
  { name: "surname", label: "Surname", type: "text", placeholder: "Your surname", ruleSet: { required: "Surname is required", maxLength: 30, minLength: 2 } },
  { name: "mail", type: "email", label: "Email", placeholder: "xxxxx@xxxx.com", ruleSet: { required: "Invalid e-mail", maxLength: 50, pattern: "/^[a-z0-9._%+-]@[a-z]{2,4}$/" } }, //Turkish chars are problem currently
  { name: "phone", type: "tel", label: "Mobile phone number", placeholder: "5xxxxxxxxx(10 digits)", ruleSet: { required: "Phone number must have length 10. 5xxxxxxxxx", minLength: {value: 10, message: "Phone number must have exactly 10 characters"}, maxLength: {value: 10, message: "Phone number must have exactly 10 characters"} } },
  { name: "password", type: "password", label: "Password", placeholder: "Your password (at least 6 characters)", ruleSet: { required: "Invalid password", minLength: {value: 8, message: "Password must have at least 8 characters"} } },
  { name: "password_again", type: "password", label: "Password again", placeholder: "Should match with the above", ruleSet: { required: "Invalid password", validate: (value) => {checkValidity(value)}, minLength: {value: 8, message: "Password must have at least 8 characters"} } }
  ];

  const checkValidity = (duplicatedPassword) => {
    const {password} = getValues();
    return password === duplicatedPassword || "Password must match"

  }

  const onSubmit = (data) => {
    console.log(data);
  }
  console.log(errors);

  return (
    <Card className="display-flex flex-col h-full min-w-[30vw] shadow-md">
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
            return <LabeledInput label={label.label} type={label.type} ruleSet={label.ruleSet} name={label.name} register={register} placeholder={label.placeholder} key={idx} errors={errors}></LabeledInput>
          })}
          <Button type="submit" className="mt-4">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;