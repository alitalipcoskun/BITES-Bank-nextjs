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
import PageTemplate from '@/components/DefaultPage/PageTemplate';


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
        <PageContainer className="flex flex-col justify-center items-center">
            {cookieflag && signedOut ? (
                <div className="flex flex-col items-center justify-center">
                    <UIImage src="/bites_logo.jpg" />
                    <p className="mt-3 text-center">
                        Signed out successfully.<br />
                        You can log in again from <Link href="/login" className="text-blue-500 underline">here.</Link>
                    </p>
                </div>
            ) : <Spinner />}
            <Footer />
        </PageContainer>
    )
}

export default LogoutPage