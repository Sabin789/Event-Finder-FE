
import { Container,Row } from "react-bootstrap";
import Navbar from "../Navbar";
import Feed from "./Feed";



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