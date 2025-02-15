import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/registerSlice";
import userSlice from './features/userSlice';



export const store = configureStore({
  reducer: {
    // Define your reducers here
    register: registerSlice,
    user: userSlice
  },
  // Other store setups...
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;