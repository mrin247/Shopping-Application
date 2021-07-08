import React from 'react'
import Layout from '../../compoents/Layout';
import { Jumbotron } from 'react-bootstrap';

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
   <Layout>
       <Jumbotron style={{margin:'5rem', background: 'white'}} className="text-center">
           <h1>Hello to Admin Dashboard</h1>
           <p>tempor qui enim magna dolor minim cupidatat ad dolore magna commodo Ad exercitation tempor non velit Enim consectetur do sit ea duis anim cupidatat occaecat Reprehenderit cupidatat laboris cupidatat magna aliquip duis Et officia in culpa ut sunt amet eu fugiat officia laboris est nulla fugiat et Mollit Lorem voluptate officia cupidatat consequat consectetur quis laboris </p>
       </Jumbotron>
   </Layout>
   )

 }

export default Home;