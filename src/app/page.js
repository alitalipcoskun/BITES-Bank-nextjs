"use client"
import { useEffect, useCallback, useContext } from "react";
import Navbar from "@/components/NavbarFiles/Navbar";
import Cookies from 'js-cookie';
import axios from "axios";
import { AuthContext } from "@/components/AuthContext/AuthProvider";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import PageTemplate from "@/components/PageComponents/PageTemplate";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import FormButton from "@/components/Form/FormButton";





const options = [
  { name: "Dollar", type: "dollar" },
  { name: "Turkish Lira (TL)", type: "tl" },
  { name: "Euro", type: "eu" }]


export default function Home() {
  const { login, user } = useContext(AuthContext);
  const token = Cookies.get("jwt");
  const router = useRouter();

  // Library allows control and give feedback to user precisely.
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/api/v1/user/profile',
        { token: token },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Errors will thrown with respect to the response status.
      if (token === undefined) {
        router.push("/login");
      }
      login(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }, [token]);
  useEffect(() => {

    fetchUser();
  }, [fetchUser]);

  const onSubmit = (payload) => {
    console.log(payload);
    // POST request to create an account.
  }

  // Ref or form added to select component.
  // Also the entire creating process will implement to the pop up.
  // Check your previous knowledge.

  return (
    <>
      <PageTemplate>{user === undefined ? (<Spinner className="m-auto"></Spinner>) : (!user ? "Redirecting.." :
        <div className="flex flex-col w-screen h-screen text-center justify-center">
          <Card className="shadow-xl flex flex-col w-fit h-fit justify-center text-left m-auto container">
            <CardTitle className="container">
              Account informations
            </CardTitle>
            <CardDescription className="container">
              Welcome to BITES Bank! {user && `${user.name}`}
            </CardDescription>
            <CardContent className="container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <select className="w-72" {...register("money_type", { required: true })}>
                  {options.map((item, idx) => {
                    return <option value={item.value} key={idx}>{item.name}</option>
                  })}
                </select>
                {errors.root && <p className="text-red-500">{errors.root.message}</p>}
                <FormButton className= "ml-28" type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Create Account"/>
              </form>
            </CardContent>
          </Card>
        </div>)}</PageTemplate>
    </>
  );
}
