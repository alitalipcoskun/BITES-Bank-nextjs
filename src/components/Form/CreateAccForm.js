import React, { useCallback, useEffect } from 'react'
import FormButton from './FormButton';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


// Account types for creation process.
const options = [
    { name: "Dollar", type: "dollar" },
    { name: "Turkish Lira (TL)", type: "tl" },
    { name: "Euro", type: "eu" }
];

const schema = yup.object({
    account_type: yup.string().required("Account type is required for creation process")
});



const CreateAccForm = (props) => {
    // Library allows control and give feedback to user precisely.
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
    const { onSubmit, errMsg } = props;

    const errCheck = useCallback(() => {
        setError(errMsg)
    }, [errMsg]);


    useEffect(() => {
        errCheck();
    }, [errCheck]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select className="w-72" {...register("account_type", { required: true })} placeholder="" disabled={isSubmitting}>
                {options.map((item, idx) => {
                    return <option value={item.value} key={idx}>{item.name}</option>
                })}
            </select>
            {errors.root && <p className="text-red-500">{errors.root.message}</p>}
            <FormButton className="ml-28" type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Create Account" />
        </form>
    )
}

export default CreateAccForm