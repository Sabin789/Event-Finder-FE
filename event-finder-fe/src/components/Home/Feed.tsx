import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DeleteEvent, follow, getAllUsers, getCurrentUserEvents, joinLeave, LikeUnlike } from "../../redux/actions/actions";
import { RootState, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import "../../Css/feed.css"
// import { useJsApiLoader, DirectionsService} from "@react-google-maps/api";

const Feed = () => {

    const navigate=useNavigate()
    const user=useSelector((state:RootState)=>state.user.user)
    const events=useSelector((state:RootState)=>state.events.events)
    const loading = useSelector((state: RootState) => state.events.loading);
    const error = useSelector((state: RootState) => state.events.error);
    const allUsers=useSelector((state:RootState)=>state.allUsers.Users)
    const dispatch = useAppDispatch();
 
      
     
    useEffect(()=>{
      dispatch(getCurrentUserEvents())
      
    },[])


    const handleNav=(id:string)=>{
       navigate("/event/"+id)
    }
    
  
    const handleLike = (id: string) => {
        dispatch(LikeUnlike(id));
    };
    const handleFollow=async(id: string)=>{
       await dispatch(follow(id))
    }

   
    // if (error) {
    //     return <div>{error}</div>;
    // }
    // if (isLoaded&&!isLoaded) {
    // }
    const MAX_DESCRIPTION_LENGTH = 100; // Maximum number of characters to show

const TruncatedDescription = ( description:string ) => {
  const truncatedText = description.length > MAX_DESCRIPTION_LENGTH
    ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
    : description;
   return truncatedText}
    return ( <Container className="feed_container" >
    <div className="d-flex justify-content-center">
      <h1>Events you would be intersted in</h1>
      </div>
      <Container>
        <Row>
        {events===null?
      
        "Loading":events.map((event)=>{
            const eventDate = new Date(event!.date);
            const formattedDate = eventDate.toLocaleDateString();

            return<>
            <Col sm={12} md={6} lg={3} className="feed-col">
            <Card style={{ width: '18rem', height: '35rem' }} className="mx-3 my-3 feed-card">
  <Card.Img variant="top" className="event-picture" src={event.Picture} />
  <Card.Body className="d-flex flex-column">
    <Card.Title onClick={() => handleNav(event._id)}><h3 className="ml-5">Event:{event.name}</h3></Card.Title>
    <Card.Text>
      <p className="description-feed"><b className="property-event">Description:</b> {TruncatedDescription(event.description)}</p>
      <p><b className="property-event">Number of members:</b>{event.members.length}</p>
      <p><b className="property-event">Limit:</b>{event.limit}</p>
      {event && event.members && event.members.includes(user!._id) ? (
        <p> <b className="property-event">Address:</b> {event.address}</p>
      ) : (
        ''
      )}
      <p> <b className="property-event">Date:</b> {formattedDate} at {event.time}</p>
    </Card.Text>
    <div className="mt-auto d-flex">
      {user && event.user && user._id === event.user!._id ? (
        <>
          <br />
          <Button onClick={() => dispatch(DeleteEvent(event._id))} className="case-btn">
            Delete
          </Button>
          {!event.likes.includes(user!._id) ? (
            <Button onClick={() => dispatch(() => handleLike(event._id))} className="follow-btn">
              Like {event.likes.length}
            </Button>
          ) : (
            <Button onClick={() => dispatch(() => handleLike(event._id))} className="follow-btn">
              Liked {event.likes.length}
            </Button>
          )}
        </>
      ) : (
        <>
          {event && event?.limit&& (
            event.limit<<event?.members.length?
            <Button onClick={() => dispatch(joinLeave(event._id, user!._id))} className="case-btn">
              {event && event.members && event.members.includes(user!._id)
                ? 'Leave'
                : 'Join'}
            </Button>
            :<Button className="case-btn">Full</Button>
          )}
          {!event.likes.includes(user!._id) ? (
            <Button onClick={() => dispatch(() => handleLike(event._id))} className="follow-btn">
              Like {event.likes.length}
            </Button>
          ) : (
            <Button onClick={() => dispatch(() => handleLike(event._id))} className="follow-btn">
              Liked {event.likes.length}
            </Button>
          )}
        </>
      )}
    </div>
  </Card.Body>
</Card>
    </Col>
      </>  })}</Row>
      </Container></Container>)}
      

export default Feed;