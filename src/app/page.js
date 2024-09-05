"use client"
import PageContainer from "@/components/PageComponents/PageContainer";
import react, { useState, useEffect, useCallback, useContext} from "react";
import Navbar from "@/components/NavbarFiles/Navbar";
import Cookies from 'js-cookie';
import axios from "axios";
import { AuthContext } from "@/components/AuthContext/AuthProvider";
import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";






export default function Home() {
  const {login, user} = useContext(AuthContext);
  const token = Cookies.get("jwt");
  const router = useRouter();
  const fetchUser = useCallback(async () => {
    if (token) {}
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
        login(response.data);
      }
      catch (error) {
        console.log(error);
      }
    }, [token])

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  console.log(user);
  return (
    <>
      <Navbar></Navbar>
      <PageContainer>{user === null || !token  ? (token ? (<Spinner></Spinner>) : router.push("/login"))  : `${user.name}`}</PageContainer>
    </>
  );
}
