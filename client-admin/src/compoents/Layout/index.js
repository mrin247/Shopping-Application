import React from 'react';
import Header from '../Header/index';



const Layout = (props) => {
   // ! Render Layout component
  return(
    <>
     <Header/>
     {props.children}
    </>
   )

 }

export default Layout;