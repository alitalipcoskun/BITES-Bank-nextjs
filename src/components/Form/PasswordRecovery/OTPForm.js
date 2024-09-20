import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import React from 'react'
import { useForm } from 'react-hook-form'

const OTPForm = (props) => {
    const { recoveryCode, setRecoveryCode, maxLength, onCodeSubmit } = props;
    const { handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await onCodeSubmit(data);
        } catch (err) {
            setError('otp', {
                type: 'manual',
                message: err.message || 'An error occurred. Please try again.'
            });
        }
    };

    return (
        <form className="flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
            <InputOTP
                value={recoveryCode}
                onChange={setRecoveryCode}
                maxLength={maxLength}
                onComplete={onSubmit}
            >
                <InputOTPGroup className="flex gap-2">
                    {[...Array(maxLength)].map((_, index) => (
                        <InputOTPSlot 
                            key={index} 
                            index={index} 
                            className={`border p-2 text-center ${errors.otp ? 'border-red-500' : ''}`} 
                        />
                    ))}
                </InputOTPGroup>
            </InputOTP>
            {errors.otp && <p className="text-red-500 mt-2">{errors.otp.message}</p>}
        </form>
    );
}

export default OTPForm