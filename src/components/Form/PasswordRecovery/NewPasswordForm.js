import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import FormButton from '../FormButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/components/AuthContext/AuthProvider';
import { passwordSchema } from './Schema';


const NewPasswordForm = (props) => {
    const { axiosInstance } = useAuthContext();
    const { passwordDialogOpen, setPasswordDialogOpen, mail, code, setError,  } = props;

    const { register, isSubmitting, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(passwordSchema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post("/api/v1/auth/password-change", {
                code: code,
                mail: mail,
                newPassword: data.password
            })
            setPasswordDialogOpen(false);
            showNotification("Password changed successfully", "success");
            
        } catch (error) {
            setError("root", {
                message:  "An error occured. Try again."
            });
            showNotification("Password change failed", "error");
        }
    }

    return (
        <Dialog open={passwordDialogOpen}
            onOpenChange={setPasswordDialogOpen}
            closeOnEscapeKeyDown={false}
            closeOnClickOutside={false}
            closeOnOverlayClick={false}
            closeOnBackdropClick={false}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set New Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <Input
                        type="password"
                        placeholder="New Password"
                        {...register('password')}
                        className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    <Input
                        type="password"
                        placeholder="Confirm New Password"
                        {...register('passwordAgain')}
                        className={errors.passwordAgain ? 'border-red-500' : ''}
                    />
                    {errors.passwordAgain && <p className="text-red-500">{errors.passwordAgain.message}</p>}
                    <FormButton type="submit" isLoading={isSubmitting} loadingState="Submitting..." defaultState="Submit">Submit</FormButton>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NewPasswordForm