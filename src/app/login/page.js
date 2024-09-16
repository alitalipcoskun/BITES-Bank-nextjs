"use client"
import LoginForm from '@/components/Form/Login/LoginForm'
import PageContainer from '@/components/DefaultPage/PageContainer'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/components/AuthContext/AuthProvider'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import Cookies from 'js-cookie';

const Page = () => {
  const { isAuthenticated, checkToken, token } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {    
    checkToken();
    const checkAuth = async () => {
      if (token) {
        console.log("Token exists. Verifying authentication...");
        try {
          // You might want to add a method in AuthContext to verify the token
          // For now, we'll assume if there's a token, the user is authenticated
          if (isAuthenticated) {
            console.log("User is authenticated. Routing to home page.");
            router.push("/");
          }
        } catch (error) {
          console.error("Authentication error:", error);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, token, router]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Spinner />;
  }

  return (
    <PageContainer className="flex-col items-center h-screen w-screen">
      <LoginForm className="m-auto" />
    </PageContainer>
  )
}

export default Page