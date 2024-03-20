import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submissions: [],
};

export const submissionSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    storeSubmission(state, action) {
      state.submissions = action.payload.allSubmissions;
    },
  },
});

export const { storeSubmission } = submissionSlice.actions;
export default submissionSlice.reducer;
// export type reducerType = ReturnType<typeof submissionSlice.reducer>;
