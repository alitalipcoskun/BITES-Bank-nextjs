
import SignUpForm from '@/components/Form/SignUpForm'
import PageContainer from '@/components/PageComponents/PageContainer'
import React from 'react'

const SignUpPage = () => {
  return (
    <PageContainer className="flex-col items-center h-screen w-screen">
        <SignUpForm className = "m-auto"></SignUpForm>
    </PageContainer>
  )
}

export default SignUpPage