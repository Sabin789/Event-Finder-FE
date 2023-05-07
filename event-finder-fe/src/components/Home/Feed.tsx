import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DeleteEvent, getAllUsers, getCurrentUserEvents, joinLeave, LikeUnlike } from "../../redux/actions/actions";
import { RootState, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

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
      dispatch(getAllUsers())
      console.log(allUsers)
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
      <h1>Events you would be intersted in</h1>
        {events===null?
        "Loading":events.map((event)=>{
            return<>
       
            <h2 onClick={()=>{handleNav(event._id)}}>{event.name}</h2>
            {user && event.user && user._id === event.user ?
     <>    
  
   
   <br />
  <Button>Edit</Button> 

  <Button onClick={()=>dispatch(DeleteEvent(event._id))}>Delete</Button>
  </> :
      
  !event.members.includes(user!._id) ?

  <>
  <>
  {user?.followers.includes(event.user._id)?<Button>Unfollow</Button>:<Button>Follow</Button>}
  </>
    <Button onClick={() => dispatch(joinLeave(event._id,user!._id))}>Join</Button> </>:
<>
      {user?.followers.includes(event.user._id)?<Button>Unfollow</Button>:<Button>Follow</Button>}

    <Button onClick={() => dispatch(joinLeave(event._id,user!._id))}>Leave</Button>
    </>
}
            {!event.likes.includes(user!._id)?
            <Button onClick={()=>dispatch(()=>handleLike(event._id))}>Like</Button>:
            <Button onClick={()=>dispatch(()=>handleLike(event._id))}>Unlike</Button>
            }
        
            
            </>
        })
      
      }
      {!allUsers===null?"":<>
      {allUsers.map(Oneuser=>{
        return  user?._id===Oneuser._id?"":<h1>{Oneuser.name}</h1>
      })}
      </>}
   
    </> );
}
 
export default Feed;