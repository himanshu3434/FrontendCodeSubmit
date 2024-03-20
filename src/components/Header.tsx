import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#282828] w-full h-[8vh] flex pl-10 pr-10 justify-between items-center text-slate-300">
      <div className="pl-5 text-2xl text-white">takeUforward</div>

      <div>
        <ul className="flex justify-between">
          <li className=" hover:bg-blue-600 rounded-lg p-4">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Add Submission
            </button>
          </li>
          <li className="hover:bg-blue-600 rounded-lg p-4">
            <button
              onClick={() => {
                navigate("/all");
              }}
            >
              {" "}
              All Submissions
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
