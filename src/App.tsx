import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-[#1a1a1a] h-[500vh]">
        <Header />
        <div className="pl-10 pr-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
