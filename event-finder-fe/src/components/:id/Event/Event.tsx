import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { Event } from "../../../redux/reducers/storeSlice";
import { useEffect, useState } from "react";
import { DeleteComment, getCurrentUser, getCurrentUserEvents, getEventComments, joinLeave, LikeUnlike, postComment } from "../../../redux/actions/actions";
import { Form,Button, Container, Row, Col } from "react-bootstrap";
import EventModal from "./EventModal";
import { useJsApiLoader,GoogleMap,Marker, DirectionsService ,DirectionsRenderer} from "@react-google-maps/api";

import "../../../Css/event.css"
import Navbar from "../../Navbar";
import moment from "moment"
const SingleEvent = () => {
  const dispatch = useAppDispatch();
  const events = useSelector((state: RootState) => state.events.events);
  const { id } = useParams<{ id: string }>();
  const oneEvent = events.find((event) => event._id===id);
const comments=useSelector((state: RootState) => state.comments.comments);
const[text,setText]=useState("")
const [event, setEvent] = useState<string | undefined>(undefined);
const user=useSelector((state: RootState) => state.user.user)

const navigate=useNavigate()
const handleNav=(id:string)=>{
  navigate("/User/"+id)
}
const handleDelete=(a:string)=>{
    dispatch(DeleteComment(a))
    dispatch(getEventComments(id))
}

  const info={text,event}

const handlePost=()=>{
    dispatch(postComment(info))
    
}
const eventDate = moment(oneEvent?.date);
const formattedDate = eventDate.format('LL')
const [direction, setDirection] = useState<DirectionsResult | null>(null)
let[distance,setDistance]=useState("")
let[duration,setDuration]=useState("")

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [latLng, setLatLng] = useState({ lat: 1, lng: 1 })
const [userLatLng,setUserLatLng]=useState({ lat: 1, lng: 1 })
  const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_API_KEY as string,
      });
      
      
const calculateRoute=async()=>{
  
  const direction=new google.maps.DirectionsService()
  const results= await direction.route({
    origin:user?.address as string,
    destination:oneEvent?.address as string,
    travelMode:google.maps.TravelMode.DRIVING
  })
  setDirection(results)
  if (results?.routes[0]?.legs[0]?.distance?.text) {
    setDistance(results.routes[0].legs[0].distance.text);
  }
if(results?.routes[0]?.legs[0]?.duration?.text){
  setDuration(results?.routes[0]?.legs[0]?.duration?.text)
}
}
const handleLike = (id: string) => {
  dispatch(LikeUnlike(id));
}
if (loadError&& loadError) {
  return <p>Error loading Google Maps API</p>;
}

if (isLoaded&&!isLoaded) {
  return <p>Loading...</p>;
}
  useEffect(()=>{
    dispatch(getCurrentUser())
    dispatch(getCurrentUserEvents())
    setEvent(id)
    dispatch(getEventComments(id))
   
  },[])


  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: oneEvent?.address }, (results: any, status: any) => {
        if (status === "OK") {
          const location = results[0].geometry.location;
          setLatLng({ lat: location.lat(), lng: location.lng() });
        } else {
          console.log("Geocode was not successful for the following reason:", status);
        }
      });
      geocoder.geocode({ address: user?.address }, (results: any, status: any) => {
        if (status === "OK") {
          const location = results[0].geometry.location;
          setUserLatLng({ lat: location.lat(), lng: location.lng() });
        } else {
          console.log("Geocode was not successful for the following reason:", status);
        }
      });
    }
    calculateRoute();
  }, [isLoaded, loadError])
   return (
 
    oneEvent && <>
 
    <Navbar/>
    <Container>
    
    <Row className="mt-3">
    <Col sm={12} md={7}>
    <div>
      <div className="img-container">
        <img className="event-img" src={oneEvent.Picture} alt="" />
      </div>
      
    
    </div>
    
    </Col>
    <Col sm={12} md={5} className="mt-5 d-flex">
  <div className="event-info d-flex flex-column">
    <h3>Event Title: {oneEvent.name}</h3>
    <h3>Description: {oneEvent.description}</h3>
    <p>Number of Members:{oneEvent.members.length}</p>
    <p onClick={()=>handleNav(oneEvent.user._id)}>Event Creator: {oneEvent.user.email}</p>
    <p>Categories: {oneEvent.tags.join(', ')}</p>
    {oneEvent && oneEvent.members && oneEvent.members.includes(user!._id) || oneEvent?.user._id === user?._id ? (
      <>
        <p>Address: {oneEvent.address}</p>
        <p>Date: {formattedDate} at {oneEvent.time}</p>
       
      </>
    ) : null}

    <div className="mt-auto">
      {!oneEvent.likes.includes(user!._id) ? (
        <Button onClick={() => dispatch(() => handleLike(oneEvent._id))} className="follow-btn">
          Like {oneEvent.likes.length}
        </Button>
      ) : (
        <Button onClick={() => dispatch(() => handleLike(oneEvent._id))} className="follow-btn">
          Liked {oneEvent.likes.length}
        </Button>
      )}

      {oneEvent.user._id === user!._id ? (
        <Button onClick={handleShow} className="follow-btn mx-5">
          Edit
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(joinLeave(oneEvent._id, user!._id))}
          className="follow-btn mx-5"
        >
          {oneEvent && oneEvent.members && oneEvent.members.includes(user!._id)
            ? 'Leave'
            : oneEvent && oneEvent.user && oneEvent.user.eventReqs && oneEvent.user.eventReqs.includes(oneEvent._id)
            ? 'Req Sent'
            : 'Join'}
        </Button>
      )}
    </div>
  </div>
</Col>
    <div>
     
       {oneEvent && oneEvent.members && oneEvent.members.includes(user!._id) || oneEvent?.user._id === user?._id ?
       <>
        <p>Distance: {distance}</p>
      <p>Duration: {duration}</p>
        {window.google && window.google.maps && (
  <GoogleMap
    center={latLng}
    zoom={15}
    mapContainerStyle={{ width: '100%', height: '400px' }}
    options={{
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    }}
  >
  <Marker
   position={latLng}
  >
  </Marker>
  <Marker
  position={userLatLng}
  >
    
  </Marker>
  {direction && <DirectionsRenderer directions={direction}/>}
  </GoogleMap>
        )}</>:""}

      </div>
    <div>
   
  <h3>Comments</h3>
  <Form.Group>
    <Form.Control 
    type="text" 
    placeholder="Comment"
    onChange={(val) => setText(val.currentTarget.value)} />
  </Form.Group>
  <Button onClick={()=>{handlePost()}}>Comment</Button>
    </div>

    <div>
        {!comments?"Lodaing":
            <div className="container mt-3">
            
            {comments.map(comment=>{
                // console.log(comment.text)
               return <div key={comment._id} >

                <div className="comment__card">
                 <img className="event-user-pic" src={comment.user.avatar} />
                 <p className="mx-2">{comment.user.name}</p>
                 </div>
                
              <div className="d-flex comment-container">
                 <p className="mr-5">{comment.text}</p>
              
                 {comment.user._id===user!._id?
                 
                 <p onClick={()=>{handleDelete(comment._id)}}
                  className="delete-button mx-2">Delete</p>:""}
        </div>
       
               </div>
            })}
            </div>
           }
    </div>
   
    <EventModal handleClose={handleClose} show={show} _id={id as string}/>
    </Row>
    </Container>
     </>
     
  );
};

export default SingleEvent;