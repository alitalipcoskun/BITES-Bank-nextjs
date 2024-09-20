import React, { useState, useRef } from 'react'
import { useAuthContext } from '@/components/AuthContext/AuthProvider';
import { useForm } from 'react-hook-form';
import LabeledInput from '../LabeledInput';
import UIImage from '@/components/Image';
import FormButton from '../FormButton';
import PageContainer from '@/components/DefaultPage/PageContainer';
import { Spinner } from '@/components/ui/spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import { mailSchema } from './Schema';
import { mailLabels } from './Labels';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toast } from 'primereact/toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import NewPasswordForm from './NewPasswordForm';
import Link from 'next/link';
import OTPForm from './OTPForm';

const PasswordRecoveryRequest = (props) => {
    const { axiosInstance } = useAuthContext();
    const toast = useRef(null);

    const [jwt, setJwt] = useState(Cookies.get("jwt") !== undefined);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [recoveryCode, setRecoveryCode] = useState("");
    const [mail, setMail] = useState("");
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [code, setCode] = useState("");
    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, clearErrors } = useForm({
        resolver: yupResolver(mailSchema)
    });

    const router = useRouter();

    if (jwt) {
        router.push("/");
    }

    const showNotification = (severity, summary, detail) => {
        if (toast.current) {
            toast.current.show({ severity, summary, detail, life: 3000 });
        }
    }

    const onSubmit = async (payload) => {
        try {
            console.log(payload.mail);
            const response = await axiosInstance.post("/api/v1/auth/forget-password", {
                mail: payload.mail
            });

            showNotification("info", "About creating token", response.data.message || "Token created successfully");
            setDialogOpen(true);
            setMail(payload.mail);

        } catch (error) {
            console.log(error);
            showNotification("error", "Error", "An error occurred while processing your request.");
        }
    }

    const onCodeSubmit = async () => {

        const response = await axiosInstance.post("/api/v1/auth/recover-password", {
            token: recoveryCode,
            mail: mail
        });
        console.log(response);

        if (response.status === 200) {

            if (response.data === "True") {
                setDialogOpen(false);
                console.log(response);
                setCode(recoveryCode);
                setPasswordDialogOpen(true);
            }
            else {
                console.log("Entered!");
                showNotification("error", "Error", "An error occurred while processing your request.");
                throw new Error("Invalid code");
            }
        }

    }

    return (
        <PageContainer>
            <Toast ref={toast} />
            <Card className={`display-flex flex-col h-fit w-[80vw] sm:w-fit shadow-xl justify-center ${props.className}`}>
                <CardHeader>
                    <CardTitle className="container">
                        Forget Password
                    </CardTitle>
                    <CardDescription className="container">
                        To recover your password, please enter your mail
                    </CardDescription>
                </CardHeader>
                <CardContent className="display-flex flex-col h-full sm:min-h-96 items-center" >
                    {isSubmitting ? <Spinner /> :
                        (<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center text-left" >
                            <UIImage src={"/bites_logo.jpg"} className={"mb-4"} />
                            {mailLabels.map((label, idx) => (
                                <LabeledInput
                                    key={idx}
                                    label={label.label}
                                    type={label.type}
                                    ruleSet={label.ruleSet}
                                    name={label.name}
                                    register={register}
                                    placeholder={label.placeholder}
                                    errors={errors}
                                    isSubmitting={isSubmitting}
                                />
                            ))}
                            <p>You can log in from <Link href="/login" className="text-blue-500 underline">here.</Link></p>
                            <FormButton type="submit" isSubmitting={isSubmitting} loadingState="Loading" defaultState="Submit" />
                            {errors.root && <p className={`text-red-500 ${errors.root ? 'visible' : 'invisible'}`}>{errors.root.message}</p>}
                        </form>)
                    }
                    <Dialog
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                        onInteractOutside={() => { }}> {/*For avoiding closing dialog on interaction with outside*/}
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter 6-digit OTP Code</DialogTitle>
                            </DialogHeader>
                            <OTPForm
                                recoveryCode={recoveryCode}
                                setRecoveryCode={setRecoveryCode}
                                maxLength={6}
                                onCodeSubmit={onCodeSubmit}
                            />
                        </DialogContent>
                    </Dialog>
                    <NewPasswordForm
                        passwordDialogOpen={passwordDialogOpen}
                        setPasswordDialogOpen={setPasswordDialogOpen}
                        mail={mail}
                        code={recoveryCode}
                        showNotification={showNotification} />
                </CardContent>
            </Card>
        </PageContainer >
    );
}

export default PasswordRecoveryRequest
