import { yupResolver } from '@hookform/resolvers/yup';
import { Dropdown } from 'primereact/dropdown';
import React, { useContext, useEffect, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { transactionSchema } from './TransactionSchema';
import { Input } from '@/components/ui/input';
import FormButton from '../FormButton';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/components/AuthContext/AuthProvider';
import Cookies from "js-cookie";


const token = Cookies.get("jwt");
const ACCOUNT_LENGTH = 10;
const TransactionForm = (props) => {
    const { axiosInstance } = useContext(AuthContext);
    const [receiverAccOwner, setReceiverAccOwner] = useState(undefined);
    const { accounts, setAccountNo } = props;

    // Library allows control and give feedback to user precisely.
    const { register, handleSubmit, setValue, watch, getValues, setError, formState: { errors, isSubmitting }, clearErrors } = useForm({
        resolver: yupResolver(transactionSchema),
        defaultValues: {
            fromAcc: "",
            toAcc: "",
            amount: 0,
        }
    });

    const onSubmit = async (payload) => {
        try {
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';
            // Create an accountNo parameter and set as null at the beginning of the page.
            // If account is not selected, do not send request to the database.
            const response = await axiosInstance.post(
                '/api/v1/transaction/transfer-money',
                {
                    fromAcc: payload.fromAcc,
                    toAcc: payload.toAcc,
                    amount: payload.amount
                }
            );


        }
        catch (error) {
            setError("root",
                { message: error.response.data.message });
        }
    }

    const findOwner = useCallback(async () => {
        if (watch("toAcc").length == 10) {
            try {
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                axiosInstance.defaults.headers.post["Content-Type"] = 'application/json';

                const response = await axiosInstance.get(
                    '/api/v1/account/account-owner',
                    {
                        params: {
                            accountNo: getValues()["toAcc"]
                        }
                    }
                );
                setReceiverAccOwner(response.data);
                clearErrors("toAcc");
            } catch (error) {
                console.log(error.response.data.message);
                setError("toAcc", { message: error.response.data.message });
            }
        } else {
            setReceiverAccOwner(undefined);
        }
    }, [watch("toAcc")]);



    useEffect(() => {
        findOwner();
    }, [findOwner]);



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
                            onChange={(e) => {
                                setAccountNo(e.target.value);
                                setValue("fromAcc", e.target.value)
                            }}
                            value={watch("fromAcc")}
                        />
                    </div>
                    {/* Reserve space for the error message */}
                    <p className={`text-red-500 font-bold h-4 ${errors["fromAcc"] ? 'visible' : 'invisible'}`}>
                        {errors["fromAcc"]?.message || ""}
                    </p>
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
                        onChange={(e) => {
                            // For limiting the input with the length of account
                            if (e.target.value.length <= ACCOUNT_LENGTH) {
                                setValue("toAcc", e.target.value)
                            }

                        }}
                        value={watch("toAcc")}
                    />
                    {/* Fixed space for the error */}
                    <p className={`text-red-500 font-bold h-4 ${errors["toAcc"] ? 'visible' : 'invisible'}`}>
                        {errors["toAcc"]?.message || ""}
                    </p>
                    {<p className={`font-bold h-4 ${receiverAccOwner ? 'visible' : 'invisible'}`}>{receiverAccOwner || ""}</p>}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                <div className="flex-1">
                    <Label htmlFor="amount">Enter amount</Label>
                    <Input
                        inputid="amount"
                        disabled={isSubmitting}
                        className={`w-full h-12 border-2 ${errors["amount"] ? errorClass : ""}`}
                        onChange={(e) => setValue("amount", e.target.value)}
                        {...register("amount", { required: true })}
                        value={watch("amount")}
                    />
                    {/* Consistent error message space */}
                    <p className={`text-red-500 font-bold h-4 ${errors["amount"] ? 'visible' : 'invisible'}`}>
                        {errors["amount"]?.message || ""}
                    </p>
                </div>
            </div>
            <p className={`text-red-500 font-bold h-4 ${errors["root"] ? 'visible' : 'invisible'}`}>
                {errors["root"]?.message || ""}
            </p>
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