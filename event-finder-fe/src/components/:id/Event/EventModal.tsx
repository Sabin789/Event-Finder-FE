import { useEffect, useState } from "react";
import { Modal,Button, Dropdown,Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEvent, updateEvents, updatePicture } from "../../../redux/actions/actions";
import { Event } from "../../../redux/reducers/storeSlice";
import { RootState, useAppDispatch } from "../../../redux/store";

type EventEditProps = {
    handleClose: () => void;
    show: boolean;
    _id:string
  }

const EventModal = ({handleClose,show,_id}:EventEditProps) => {
    const[name,setName]=useState("")
    const [imageData, setImageData] = useState<File | null>(null);
    const[description,setDescription]=useState("")
    const[address,setAdress]=useState("")
    const [tags, settags] = useState<string[]>([]);
    const [limit,setLimit]=useState(Number)
    const [Private,setPrivate]=useState(false)

    const { id } = useParams<{ id: string }>()

    const events = useSelector((state: RootState) => state.events.events)
    const oneEvent = events.find((event: Event) => event._id===_id)

    useEffect(()=>{
        setName(oneEvent!.name)
         setDescription(oneEvent!.description)
         setAdress(oneEvent!.address)
         settags(oneEvent!.tags)
         setLimit(oneEvent!.limit as number)
         setPrivate(oneEvent!.Private)
       },[])
// useEffect(()=>{ dispatch(getEvent(id))},[dispatch])
    const handleSelect = (eventKey: string) => {
        const items = [...tags];
        if (!items.includes(eventKey)) {
          items.push(eventKey);
          settags(items);
        }
      }
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files && e.target.files[0];
        if (image) {
          setImageData(image);
        }
      }
  const dispatch=useAppDispatch()

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
          setLimit(7);
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


    const handleEdit = (id:string )=> {
        if (imageData) {
          dispatch(updateEvents(id,info));
          dispatch(updatePicture(id, imageData));
          handleClose()
        //   dispatch(getEvent(id))
        } else {
            dispatch(updateEvents(id,info));
            handleClose()
            // dispatch(getEvent(id))
        }
      };

    return ( <>
     <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <Form>
        <Form.Group>
  <Form.Label>Name</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Name"
    value={name}
    onChange={(val) => setName(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group>
  <Form.Label>Description</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Description"
    value={description}
    onChange={(val) => setDescription(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group>
  <Form.Label>Adress</Form.Label>
    <Form.Control 
    type="text" 
    value={address}
    placeholder="Adress"
    onChange={(val) => setAdress(val.currentTarget.value)} />
  </Form.Group>
  <Form.Group>
  <Form.Label>Limit</Form.Label>
    <Form.Control 
    type="number" 
    placeholder="Limit"
    value={limit}
    onChange={(val) => handleLimitChange(val.currentTarget.value)}/>
  </Form.Group>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Status
      </Dropdown.Toggle>
      <Dropdown.Menu>
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
          <Button  onClick={handleClose}>
            Close
          </Button>
          <Button onClick={()=>{handleEdit(_id)}}>Post Event</Button>
        </Modal.Footer>
      </Modal>
    </> );
}
 
export default EventModal;