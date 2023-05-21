
import { Container,Row,Col } from "react-bootstrap";
import Navbar from "../Navbar";
import Chats from "./Chats";
import Feed from "./Feed";
import GeneralChat from "./generalChat";
import Sidebar from "./Sidebar";
import {io} from "socket.io-client"
import { useEffect } from "react";
import Top from "./Top";
import Footer from "./Footer";
const Home = () => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });
  

  useEffect(()=>{
   socket.on("welcome", (welcomeMessage) => {
     console.log(welcomeMessage);
     socket.emit("setUser", {
       token: localStorage.getItem("accessToken"),
     });
  
     socket.on("disconnect", () => {
       console.log("Disconnected from socket");
     });
     return () => {
      socket.disconnect();
    };
  })},[])
  
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