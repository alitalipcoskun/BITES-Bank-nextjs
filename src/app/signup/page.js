
import SignUpForm from '@/components/Form/Signup/SignUpForm'
import PageContainer from '@/components/DefaultPage/PageContainer'
import React from 'react'
import PageTemplate from '@/components/DefaultPage/PageTemplate'

const SignUpPage = () => {
  return (
    <PageContainer className="flex-col items-center h-screen w-screen">
        <SignUpForm className = "m-auto"></SignUpForm>
    </PageContainer>
  )
}

export default SignUpPage