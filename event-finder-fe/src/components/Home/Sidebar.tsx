import { useEffect, useState} from "react";
import { getCurrentUser,getPremiumUser} from "../../redux/actions/actions";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Button,Container, Row } from "react-bootstrap";
import "../../Css/sidebar.css"
import AvatarEdit from "./UserEdit";
import EventModal from "./EventModal";
import PostModal from "./PostModal";


const Sidebar = () => {
    const dispatch = useAppDispatch();
  const user=useSelector((state:RootState)=>state.user.user)


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);



  useEffect(() => {
    dispatch(getCurrentUser())
  }, []);


  return <>
  {!user? <h1>Loading</h1>:
  <Container>
    <Row>
    <div className="profileCont">
        <div>
        <img src={user.avatar}
         alt="Profile picture"
         className="profilePic mt-2"
         onClick={handleShow}
         />
         </div>
         <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user._id}</p>
        </div>
        </div>
        <div>
            <h3>Followers:{user.followers.length}</h3>
            <h3>Following:{user.following.length}</h3>
            <h4 className="mt-3">Feed</h4>
            <h4 className="mt-3">Posts</h4>
            <h4 className="mt-3">Events</h4>
            <h4 className="mt-3">You might like</h4>
        </div>
        <Button onClick={handleShow3}>Make a Post</Button>
        {user.Premium===true?<Button onClick={handleShow2}>Add Event</Button>:
        <Button onClick={()=>dispatch(getPremiumUser())}>Buy Premium</Button>
        }
<AvatarEdit handleClose={handleClose} show={show}/>
<EventModal handleClose2={handleClose2} show2={show2}/>
<PostModal  handleClose={handleClose3} show={show3} />
    </Row>
  </Container>}
  
  
  
  </>;
};

export default Sidebar;