"use client"
import PageTemplate from '@/components/DefaultPage/PageTemplate'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useEffect, useCallback, useState } from 'react'
import { useAuthContext } from '../../components/AuthContext/AuthProvider';
import Cookies from 'js-cookie';
import { Skeleton } from '@/components/ui/skeleton';
import ProfileForm from '@/components/Form/Profile/ProfileForm';
import { useRouter } from 'next/navigation';
import { useErrorBoundary } from 'react-error-boundary';

const ProfilePage = () => {
    const [token, setToken] = useState(Cookies.get("jwt"));
    const [error, setError] = useState({ "root": undefined });
    const [loadingState, setLoadingState] = useState(true);
    const [profileData, setProfileData] = useState(null);

    const router = useRouter();
    const { axiosInstance, LoginUser, user } = useAuthContext();
    const { showBoundary } = useErrorBoundary();

    const fetchUser = useCallback(async () => {
        try {
            if (!token) {
                router.push("/login");
                return;
            }
            const response = await axiosInstance.post(
                '/api/v1/user/profile',
                { token: token }
            );
            LoginUser(response.data);
            setProfileData(response.data);
            setError(prev => ({ ...prev, root: undefined }));
        } catch (error) {
            // Handle the error appropriately
            setError(prev => ({ ...prev, root: { message: "Failed to fetch user profile" } }));
            // Crucial error, user should not be able to see the page.
            showBoundary(error);
            router.push("/login");
        } finally {
            setLoadingState(false);
        }
    }, [token, router, LoginUser, axiosInstance, showBoundary]);

    useEffect(() => {
        if (!token) {
            router.push("/login");
            return;
        }
        fetchUser();
    }, [fetchUser, token, router]);

    const displayName = profileData ? `${profileData.name} ${profileData.surname}` : '';

    return (
        <PageTemplate>
            <div className="flex flex-col justify-center align-middle w-screen h-screen text-center">
                <Card className="flex flex-col justify-center align-middle text-left w-[80vw] sm:w-fit h-fit m-auto">
                    <CardHeader className="font-bold">
                        {loadingState ? (
                            <Skeleton className="w-72 sm:h-10 sm:w-80 mb-2" />
                        ) : (
                            `Profile of ${displayName}`
                        )}
                    </CardHeader>
                    <CardContent>
                        {loadingState ? (
                            <>
                                <Skeleton className="w-72 sm:h-10 sm:w-80 mb-2" />
                                <Skeleton className="h-10 w-[225px] mb-2" />
                                <Skeleton className="h-8 w-[200px] mb-2" />
                                <Skeleton className="h-8 w-[200px]" />
                            </>
                        ) : error.root ? (
                            <p>{error.root.message}</p>
                        ) : (
                            <ProfileForm
                                user={profileData}
                                axiosInstance={axiosInstance}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </PageTemplate>
    )
}

export default ProfilePage