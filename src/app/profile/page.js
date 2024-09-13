"use client"
import PageTemplate from '@/components/DefaultPage/PageTemplate'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useEffect, useCallback, useContext, useState } from 'react'
import { AuthContext, useAuthContext } from '../../components/AuthContext/AuthProvider';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import ProfileForm from '@/components/Form/Profile/ProfileForm';


const ProfilePage = () => {
    const { user, login } = useAuthContext();
    const [token, setToken] = useState(Cookies.get("jwt"));

    const { axiosInstance } = useContext(AuthContext);

    console.log(user);
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
        if (token === null || token === undefined) {
            router.push("/");
        }
    }, [fetchUser]);

    return (
        <PageTemplate>
            <div className="flex flex-col justify-center align-middle w-screen h-screen text-center">
                <Card className="flex flex-col justify-center align-middle text-left w-[80vw] sm:w-fit h-fit m-auto">
                    <CardHeader className="font-bold">{user === undefined ? (<Skeleton className="w-72 sm:h-10 sm:w-80 mb-2" />) : (`Profile of ${user.name} ${user.surname}`)}</CardHeader>
                    <CardContent>
                        {user === undefined ? (<>
                            <Skeleton className="w-72 sm:h-10 sm:w-80 mb-2" />
                            <Skeleton className="h-10 w-[225px] mb-2" />
                            <Skeleton className="h-8 w-[200px] mb-2" />
                            <Skeleton className="h-8 w-[200px]" />
                        </>) :
                            (
                                <>
                                    <ProfileForm
                                        user={user}
                                        axiosInstance={axiosInstance}
                                    />

                                </>
                            )

                        }
                    </CardContent>
                </Card>
            </div>
        </PageTemplate>
    )
}

export default ProfilePage