
import React from "react";
import { Container,Row,Col } from "react-bootstrap";
import Navbar from "../Navbar";
import Chats from "./Chats";
import Feed from "./Feed";
import GeneralChat from "./generalChat";
import Sidebar from "./Sidebar";

import { useEffect } from "react";
import Top from "./Top";
import Footer from "./Footer";
const Home = () => {

  
    return (
    <>
      <Navbar/>
      
      <Container>

       <Row>
        <Top/>
         <Feed/>

       </Row>
      </Container>
     <Footer/>
    </> 
    );
}
 
export default Home;