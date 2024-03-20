import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PostForm from "./components/PostForm.tsx";
import Submission from "./components/Submission.tsx";
import AllSubmission from "./components/AllSubmission.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PostForm />,
      },
      {
        path: "/all",
        element: <AllSubmission />,
      },
      {
        path: "/submission/:docId",
        element: <Submission />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
