
import LoginForm from '@/components/Form/Login/LoginForm'
import PageContainer from '@/components/DefaultPage/PageContainer'
import React from 'react'

const Page = () => {
  return (
    <PageContainer  className="flex-col items-center h-screen w-screen ">
        <LoginForm className= "m-auto"></LoginForm>
    </PageContainer>
  )
}

export default Page