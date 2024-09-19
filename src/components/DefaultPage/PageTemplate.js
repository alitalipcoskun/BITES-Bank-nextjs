import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import SimpleChatBot from '../Chatbot/ChatBot'

const PageTemplate = (props) => {




  return (
    <>
      <Navbar></Navbar>
      {props.children}
      <SimpleChatBot />
      <Footer></Footer>
    </>
  )
}

export default PageTemplate