import SignUpForm from '@/components/Form/Signup/SignUpForm'
import PageContainer from '@/components/DefaultPage/PageContainer'
import React from 'react'

const SignUpPage = () => {
  return (
    <PageContainer className="flex w-screen items-center justify-center min-h-screen">
        <SignUpForm className="w-fit" />
    </PageContainer>
  )
}

export default SignUpPage