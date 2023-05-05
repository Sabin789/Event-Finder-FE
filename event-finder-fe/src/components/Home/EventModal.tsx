
import { useState } from "react";
import { Modal,Button, Dropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { addEvent, updatePicture } from "../../redux/actions/actions";
import { useAppDispatch } from "../../redux/store";

type EventEditProps = {
    handleClose2: () => void;
    show2: boolean;
  }

const EventModal = ({handleClose2,show2}:EventEditProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files && e.target.files[0];
        if (image) {
          setImageData(image);
        }
      }
      const dispatch = useAppDispatch();

    const[name,setName]=useState("")
    const [imageData, setImageData] = useState<File | null>(null);
    const[description,setDescription]=useState("")
    const[address,setAdress]=useState("")
    const [tags, settags] = useState<string[]>([]);
    const [limit,setLimit]=useState(Number)
    const [Private,setPrivate]=useState(false)

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
        Private
    }

    const handleEdit=()=>{
        if(imageData){
            dispatch(addEvent(info))
            // dispatch(updatePicture(id,imageData))
        }else{
            dispatch(addEvent(info))
        console.log(info)
        }
       }
    return ( <>
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
    onChange={(val) => setName(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group>
  <Form.Label>Description</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Description"
    onChange={(val) => setDescription(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group>
  <Form.Label>Adress</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Adress"
    onChange={(val) => setAdress(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group>
  <Form.Label>Limit</Form.Label>
    <Form.Control 
    type="number" 
    placeholder="Limit"
    onChange={(val) => handleLimitChange(val.currentTarget.value)}/>
  </Form.Group>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Status
      </Dropdown.Toggle>
      <Dropdown.Menu >
      <Dropdown.Item onClick={() => setPrivate(true)}>True</Dropdown.Item>
    <Dropdown.Item onClick={() => setPrivate(false)}>False</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Form>
  <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {tags.length === 0
          ? "Select items"
          : tags.join(", ")}
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
          
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={handleClose2}>
            Close
          </Button>
          <Button onClick={()=>{handleEdit()}}>Post Event</Button>
        </Modal.Footer>
      </Modal>
    </> );
}
 
export default EventModal;