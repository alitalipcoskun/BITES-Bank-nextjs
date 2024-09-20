"use client"
import LoginForm from '@/components/Form/Login/LoginForm'
import PageContainer from '@/components/DefaultPage/PageContainer'
import React, { useEffect, useState, useRef } from 'react'
import { useAuthContext } from '@/components/AuthContext/AuthProvider'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import { Toast } from 'primereact/toast'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'


const Page = () => {
  const { isAuthenticated, checkToken, token } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useRef(null);

  useEffect(() => {    
    checkToken();
    const checkAuth = async () => {
      if (token) {
        try {
          if (isAuthenticated) {
            router.push("/");
          }
        } catch (error) {
          toast.current.show({
            severity: 'error',
            summary: 'Authentication Error',
            detail: 'There was an error during authentication. Please try again.',
            life: 3000
          });
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
      <Toast ref={toast} />
      <LoginForm 
        className="m-auto" 
        onLoginSuccess={() => {
          router.push("/");
        }} 
        onLoginFailure={(error) => {
          toast.current.show({
            severity: 'error',
            summary: 'Login Failed',
            detail: error.message || 'There was an error during login. Please try again.',
            life: 3000
          });
        }} 
      />
    </PageContainer>
  )
}

export default Page