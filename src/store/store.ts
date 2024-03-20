import { configureStore } from "@reduxjs/toolkit";
import submissionSlice from "../utils/submission";

export const store = configureStore({
  reducer: {
    Submission: submissionSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
