
import { useEffect, useState } from "react";
import { Modal,Button, InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { getCurrentUser, updateAvatar, updateUser } from "../../redux/actions/actions";
import { RootState, useAppDispatch } from "../../redux/store";
type AvatarEditProps = {
    handleClose: () => void;
    show: boolean;
  }




const AvatarEdit = ({ handleClose, show }: AvatarEditProps) => {

    const [imageData, setImageData] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files && e.target.files[0];
        if (image) {
          setImageData(image);
        }
      }
      const dispatch = useAppDispatch();
 
      const[name,setName]=useState("")
      const[password,setPassword]=useState("")
      const[email,setEmail]=useState("")
      const[bio,setBio]=useState("")
      const[address,setAdress]=useState("")
    

      interface UserInfo {
        name?: string;
        password?: string;
        email?: string;
        bio?: string;
        address?: string;
      }
    
      const info:UserInfo={
        name,
        password,
        email,
        bio,
        address
      }


       const handleEdit=()=>{
        if(imageData){
            dispatch(updateUser(info))
            dispatch(updateAvatar(imageData))
        }else{
        dispatch(updateUser(info))
        console.log(info)
        }
       }

    return ( <>
        <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update your Profile</Modal.Title>
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
  </Form>


            <input type="file" onChange={handleChange} />
          
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={handleClose}>
            Close
          </Button>
          <Button onClick={(handleEdit)}>Make Changes</Button>
        </Modal.Footer>
      </Modal>
    </> );
}
 
export default AvatarEdit;