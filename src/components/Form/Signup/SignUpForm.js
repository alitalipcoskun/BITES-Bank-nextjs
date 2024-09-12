"use client"
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import LabeledInput from '../LabeledInput';
import UIImage from '../../Image';
import FormButton from '../FormButton';
import Link from 'next/link';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AuthContext } from '../../AuthContext/AuthProvider';

const digitsOnly = (value) => /^\d{10}$/.test(value)


// Rulesets and field for sign in
const signInSchema = yup.object({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  mail: yup.string().email("Mail is not in e-mail format").required("Mail is required"),
  phone: yup.string().required("Phone number is required").test("Digits only", "This field should have only decimals with length of 10.", digitsOnly),
  password: yup.string().min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty"),
  password_again: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").min(6, "Minimum length of the password is 6 characters").required("This field cannot be empty")
});



const SignUpForm = (props) => {
  // Routing to main page if user already authenticated.
  const [jwt, setJwt] = useState(Cookies.get('jwt') !== undefined);

  //Auth Context is imported for catching errors
  const {validateStatus, axiosInstance} = useContext(AuthContext);

  // For controlling the form precisely
  const { register, handleSubmit, setError, formState: { errors, isSubmitting }, getValues } = useForm({ resolver: yupResolver(signInSchema) });

  // To direct the user to another end-point after successfully made sign up process
  const router = useRouter();

  // It is the input fields that is necesarry to sign in the user.
  const signUpReq = [{ name: "name", label: "Name", type: "text", placeholder: "Your name", ruleSet: { required: "Name is required.", maxLength: 30, minLength: 2 } },
  { name: "surname", label: "Surname", type: "text", placeholder: "Your surname" },
  { name: "mail", type: "email", label: "Email", placeholder: "xxxxx@xxxx.com" }, //Turkish chars are problem currently
  { name: "phone", type: "tel", label: "Mobile phone number", placeholder: "5xxxxxxxxx(10 digits)", maxlength: 50 },
  { name: "password", type: "password", label: "Password", placeholder: "Your password (at least 6 characters)" },
  { name: "password_again", type: "password", label: "Password again", placeholder: "Should match with the above field" }
  ];

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
      // Throw error for failed requests.
      console.log(response);
      validateStatus(response);
    }
    //Catches the error while trying to send the user data to the backend service.
    catch (error) {
      console.log(error);
      setError("phone", { type: 'custom', message: error.response.data.message });
      setError("mail", {type: `custom`,  message: error.response.data.message});
      setError("root", {type: `custom`,  message: error.response.data.message});
      console.log(errors);
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
          <UIImage src={"/bites_logo.jpg"} className={"mb-4"}/>
          {errors["root"] && <p className="text-red-500">{errors["root"].message}</p>}
          {signUpReq.map((label, idx) => {
            return <LabeledInput register={register} {...label} key={idx} errors={errors} isSubmitting={isSubmitting} name={label["name"]} ></LabeledInput>
          })}
          <p>If you're already have account on this service, you can log in from <Link href="/login" className="text-blue-500 underline">here.</Link></p>
          <FormButton type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Sign Up" />
        </form>
      </CardContent>
    </Card>

  );
};

export default SignUpForm;