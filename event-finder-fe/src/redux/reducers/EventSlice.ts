import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Event } from "./storeSlice";

interface Event {
  _id: string;
  name: string;
  address: string;
  description: string;
  tags: string[];
  picture: string; 
  ActiveStatus: boolean;
  Private: boolean;
  user: {
    _id:string;
    name: string;
    email: string;
    avatar: string;
  };
  members: string[];
  limit?: number;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,

};


interface JoinEventPayload {
  eventId: string;
  newMembers: string;
}
interface LikeEventPayload {
  eventId: string;
  newLike: string[];
}
interface UpdateEventPicturePayload {
  eventId: string;
  picture: string;
}
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getEventStart(state) {
      state.loading = true;
      state.error = null;
    },
    getEventsSucess(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
      state.loading = false;
      state.error = null;
    },
    getEventsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    join: (state, action: PayloadAction<JoinEventPayload>) => {
      const { eventId, newMembers } = action.payload;
      const event = state.events.find(event => event._id === eventId);
      const members=event?.members
      if (members) {
       if(!members.includes(newMembers[0])){
        event.members.push(...newMembers);
        state.loading = false;
        state.error = null;
        console.log("true",(newMembers))
       }else{
        console.log("kjbhv")
       const array=members.filter((member)=>member!==newMembers[0])
       event.members=array
       }
      } else {
        state.loading = false;
        state.error = `Event with ID ${eventId} not found`;
      }
    },
    add(state,action:PayloadAction<Event>){
      state.events.push(action.payload)
      state.loading = false;
      state.error = null;
    },
    likeStart: (state) => {
      state.loading = true;
    },
    like: (state, action: PayloadAction<Event>) => {
      const { _id, likes } = action.payload;
      const updatedEvents = state.events.map(event =>
        event._id === _id ? { ...event, likes } : event
      );
      return {
        ...state,
        loading: false,
        events: updatedEvents,
      };
    },
    likeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      console.log(action.payload);
    },
    updateEventPicture(state, action: PayloadAction<UpdateEventPicturePayload>) {
      const { eventId, picture } = action.payload;
      const eventIndex = state.events.findIndex(event => event._id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex].picture = picture;
      }
    },
    getEventById(state, action: PayloadAction<string>) {
      const eventId = action.payload;
      const event = state.events.find(event => event._id === eventId);
      if (event) {
        state.loading = false;
        state.events = [event];
        state.error = null;
      } else {
        state.loading = false;
        state.events = [];
        state.error = `Event with ID ${eventId} not found`;
      }
    },
    DeleteEvents(state,action:PayloadAction<string>){
      const eventId = action.payload;
      state.events = state.events.filter(event => event._id !== eventId);
      state.loading = false;
      state.error = null;
    }
  },
});

export const {
   getEventStart,
    getEventsSucess,
     getEventsFailure,
     join,
    add,
    likeStart,
    like,
    likeFailure,
    updateEventPicture,
  getEventById,
  DeleteEvents } =
  eventSlice.actions;

export default eventSlice.reducer;