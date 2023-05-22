
import React from "react";
import { Event } from "../../redux/reducers/storeSlice";
import { useState } from "react";
import { Modal,Button, Dropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { addEvent, getCurrentUserEvents, updatePicture } from "../../redux/actions/actions";
import { useAppDispatch } from "../../redux/store";
import "../../Css/eventModal1.css"
import {useJsApiLoader,Autocomplete, LoadScript} from "@react-google-maps/api"

type EventEditProps = {
    handleClose2: () => void;
    show2: boolean;
  }
  declare global {
    interface Window {
      google: any;
    }
  }

const EventModal = ({handleClose2,show2}:EventEditProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files && e.target.files[0];
        if (image) {
          setImageData(image);
        }
      }
      const dispatch = useAppDispatch();
      const [mapsLoaded, setMapsLoaded] = useState(false)
    const[name,setName]=useState("")
    const [imageData, setImageData] = useState<File | null>(null);
    const[description,setDescription]=useState("")
    const[address,setAdress]=useState("")
    const [tags, settags] = useState<string[]>([]);
    const [limit,setLimit]=useState(Number)
    const [Private,setPrivate]=useState(false)
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")
    const handleSelect = (eventKey: string) => {
        const items = [...tags];
        if (!items.includes(eventKey)) {
          items.push(eventKey);
          settags(items);
        }
      }
      
    
   


  const handleDeselect = (eventKey: string) => {
      const items = [...tags];
      const index = items.indexOf(eventKey);
      if (index !== -1) {
        items.splice(index, 1);
        settags(items);
      }
    };


    const handleLimitChange = (val: string) => {
        const num = parseInt(val);
        if (!isNaN(num)) {
          setLimit(num);
        } else {
          setLimit(7); // or some other default value
        }
      }

    const info={
        name,
        imageData,
        description,
        address,
        tags,
        limit,
        Private,
        date,
        time
    }
    const handleAddressSelect = (address: string) => {
        setAdress(address);
      }
    const handlePost = async () => {
        if (imageData) {
   
          const eventResponse = await dispatch(addEvent(info));
           const eventId=eventResponse._id
          dispatch(updatePicture(eventId, imageData));

          handleClose2();
          dispatch(getCurrentUserEvents());
          console.log(info)
        } else {
          dispatch(addEvent(info));
          handleClose2();
          dispatch(getCurrentUserEvents());
          console.log(info)
        }
      }

    //   const { isLoaded } = useJsApiLoader({
    //     googleMapsApiKey:process.env.REACT_APP_API_KEY as string,
    //     libraries:["places"]
    //   });
      
  
    return (    
  
    <>
<Modal 
  show={show2}
  onHide={handleClose2}
  backdrop="static"
  keyboard={false}
>
  <Modal.Header closeButton>
    <Modal.Title>Add Event</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Name"
          onChange={(val) => setName(val.currentTarget.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Description"
          onChange={(val) => setDescription(val.currentTarget.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
       
           <LoadScript   googleMapsApiKey={process.env.REACT_APP_API_KEY as string}
        libraries={["places"]}>
       <Autocomplete className="autocomplete-event"
                 onLoad={(autocomplete) => {
                  autocomplete.addListener("place_changed", () => {
                    console.log("hello")
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
                </Autocomplete>
</LoadScript>
      </Form.Group>
      <Form.Group>
        <Form.Label>Limit</Form.Label>
        <Form.Control 
          type="number" 
          placeholder="Limit"
          onChange={(val) => handleLimitChange(val.currentTarget.value)}
        />
      </Form.Group>
      <Form.Group>
      <Form.Label>Date</Form.Label>
      <Form.Control
                placeholder="Date"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="put-experience-startdate"
                type="date"
                onChange={(val) => setDate(val.currentTarget.value)}
              />
      </Form.Group>
      <Form.Label>Time</Form.Label>
      <input 
      type="time"
      onChange={(val) => setTime(val.currentTarget.value)} />
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {tags.length === 0 ? "Select items" : tags.join(", ")}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Form>
            <Form.Check
              type="checkbox"
              label="Sports"
              value="Sports"
              checked={tags.includes("Sports")}
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
              checked={tags.includes("Music")}
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
              checked={tags.includes("Travel")}
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
      <input type="file" onChange={handleChange} />
    </Form>
   
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleClose2}>Close</Button>
    <Button onClick={handlePost}>Post Event</Button>
  </Modal.Footer>
</Modal>

    </> 
);
}

export default EventModal;