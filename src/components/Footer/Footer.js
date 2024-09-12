
import React from 'react';
import Signature from './Signature';





const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 mt-8">

      <div className="w-full md:w-3/4 flex justify-center">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.3598530127747!2d32.80686022376542!3d39.91096248560836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f4dadc42597%3A0xb3c3c90724617ca3!2sNext%20Level%20Loft%20Ofis!5e0!3m2!1sen!2str!4v1725439096978!5m2!1sen!2str" style={{ border: 0, width:"100%", height:"100%" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"> </iframe>
      </div>
      <Signature></Signature>
    </footer>
  );
};

export default Footer;
