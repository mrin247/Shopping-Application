import React from 'react';
import Header from '../Header/index';



const Layout = (props) => {
  return(
    <>
     <Header/>
     {props.children}
    </>
   )

 }

export default Layout;