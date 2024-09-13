import React from 'react'

const PageContainer = (props) => {
  return (
    <div className= {`flex flex-row w-full h-screen justify-center ${props.className}`}>{props.children}</div>
  )
}

export default PageContainer