import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getCurrentUserEvents, joinLeave, LikeUnlike } from "../../redux/actions/actions";
import { RootState, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Feed = () => {

    const navigate=useNavigate()
    const user=useSelector((state:RootState)=>state.user.user)
    const events=useSelector((state:RootState)=>state.events.events)
    const loading = useSelector((state: RootState) => state.events.loading);
    const error = useSelector((state: RootState) => state.events.error);
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
    

    if (error) {
        return <div>{error}</div>;
    }
    return ( <>

        {events===null?
        "Loading":events.map((event)=>{
            return<>
            <h2 onClick={()=>{handleNav(event._id)}}>{event.name}</h2>
            {user!._id === event.user ?
     <>      
  <Button>Edit</Button> 
  <Button>Delete</Button>
  </> :
 
  !event.members.includes(user!._id) ?
    <Button onClick={() => dispatch(joinLeave(event._id))}>Join</Button> :
    <Button onClick={() => dispatch(joinLeave(event._id))}>Leave</Button>
}
            {!event.likes.includes(user!._id)?
            <Button onClick={()=>dispatch(()=>handleLike(event._id))}>Like</Button>:
            <Button onClick={()=>dispatch(()=>handleLike(event._id))}>Unlike</Button>
            }
        
            
            </>
        })
      
      }
   
    </> );
}
 
export default Feed;