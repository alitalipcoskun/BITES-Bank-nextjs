import { yupResolver } from '@hookform/resolvers/yup';
import { Dropdown } from 'primereact/dropdown';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { transactionSchema } from './TransactionSchema';
import { Input } from '@/components/ui/input';
import FormButton from '../FormButton';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/components/AuthContext/AuthProvider';
import Cookies from "js-cookie";

const token = Cookies.get("jwt");

const TransactionForm = (props) => {
    const {axiosInstance} = useContext(AuthContext);

    const { accounts } = props;

    // Library allows control and give feedback to user precisely.
    const { register, handleSubmit, setValue, watch, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(transactionSchema), defaultValues: {
            fromAcc: "",
            toAcc: "",
            amount: 0,
        }
    });

    const onSubmit = async (payload) => {
        console.log(payload)
        try {
            // Create an accountNo parameter and set as null at the beginning of the page.
            // If account is not selected, do not send request to the database.
            const response = await axiosInstance.post(
                '/api/v1/transaction/list-transactions',
                {
                    fromAcc: payload.fromAcc,
                    toAcc: payload.toAcc,
                    amount: payload.amount
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    const changeHandler = (field, value) => {
        setValue(field, value);
    }

    const errorClass = "border border-red-500 color-red-500 bg-red-200"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto text-left space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                <div className="flex-1">
                    <Label htmlFor="fromAcc">Select an Account</Label>
                    <div className="relative">
                        <Dropdown
                            inputid="fromAcc"
                            options={accounts}
                            {...register("fromAcc", { required: true })}
                            className={`w-full appearance-none px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none ${errors["fromAcc"] ? errorClass : ""}`}
                            onChange={(e) => setValue("fromAcc", e.target.value)}
                            value={watch("fromAcc")}
                        />
                    </div>
                    {errors["fromAcc"] && <p className="text-red-500 font-bold">{errors["fromAcc"].message}</p>}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                <div className="flex-1">
                    <Label htmlFor="toAcc">Enter receiver account</Label>
                    <Input
                        inputid="toAcc"
                        disabled={isSubmitting}
                        className={`w-full ${errors["toAcc"] ? errorClass : ""}`}
                        {...register("toAcc", { required: true })}
                        onChange={(e) => setValue("toAcc", e.target.value)}
                        value={watch("toAcc")}
                    />
                    {errors["toAcc"] && <p className="text-red-500 font-bold">{errors["toAcc"].message}</p>}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                <div className="flex-1">
                    <Label htmlFor="amount">Enter amount</Label>
                    <Input
                        inputid="amount"
                        disabled={isSubmitting}
                        className={`w-full ${errors["amount"] ? errorClass : "mb-4 h-12 border-2"}`}
                        onChange={(e) => setValue("amount", e.target.value)}
                        {...register("amount", { required: true })}
                        value={watch("amount")}
                    />
                    {errors["amount"] && <p className="text-red-500 font-bold">{errors["amount"].message}</p>}
                </div>
            </div>

            <div className="text-center">
                <FormButton
                    type="submit"
                    isSubmitting={isSubmitting}
                    loadingState="Loading"
                    defaultState="Send Money"
                    className="w-full md:w-auto"
                />
            </div>
        </form>
    );

}

export default TransactionForm