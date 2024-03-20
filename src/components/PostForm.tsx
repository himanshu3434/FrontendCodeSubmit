import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import base64 from "base-64";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [value, setValue] = useState<string | undefined>();
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("52");
  const [stdin, setStdin] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const encodedCode = base64.encode(value as string);
    const encodedStdin = base64.encode(stdin);

    const submitUrl = import.meta.env.VITE_SUBMIT_CODE_URL;

    const createOptions = {
      method: "POST",
      url: submitUrl,

      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        encodedStdin: encodedStdin,
        encodedCode: encodedCode,
        language: language,
      },
    };

    await axios.request(createOptions);
    navigate("/all");
    // console.log(response);
  };

  return (
    <div>
      <div className="">
        <div className="text-center text-slate-300 text-4xl mt-2">
          Run Your Code
        </div>
        <form onSubmit={handleSubmit} action="">
          <div>
            <div className="flex ">
              <div className="w-[30%]">
                <div>
                  <input
                    type="text"
                    className="px-3 py-2 rounded-lg bg-[#313131] text-slate-300 outline-none  w-full 
                focus:border-blue-600 "
                    placeholder="UserName"
                    value={username}
                    onChange={(event) =>
                      setUsername(String(event.target.value))
                    }
                  />
                </div>

                <div>
                  <select
                    name="language"
                    value={language}
                    className="w-[10vw] p-3 mt-5 mb-5 bg-[#313131] text-slate-300 border-collapse focus:outline-none"
                    onChange={(event) =>
                      setLanguage(String(event.target.value))
                    }
                  >
                    <option className="py-2 text-white" value="52">
                      C++
                    </option>
                    <option className="py-2 text-white" value="62">
                      JAVA
                    </option>
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    className="px-3 py-2 rounded-lg bg-[#313131] text-white outline-none  w-full 
                focus:border-blue-600"
                    placeholder="Standard Input"
                    value={stdin}
                    onChange={(event) => setStdin(String(event.target.value))}
                  />
                </div>
              </div>
              <div className="ml-auto mt-auto mr-[6vw] hover:bg-[#3c3c3b] bg-[#313131]  p-3 rounded-lg w-[8vw] text-center hover:text-white cursor-pointer">
                <button
                  type="submit"
                  className="   text-slate-300  text-1xl rounded-lg text-center "
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <label className="text-white text-2xl">Editor</label>
              <div className="mt-2">
                <Editor
                  height="90vh"
                  defaultLanguage="c++"
                  defaultValue="// Write Your Code Here"
                  theme="vs-dark"
                  value={value}
                  onChange={(value) => setValue(value)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
