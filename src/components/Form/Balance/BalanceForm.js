import { Label } from '@/components/ui/label';
import { Dropdown } from 'primereact/dropdown';
import React, { useContext } from 'react'
import { balanceSchema } from './BalanceSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormButton from '../FormButton';
import LabeledInput from '../LabeledInput';
import Cookies from 'js-cookie';
import { AuthContext } from '@/components/AuthContext/AuthProvider';

const errorClass = "border border-red-500 bg-red-100 text-red-900 placeholder-red-500 p-2 rounded"
const BalanceForm = (props, setBalanceDialog) => {
    const { axiosInstance } = useContext(AuthContext);
    const { accounts } = props;

    const token = Cookies.get("jwt");

    const { register, handleSubmit, setError, setValue, watch, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(balanceSchema) });


    const changeHandler = (target, value) => {
        setValue(target, value);
    }

    const onSubmit = async (payload) => {
        try {
            console.log(payload);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
            const response = await axiosInstance.post("/api/v1/account/add-balance", {
                "accountNo": payload.accountNo,
                "cardNumber": payload.cardNumber.toString(),
                "expirationDate": payload.expirationDate,
                "balanceChange": parseFloat(payload.amount)
            });
            console.log(response);

        } catch (error) {
            console.log(error);
            if(error.status == 406){
                setError("cardNumber",
                    {message: error.response.data.message}
                )
            }
            setError("root", 
                {message: error.response.data.message}
            )
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="accountNo">
                Select an Account
            </Label>

            <Dropdown
                inputid="accoutNo"
                options={accounts}
                {...register("accountNo", { required: true })}
                className={`w-full appearance-none px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none ${errors["accountNo"] ? errorClass : ""}`}
                onChange={(e) => changeHandler("accountNo", e.target.value)}
                value={watch("accountNo")}
            />
            <div className='mt-4'>
                <LabeledInput
                    type={"number"}
                    label={"Enter the card number:"}
                    register={register}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    name={"cardNumber"}
                    value={watch("cardNumber")}
                />
            </div>
            <div className='mt-4'>
                <LabeledInput
                    type={"text"}
                    label={"Enter expiration date of the card."}
                    register={register}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    name={"expirationDate"}
                    value={watch("expirationDate")}
                />
            </div>
            <div className='mt-4'>
                <LabeledInput
                    type={"number"}
                    label={"Enter money amount:"}
                    register={register}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    name={"amount"}
                    value={watch("amount")}
                />
            </div>


            <FormButton
                type="submit"
                isSubmitting={isSubmitting}
                loadingState="Loading"
                defaultState="Add"
            />
        </form>
    )
}

export default BalanceForm