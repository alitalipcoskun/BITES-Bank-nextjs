import React, { useCallback, useEffect } from 'react'
import FormButton from '../FormButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAccSchema } from './CreateAccSchema';
import { accOptions } from './AccountOptions';








const CreateAccForm = (props) => {
    // Library allows control and give feedback to user precisely.
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(createAccSchema) });
    const { onSubmit } = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select className="w-72" {...register("account_type", { required: true })} placeholder="" disabled={isSubmitting}>
                {accOptions.map((item, idx) => {
                    return <option value={item.type} key={idx}>{item.name}</option>
                })}
            </select>
            {errors.root && <p className="text-red-500">{errors.root.message}</p>}
            <FormButton className="ml-28" type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Create Account" />
        </form>
    )
}

export default CreateAccForm