import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  _id: string;
  text: string;
  user: string;
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
    DeleteComments(state, action: PayloadAction<Comment[]>) {
      state.comments=action.payload
      state.loading = false;
      state.error = null;
    }
  },
});

export const { getCommentsStart,
   getCommentsSuccess,
    getCommentsFailure,
  PostComments } =
  commentsSlice.actions;

export default commentsSlice.reducer;