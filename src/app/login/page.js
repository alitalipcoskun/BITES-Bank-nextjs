import LoginForm from '@/components/Form/LoginForm'
import PageContainer from '@/components/PageComponents/PageContainer'
import PageTemplate from '@/components/PageComponents/PageTemplate'
import React from 'react'

const Page = () => {
  return (
    <PageContainer  className="flex-col items-center h-screen w-screen ">
        <LoginForm className= "m-auto"></LoginForm>
    </PageContainer>
  )
}

export default Page