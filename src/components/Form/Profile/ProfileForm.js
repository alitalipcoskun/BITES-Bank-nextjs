import React, {useState} from 'react'
import LabeledInput from '../LabeledInput'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileSchema } from './ProfileFormSchema';
import { profileFormLabels } from './ProfileFormLabels';
import FormButton from '../FormButton';
import Cookies from 'js-cookie'

import { useRouter } from 'next/navigation';







const ProfileForm = (props) => {

    const router = useRouter();

    const token= Cookies.get("jwt");
    const { user, axiosInstance } = props;

    const [userInformation, setUserInformation] = useState(user);

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, getValues } = useForm({ resolver: yupResolver(profileSchema) });

    const onSubmit =async (payload) => {
        try{
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
            console.log(payload);
            const response = await axiosInstance.post("/api/v1/user/change-password", {
                "currentPassword": payload.password,
                "newPassword": payload.newPassword
            })

            console.log(response);
        }catch(error){
            console.log(error);
        }
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


        </form>
    )
}

export default ProfileForm