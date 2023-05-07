import { Dispatch } from 'redux';


import UserSlice, { getPremium, getUserFailure, getUserStart,
     getUserSuccess, updateAvatarFailure, updateAvatarStart,
      updateUserAvatarSuccess, updateUserFailure, updateUserStart,
       updateUserSuccess } from '../reducers/UserSlice';
import { add, DeleteEvents, getEventById, getEventsFailure, getEventsSucess, getEventStart, join, like, likeFailure, likeStart, updateEventPicture } from '../reducers/EventSlice';
import { getPostsFailure, getPostsStart, getPostsSuccess,addPost } from '../reducers/PostSlice';
import { DeleteComments, getCommentsFailure, getCommentsStart, getCommentsSuccess, PostComments } from '../reducers/CommentSlice';
import { getUsersFailure, getUsersStart, getUsersSucess } from '../reducers/AllUsersSlice';



export const getCurrentUser=()=>{
    return async (dispatch: Dispatch) => {
        dispatch(getUserStart());

        try {
             const response = await fetch("http://localhost:3001/Users/me", {
                method:"GET",
            headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      const data = await response.json();
      if(data){
        dispatch(getUserSuccess(data));
      }
        } catch (error:any) {
            console.log(error)
            dispatch(getUserFailure(error))
        }
    }
}

export const getAllUsers=()=>{
    return async(dispatch:Dispatch)=>{
        dispatch(getUsersStart())
        try {
            const res= await fetch("http://localhost:3001/Users",
            {
                    method:"GET",
            headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }})
         const data= await res.json()
         dispatch(getUsersSucess(data))
        } catch (error:any) {
            dispatch(getUsersFailure(error))
        }
    }
}


export const getCurrentUserPosts=()=>{
    return async (dispatch: Dispatch) => {
        dispatch(getPostsStart());

        try {
             const response = await fetch("http://localhost:3001/Users/me/posts", {
                method:"GET",
            headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      const data = await response.json();
      if(data){
        dispatch(getPostsSuccess(data));
      }
        } catch (error:any) {
            console.log(error)
            dispatch(getPostsFailure(error))
        }
    }
}


export const getCurrentUserEvents=()=>{
    return async (dispatch: Dispatch) => {
        dispatch(getEventStart());

        try {
             const response = await fetch("http://localhost:3001/Users/me/events", {
                method:"GET",
            headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      const data = await response.json();
      if(data){
        dispatch(getEventsSucess(data));
      }
        } catch (error:any) {
            console.log(error)
            dispatch(getEventsFailure(error))
        }
    }
}


export const getEventUser=(id:string)=>{
    return async(disptach:Dispatch)=>{
        try {
            const res= await fetch("http://localhost:3001/Events/"+id+"/user",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    }
}



export const getPostComments=(id:string)=>{
    return async (dispatch: Dispatch) => {
        dispatch(getCommentsStart());
        try {
             const response = await fetch("http://localhost:3001/Posts/"+id+"/comms", {
            method:"GET",
            headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      const data = await response.json();
      if(data){
        dispatch(getCommentsSuccess(data));
         console.log(data)
      }
        } catch (error:any) {
            console.log(error)
            dispatch(getCommentsFailure(error))
        }
    }
}


export const getEventComments=(id:any)=>{
    return async (dispatch: Dispatch) => {
        dispatch(getCommentsStart());
        try {
             const response = await fetch("http://localhost:3001/Events/"+id+"/comms", {
                method:"GET",
            headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      const data = await response.json();
      if(data){
        dispatch(getCommentsSuccess(data));
      }
        } catch (error:any) {
            console.log(error)
            dispatch(getCommentsFailure(error))
        }
    }
}


export const updateUser=(info:any)=>{
    return async(dispatch:Dispatch)=>{
        dispatch(updateUserStart())
        try {
            const response=await fetch("http://localhost:3001/Users/me",{
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(info),
              })
              const data = await response.json();
              dispatch(updateUserSuccess(data))
        } catch (error:any) {
            console.log(error)
            dispatch(updateUserFailure(error))
        }
    }
}


export const updateAvatar = (file: File | null) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateAvatarStart());
    try {
      if (file) {
        const formData = new FormData();
        formData.append('Avatar', file);
        const response = await fetch('http://localhost:3001/Users/me/avatar', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: formData,
        });
        const data = await response.json();
        console.log(response);
        dispatch(updateUserAvatarSuccess(data));
        return data;
      }
    } catch (error:any) {
      console.log(error);
      dispatch(updateUserFailure(error))
    }
  };
};

export const updatePicture = (id:string,file: File | null) => {
    return async (dispatch: Dispatch) => {
      
      try {
        if (file) {
          const formData = new FormData();
          formData.append('Avatar', file);
          const response = await fetch(`http://localhost:3001/Events/${id}/picture`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: formData,
          });
          const data = await response.json();
    dispatch(updateEventPicture(data))

        }
      } catch (error:any) {
        console.log(error);
       
    
      }
    };
  };


export const getPremiumUser=()=>{
    return async(dispatch: Dispatch)=>{
        dispatch(updateUserStart())
        try {
             await fetch('http://localhost:3001/Users/premium', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }})
           
                dispatch(getPremium())
        } catch (error:any) {
          console.log(error)
          dispatch(updateUserFailure(error))
        }
    }
}

export const joinLeave = (id: string, newMember: string) => {
    return async (dispatch: Dispatch) => {
      try {
        const res = await fetch(`http://localhost:3001/Users/${id}/joinLeave`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ newMember }),
        });
        const data = await res.json();
       
        dispatch(join({ eventId: id, newMembers:[newMember] }));

      } catch (error) {
        console.log(error);
      }
    };
  }

export const LikeUnlike = (id: string) => {
    return async (dispatch: Dispatch) => {
      dispatch(likeStart());
      try {
        const res = await fetch(`http://localhost:3001/Users/${id}/likeUnlikeEvent`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await res.json();
         dispatch(like(data)); 
      } catch (error:any) {
        dispatch(likeFailure(error));
      }
    };
  }

export const addEvent=(info:any)=>{
  return async(dispatch:Dispatch)=>{
    try {
        const res= await fetch("http://localhost:3001/Events",{
            method:"POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(info)
        })
        const data=await res.json()
       
        dispatch(add(data))
       
    } catch (error) {
        console.log(error)
    }
  }
}

export const addPosts=(info:any)=>{
    return async(dispatch:Dispatch)=>{
      try {
          const res= await fetch("http://localhost:3001/Posts",{
              method:"POST",
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
          })
          const data=await res.json()
          dispatch(addPost(data))
          console.log(data)
       
      } catch (error) {
          console.log(error)
      }
    }
  }

 export const getEvent=(id:string)=>{
    return async (dispatch:Dispatch)=>{
        try {
            const res= await fetch("http://localhost:3001/Events/"+id,{
                method:"GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  }})
                  const data= await res.json()
                  dispatch(getEventById(data._id))
        } catch (error) {
            console.log(error)
        }
    }
  }

  export const postComment=(info:any)=>{
    return async(dispatch:Dispatch)=>{
        try {
            const res=await fetch("http://localhost:3001/Comments/",{
              method:"POST",
              headers:{
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(info)
            })
            const data=await res.json()
            console.log(info)
            dispatch(PostComments(data))
        } catch (error) {
            console.log(error)
        }
    }
  }

  export const DeleteComment=(id:string)=>{
    return async(dispatch:Dispatch)=>{
        try {
            const res=await fetch("http://localhost:3001/Comments/"+id,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                  }
            })
     
            dispatch(DeleteComments(id))
        } catch (error) {
            console.log(error)
        }
    }
  }

  export const DeleteEvent=(id:string)=>{
    return async(dispatch:Dispatch)=>{
        try {
            const res=await fetch("http://localhost:3001/Events/"+id,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json"
                  }
            })
            dispatch(DeleteEvents(id))
        } catch (error) {
            console.log(error)
        }
    }
  }