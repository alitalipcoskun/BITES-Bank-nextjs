import React, { useState } from 'react'
import LabeledInput from '../LabeledInput'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileSchema } from './ProfileFormSchema';
import { profileFormLabels } from './ProfileFormLabels';
import FormButton from '../FormButton';
import Cookies from 'js-cookie'
import { Spinner } from '@/components/ui/spinner'

const ProfileForm = (props) => {
    const token = Cookies.get("jwt");
    const { user, axiosInstance, onSuccess, onError } = props;

    const [userInformation, setUserInformation] = useState(user);

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, getValues, reset } = useForm({ resolver: yupResolver(profileSchema) });

    const onSubmit = async (payload) => {
        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
            const response = await axiosInstance.post("/api/v1/user/change-password", {
                "currentPassword": payload.password,
                "newPassword": payload.newPassword
            });

            console.log(response);
            if (response.status === 200) {
                onSuccess("Password changed successfully");
                reset({
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                throw new Error("Failed to change password");
            }
        } catch (error) {
            console.log(error);
            setError("root", 
                {message: error.response?.data?.message || "Check your current password"}
            );
            onError(error.response?.data?.message || "Failed to change password");
        }
    }

    if (isSubmitting) {
        return <Spinner />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                profileFormLabels.map((item, idx) => {
                    if (item.isActive) {
                        return <LabeledInput
                            key={idx}
                            type={item.type}
                            label={item.label}
                            placeHolder={item.placeHolder}
                            register={register}
                            errors={errors}
                            isSubmitting={isSubmitting}
                            name={item["dbKey"]}
                        />;
                    }
                    else {
                        return <LabeledInput
                            key={idx}
                            type={item.type}
                            label={item.label}
                            placeHolder={item.placeHolder}
                            register={register}
                            errors={errors}
                            isSubmitting={isSubmitting}
                            name={item["dbKey"]}
                            value={userInformation[`${item.dbKey}`]}
                            disabled
                        />;
                    }
                })
            }
            <FormButton
                type="submit"
                isSubmitting={isSubmitting}
                loadingState="Loading"
                defaultState="Change Password"
            />
            {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        </form>
    )
}

export default ProfileForm