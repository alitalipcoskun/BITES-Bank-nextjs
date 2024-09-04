import React from 'react'
import Navbar from '../NavbarFiles/Navbar'
import Footer from '../FooterFiles/Footer'

const PageTemplate = (props) => {
    //Kullanıcı giriş yapmış mı yapmamış mı diye kontrol eden mekanizmayı buraya koyabilirim.
    // Giriş yaptıysa ona göre navbar, yapmadıysa ona göre navbar.
  return (
    <>
    <Navbar></Navbar>
    {props.children}
    <Footer></Footer>
    </>
  )
}

export default PageTemplate