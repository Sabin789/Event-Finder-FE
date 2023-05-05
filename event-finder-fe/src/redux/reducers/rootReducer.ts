import { combineReducers } from "redux";
import UserReducer from "./UserSlice";
import EventReducer from "./EventSlice";
import PostReducer from "./PostSlice";
import CommentReducer from "./CommentSlice";


const rootReducer = combineReducers({
    user: UserReducer,
    posts: PostReducer,
    events: EventReducer,
    comments: CommentReducer,
  });
  
  export default rootReducer