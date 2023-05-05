import { FormEvent, useState } from "react";

import {Form,Button,Dropdown  } from "react-bootstrap";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegistrationPage = () => {
    const[name,setName]=useState("")
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const[bio,setBio]=useState("")
    const[address,setAdress]=useState("")
    const navigate = useNavigate();
    const [interestedIn, setinterestedIn] = useState<string[]>([]);

      
        const handleSelect = (eventKey: string) => {
          const items = [...interestedIn];
          if (!items.includes(eventKey)) {
            items.push(eventKey);
            setinterestedIn(items);
          }
        }

    

    const handleDeselect = (eventKey: string) => {
        const items = [...interestedIn];
        const index = items.indexOf(eventKey);
        if (index !== -1) {
          items.splice(index, 1);
          setinterestedIn(items);
        }
      };

    

    const handleSubmit = async (e: FormEvent) => {
        try {
          e.preventDefault();
          const response = await axios.post("http://localhost:3001/Users", {
            name,
            email,
            password,
            interestedIn,
            bio,
            address
          });
          console.log(response);
          navigate("/"); 
        } catch (error) {
          console.log(error);
        }
      };


    return ( 
    <>
    <h1>Please fill in the required fileds</h1>
    <Form onSubmit={handleSubmit}>
    <Form.Group>
  <Form.Label>Name</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Name"
    onChange={(val) => setName(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control
     type="email" 
     placeholder="Enter email" 
     onChange={(val) => setEmail(val.currentTarget.value)}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control 
    type="password" 
    placeholder="Password"
    onChange={(val) => setPassword(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group>
  <Form.Label>Bio</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Bio"
    onChange={(val) => setBio(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group>
  <Form.Label>Adress</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Adress"
    onChange={(val) => setAdress(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group>
  <Form.Label>Things you are interested in</Form.Label>
  <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {interestedIn.length === 0
          ? "Select items"
          : interestedIn.join(", ")}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form>
          <Form.Check
            type="checkbox"
            label="Sports"
            value="Sports"
            checked={interestedIn.includes("Sports")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                handleSelect("Sports");
              } else {
                handleDeselect("Sports");
              }
            }}
          />

          <Form.Check
            type="checkbox"
            label="Music"
            value="Music"
            checked={interestedIn.includes("Music")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                handleSelect("Music");
              } else {
                handleDeselect("Music");
              }
            }}
          />

          <Form.Check
            type="checkbox"
            label="Travel"
            value="Travel"
            checked={interestedIn.includes("Travel")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                handleSelect("Travel");
              } else {
                handleDeselect("Travel");
              }
            }}
          />
        </Form>
      </Dropdown.Menu>
    </Dropdown>

  </Form.Group>
  <Button variant="primary" type="submit">
    Register
  </Button>
</Form>
    </>
     );
}
 
export default RegistrationPage;