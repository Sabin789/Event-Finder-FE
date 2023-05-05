import { FormEvent, useEffect, useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import { Form,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import "../../Css/login.css"
const LoginPage = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
const signup=()=>{
    navigate("/register")
}
    const handleSubmit = async (e: FormEvent) => {
        try {
          e.preventDefault();
          await axios
            .post("http://localhost:3001/Users/login", {
              email,
              password,
            })
            .then((response) => {
              const { data } = response as AxiosResponse;
              localStorage.setItem("accessToken", data.accessToken);
              navigate("/home");
            })
            .catch((err: Error | AxiosError) => {
              if (axios.isAxiosError(err)) {
                console.log(err.config);
                console.log(err.request);
                console.log(err.response);
              } else {
                console.log(err.message);
              }
            });
        } catch (error) {
          console.log(error);
        }
      };
  useEffect(()=>{
    localStorage.clear();
  },[])
    return (
    <>
      <Container>
        <Row>
        <Col col="9" md="6">
          </Col>
          <Col md={5}>
          <Form onSubmit={handleSubmit} className="loginForm">
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control
     type="email" 
     placeholder="Enter email" 
     className="input"
     onChange={(val) => setEmail(val.currentTarget.value)}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control 
    type="password" 
    placeholder="Password"
    className="input"
    onChange={(val) => setPassword(val.currentTarget.value)} />
  </Form.Group>
  <div>
  <Button variant="danger" type="submit" className="button mt-4">
    Login
  </Button>
  </div>
   <br />
  <Button variant="primary" type="submit" className="button mb-4"
   onClick={()=>{signup()}}>
    Sign Up
  </Button>

</Form>
          </Col>
        </Row>
     </Container>
    </>
     );
}
 
export default LoginPage;