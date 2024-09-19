"use client"
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import LabeledInput from '../LabeledInput';
import UIImage from '../../Image';
import FormButton from '../FormButton';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { signUpSchema } from './SignUpSchema';
import { signUpLabels } from './SignUpLabels';





const SignUpForm = (props) => {
  // Routing to main page if user already authenticated.
  const [jwt, setJwt] = useState(Cookies.get('jwt') !== undefined);

  //Auth Context is imported for catching errors
  const { axiosInstance } = useContext(AuthContext);

  // For controlling the form precisely
  const { register, handleSubmit, setError, formState: { errors, isSubmitting }, getValues } = useForm({ resolver: yupResolver(signUpSchema) });

  // To direct the user to another end-point after successfully made sign up process
  const router = useRouter();


  if (jwt) {
    router.push("/");
  }


  const onSubmit = async (payload) => {
    // Tries to send user information to backend service.
    try {
      const response = await axiosInstance.post("/api/v1/auth/register", {
        "name": payload.name,
        "surname": payload.surname,
        "mail": payload.mail,
        "phone": payload.phone,
        "password": payload.password,
      })
      // May give feedback to the user with toast.
    }
    //Catches the error while trying to send the user data to the backend service.
    catch (error) {
      console.log(error);
      setError("phone", { type: 'custom', message: error.response.data.message });
      setError("mail", { type: `custom`, message: error.response.data.message });
      setError("root", { type: `custom`, message: error.response.data.message });
    }
  }
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
      <CardContent className="display-flex flex-col h-fit sm:min-h-96 items-center" >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center text-left" >
          <UIImage src={"/bites_logo.jpg"} className={"mb-4"} />
          {errors["root"] && <p className="text-red-500">{errors["root"].message}</p>}
          {signUpLabels.map((label, idx) => {
            return <LabeledInput register={register} {...label} key={idx} errors={errors} isSubmitting={isSubmitting} name={label["name"]} 
            className="sm:w-[30vw] w-[50vw]"></LabeledInput>
          })}
          <p>If you're already have account on this service, you can log in from <Link href="/login" className="text-blue-500 underline">here.</Link></p>
          <p>If you forget your password, recover from <Link href="/forget-password" className="text-blue-500 underline">here.</Link></p>
          <FormButton type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Sign Up" />
        </form>
      </CardContent>
    </Card>

  );
};

export default SignUpForm;