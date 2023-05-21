import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../redux/actions/actions";
import { RootState, useAppDispatch } from "../../../redux/store";
import AvatarEdit from "../../Home/UserEdit";
import Navbar from "../../Navbar";

const SingleUser = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

  const viewedUser=useSelector((state:RootState)=>state.user.viewedUser)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user=useSelector((state:RootState)=>state.user.user)


useEffect(()=>{
    dispatch(getUserById(id as string))
    console.log(viewedUser)
},[])
   
    return ( <>
    <Navbar/>
    {user &&viewedUser && 
    user._id===id?
     <Container>
        <Row>
            <Col>
            <div className="viewedUser-picture-container">
             <img src={user.avatar} alt="" />
             <p>{user.name}</p>
             <p>{user.email}</p>
            </div>
            <div>

            </div>
          {user._id===user?._id?
          <Button onClick={handleShow}>Edit Profile</Button>:""}
            </Col>
        </Row>
        {user && (
            <AvatarEdit handleClose={handleClose} show={show} user={user} />
          )}
        </Container>: <Container>
        <Row>
            <Col>
            <div className="viewedUser-picture-container">
             <img src={viewedUser?.avatar} alt="" />
             <p>{viewedUser?.name}</p>
             <p>{viewedUser?.email}</p>
            </div>
            <div>
   
            </div>
          {viewedUser?._id===user?._id?
          <Button onClick={handleShow}>Edit Profile</Button>:""}
            </Col>
        </Row>
        {user && (
            <AvatarEdit handleClose={handleClose} show={show} user={user} />
          )}
        </Container>}
    </> );
}
 
export default SingleUser;