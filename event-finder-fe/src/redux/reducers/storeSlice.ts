
interface reqs{
  _id:String,
  name:String,
  email:String
}


export interface User {
    _id: string;
    name: string;
    premiumPoints: number;
    email: string;
    password: string;
    avatar: string;
    refreshToken: string;
    googleID: string;
    role: "Admin" | "Moderator" | "User";
    Premium: boolean;
    bio: string;
    interestedIn: string[];
    address: string;
    followers: string[];
    following: string[];
    eventReqs: reqs[];
    reports: Report[];
    reportPoints: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface Report {
    _id: string;
    reportedUserId: string;
    reportingUserId: string;
    reason: string;
    date: Date;
  }
  export interface Post {
    _id: string;
    text: string;
    user: string;
    tags: string[];
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Event {
    _id: string;
    name: string;
    address: string;
    description: string;
    tags: string[];
    picture: string;
    ActiveStatus: boolean;
    Private: boolean;
    user: string;
    members: string[];
    limit?: number;
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Comment {
    _id: string;
    text: string;
    user: string;
    post: string;
    event: string;
    createdAt: Date;
    updatedAt: Date;
  }

//   export interface Store {
//     userInfo: {
//       _id: string;
//       name: string;
//       email: string;
//       avatar?: string;
//     },Posts:{

//     }
// }