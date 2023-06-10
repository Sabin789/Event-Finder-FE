
import { FormEvent, useEffect, useState } from "react";

import {Form,Button,Dropdown  } from "react-bootstrap";
import "../../Css/register.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
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

    useEffect(()=>{

    })

    const handleSubmit = async (e: FormEvent) => {
      const url=`${process.env.REACT_APP_BE_PROD}/Users`
        try {
          e.preventDefault();
     
          const response = await axios.post(url,{
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
          console.log(url)
        }
      };
      const { isLoaded } = useJsApiLoader({
        googleMapsApiKey:process.env.REACT_APP_API_KEY as string,
        libraries:["places"]
      })
      const handleAddressSelect = (address: string) => {
        setAdress(address);
      }
      
    return ( 
      <div className="register-body">
               <h2>Please fill in the required fileds</h2>
      <div className="section">

    <div className="form-box">
   
    <Form onSubmit={handleSubmit}>
    <Form.Group className="inputbox">

    <input 
    type="text" 
    placeholder="Name"
    onChange={(val) => setName(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group controlId="formBasicEmail" className="inputbox">

    <input
     type="email" 
     placeholder="Enter email" 
     onChange={(val) => setEmail(val.currentTarget.value)}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword" className="inputbox">

    <input 
    type="password" 
    placeholder="Password"
    onChange={(val) => setPassword(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group className="inputbox">

    <input 
    type="text" 
    placeholder="Bio"
    onChange={(val) => setBio(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group className="inputbox">

{isLoaded&&<Autocomplete
    onLoad={(autocomplete) => {
      autocomplete.addListener("place_changed", () => {
        const selectedPlace = autocomplete.getPlace();
        if (selectedPlace && selectedPlace.formatted_address) {
          handleAddressSelect(selectedPlace.formatted_address);
        }
      });
    }}
  >
    <input
      type="text"
      placeholder="Address"
      onChange={(val) => setAdress(val.currentTarget.value)}
    />
  </Autocomplete>}

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
  <Button variant="success" type="submit" className="button">
    Register
  </Button>
</Form>
    </div>
    </div>
    </div>
     );
}
 
export default RegistrationPage;