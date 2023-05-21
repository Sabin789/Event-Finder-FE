import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  _id: string;
  text: string;
  user: {
    _id:string
    name:string
    email:string
    avatar:string
  };
  post: string;
  event: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getCommentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getCommentsSuccess(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload || [];
      state.loading = false;
      state.error = null;
      console.log(action.payload)
    },
    getCommentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    PostComments(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    DeleteComments(state, action: PayloadAction<string>) {
      const commentId = action.payload;
      state.comments = state.comments.filter(comment => comment._id !== commentId);
      console.log(state.comments)
      state.loading = false;
      state.error = null;
    }
  },
});

export const { getCommentsStart,
   getCommentsSuccess,
    getCommentsFailure,
  PostComments,
DeleteComments } =
  commentsSlice.actions;

export default commentsSlice.reducer;