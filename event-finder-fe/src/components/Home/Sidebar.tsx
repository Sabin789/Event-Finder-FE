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
  }, [dispatch]);

  
  return <>
  {!user? <h1>Loading</h1>:user&&
  <Container>
    <Row>
    <div className="mt-2 profileCont">
        <div>
        <img src={user.avatar}
         alt="Profile picture"
         className="profilePic mt-2"
         onClick={handleShow}
         />
         </div>
         <div>
        <h3 className="no-space">{user.name}</h3>
        <p className="no-space2">{user.email}</p>
        </div>
        </div>
        <div className="comp-cont">
            <h5 className="sidebar-comp">Followers:{user.followers&& user.followers.length}</h5>
            <h5 className="sidebar-comp">Following:{user.following&& user.following.length}</h5>
            <h5 className="mt-3 sidebar-comp">Home</h5>
            <h5 className="mt-3 sidebar-comp">Notifications</h5>
            <h5 className="mt-3 sidebar-comp">Events</h5>
            <h5 className="mt-3 sidebar-comp">Bookmarks</h5>
        </div>
        {user.Premium===true?<Button onClick={handleShow2}>Add Event</Button>:
        <Button onClick={()=>dispatch(getPremiumUser())}>Buy Premium</Button>
        }
 {user && (
            <AvatarEdit handleClose={handleClose} show={show} user={user} />
          )}
          
<EventModal handleClose2={handleClose2} show2={show2}/>
<PostModal  handleClose={handleClose3} show={show3} />
    </Row>
  </Container>}
  
  
  
  </>;
};

export default Sidebar;