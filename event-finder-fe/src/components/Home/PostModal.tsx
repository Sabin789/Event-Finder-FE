import { useState } from "react";
import { Modal,Button,Form,Dropdown } from "react-bootstrap";
import { addPosts } from "../../redux/actions/actions";
import { useAppDispatch } from "../../redux/store";

type PostEditProps = {
    handleClose: () => void;
    show: boolean;
  }

const PostModal = ({handleClose,show}:PostEditProps) => {

    const [text,setText]=useState(String)
    const [tags, settags] = useState<string[]>([]);

const dispatch=useAppDispatch()

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

const info={ text, tags,}

 const handleAdd=()=>{
     if(ImageData){
        dispatch(addPosts(info))
     }else{
        dispatch(addPosts(info))
     }
 }

    return ( <>
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <Form.Group>
  <Form.Label>Text</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Adress"
    onChange={(val) => setText(val.currentTarget.value)} />
  </Form.Group>
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
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={handleClose}>
            Close
          </Button>
          <Button onClick={()=>{handleAdd()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </> );
}
 
export default PostModal;