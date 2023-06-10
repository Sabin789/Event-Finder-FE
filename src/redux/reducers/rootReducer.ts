import { combineReducers } from "redux";
import UserReducer from "./UserSlice";
import EventReducer from "./EventSlice";
import PostReducer from "./PostSlice";
import CommentReducer from "./CommentSlice";
import AllUsersSlice from "./AllUsersSlice";


const rootReducer = combineReducers({
    user: UserReducer,
    allUsers:AllUsersSlice,
    posts: PostReducer,
    events: EventReducer,
    comments: CommentReducer,
  });
  
  export default rootReducer