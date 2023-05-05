
import { Container,Row,Col } from "react-bootstrap";
import Navbar from "../Navbar";
import Feed from "./Feed";
import Sidebar from "./Sidebar";

const Home = () => {
    return (
    <>
      <Navbar/>
      
      <Container>
       <Row>
         <Col lg="4">
         <Sidebar/>
         </Col>
         <Col lg="4">
          <Feed/>
         </Col>
       </Row>
      </Container>
    </> 
    );
}
 
export default Home;