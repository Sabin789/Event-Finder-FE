
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
            .post(process.env.REACT_APP_BE_PROD+"/Users/login", {
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
    <div className="login-body">
      <Container className="section">
        <Row className="form-box">
        
          <Col className="form-value">
          <Form onSubmit={handleSubmit} className="loginForm">
            <h2 >Login</h2>
            <div className="input-container">
  <Form.Group controlId="formBasicEmail" className="inputbox">
    <input
     type="email" 
     placeholder="Enter email" 
     className="inputbox"
     onChange={(val) => setEmail(val.currentTarget.value)}/>
  </Form.Group>
  </div>
  <div className="input-container">
  <Form.Group controlId="formBasicPassword" className="inputbox">
    <input 
    type="password" 
    placeholder="Password"
    className="inputbox"
    onChange={(val) => setPassword(val.currentTarget.value)} />
  </Form.Group>
  </div>
  <div>
  <Button type="submit" className="button">
    Login
  </Button>
  </div>
   <br />

  <div className="register">
   <p>Don't have a account yet? <a onClick={()=>{signup()}} className="link">Register</a></p>
  </div>

</Form>
          </Col>
        </Row>
     </Container>
    </div>
     );
}
 
export default LoginPage;