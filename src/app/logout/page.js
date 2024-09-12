"use client"
import { AuthContext } from '@/components/AuthContext/AuthProvider';
import Footer from '@/components/Footer/Footer'
import UIImage from '@/components/Image'
import PageContainer from '@/components/DefaultPage/PageContainer'
import { Spinner } from '@/components/ui/spinner';
import Cookies from 'js-cookie';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useCallback, useContext, useState } from 'react'


const LogoutPage = () => {
    const [cookieflag, setCookieFlag] = useState(Cookies.get('jwt') !== undefined);
    const [signedOut, setSignedOut] = useState(false);
    const router = useRouter();
    const { logout } = useContext(AuthContext);
    const token = Cookies.get("jwt")
    const signOut = useCallback(() => {
        if (token) {
            console.log("Removing token!");
            Cookies.remove("jwt", { path: '' })
            logout();
            setCookieFlag(true);
            setSignedOut(true);
        }
    }, [token])
    

    useEffect(() => {
        signOut();
        console.log(cookieflag);
        console.log(signedOut);
        if(!cookieflag && !signedOut){
            router.push("/login")
        }
    }, [signOut])

    return (
        (<PageContainer className="flex-col items-center h-screen w-screen">
            {cookieflag && signedOut ? (<><UIImage src="/bites_logo.jpg" /> 
            <p className="mt-3 text-center">
                Signed out succesfully.<br />
                You can log in again from <Link href="/login" className="text-blue-500 underline" >here.</Link>
            </p></>): <Spinner></Spinner>}
            <Footer />
        </PageContainer>)

    )
}

export default LogoutPage