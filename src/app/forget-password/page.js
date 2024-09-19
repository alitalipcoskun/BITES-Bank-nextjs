"use client"
import PageContainer from '@/components/DefaultPage/PageContainer'
import PageTemplate from '@/components/DefaultPage/PageTemplate'
import PasswordRecoveryRequest from '@/components/Form/PasswordRecovery/Form'
import React from 'react'

const PasswordRecovery = (props) => {
  return (
    <PageContainer  className="flex-col items-center h-screen w-screen">
      <PasswordRecoveryRequest className="m-auto" />
    </PageContainer>
  )
}

export default PasswordRecovery