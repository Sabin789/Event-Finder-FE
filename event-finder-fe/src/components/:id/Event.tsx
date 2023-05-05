import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Event } from "../../redux/reducers/storeSlice";
import { useEffect, useState } from "react";
import { DeleteComment, getCurrentUser, getCurrentUserEvents, getEventComments, postComment } from "../../redux/actions/actions";
import { Form,Button } from "react-bootstrap";


const SingleEvent = () => {
  const dispatch = useAppDispatch();
  const events = useSelector((state: RootState) => state.events.events);
  const { id } = useParams<{ id: string }>();
  const oneEvent = events.find((event: Event) => event._id === id);
const comments=useSelector((state: RootState) => state.comments.comments);
const[text,setText]=useState("")
const [event, setEvent] = useState<string | undefined>(undefined);
const user=useSelector((state: RootState) => state.user.user)

  useEffect(()=>{
    dispatch(getCurrentUser())
    dispatch(getCurrentUserEvents())
    setEvent(id)
    dispatch(getEventComments(id))
  },[])
 
const handleDelete=(a:string)=>{
    dispatch(DeleteComment(a))
    dispatch(getEventComments(id))
}

  const info={text,event}

const handlePost=()=>{
    dispatch(postComment(info))
    
}

   return (
    oneEvent && <>
   <div>

      <h1>{oneEvent!.name}</h1>
      <h1>{oneEvent!._id}</h1>
      <p>{oneEvent!.description}</p>
      {/* <img src={event.picture} alt={event.name} /> */}
      {oneEvent.user===user!._id?
                 <Button>Edit</Button>:<Button>Join</Button>}
    </div>
    <div>
    <Form.Group>
  <Form.Label>Text</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Comment"
    onChange={(val) => setText(val.currentTarget.value)} />
  </Form.Group>
  <Button onClick={()=>{handlePost()}}>Add Comment</Button>
    </div>
    <div>
        {!comments?"Lodaing":
            <>
            
            {comments.map(comment=>{
                // console.log(comment.text)
               return <div key={comment._id}>
                <><p>{comment.text}</p>
                <p>{comment.createdAt.toString()}</p>
                </> 
                 {comment.user===user!._id?
                 <>
                 <Button>Edit</Button>
                 <Button onClick={()=>{handleDelete(comment._id)}}>Delete</Button>
                 </>:""}
               </div>
            })}
            </>
           }
    </div>
     </>
  );
};

export default SingleEvent;