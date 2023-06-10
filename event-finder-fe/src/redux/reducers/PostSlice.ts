import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  _id: string;
  text: string;
  user: string;
  tags: string[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPostsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPost(state,action:PayloadAction<Post[]>){
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    }
    // addPost more reducers for creating, updating, and deleting posts as needed
  },
});

export const { getPostsStart,
   getPostsSuccess,
    getPostsFailure,
  addPost } =
  postsSlice.actions;

export default postsSlice.reducer;