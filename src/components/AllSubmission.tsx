import { useEffect, useState } from "react";
import axios from "axios";
import base64 from "base-64";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeSubmission } from "../utils/submission";
interface AllSubmissionType {
  docId: string;
  language: string;
  username: string;
  output: string;
  code: string;
  createdAt: Date;
  stdin: string;
}

function AllSubmission() {
  const [submission, setSubmission] = useState<AllSubmissionType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllSubmission = async () => {
    const submissionUrl = import.meta.env.VITE_SUBMISSION_URL;

    const createOptions = {
      method: "GET",
      url: submissionUrl,
    };

    const response = await axios.request(createOptions);
    // console.log(response.data);
    response.data.map((data: AllSubmissionType) => {
      data.code = base64.decode(data.code);

      data.stdin = base64.decode(data.stdin);
      data.output = base64.decode(data.output);
    });
    //added this line as mysql db is  ending the connection unexpectly
    if (!response) navigate("/all");
    setSubmission(response.data);
    dispatch(storeSubmission({ allSubmissions: response.data }));
    setLoading(false);
  };

  useEffect(() => {
    getAllSubmission();
  }, []);

  return loading ? (
    <div className="text-white">Loading...</div>
  ) : (
    <div className=" text-slate-300 h-[100vh]">
      <div className=" text-center text-4xl my-10">All Submission</div>

      <div>
        <table className=" table-fixed w-full text-center  border-seperate">
          <thead className="text-xl border-b  border-gray-600 h-[9vh]">
            <tr>
              <th className="">Username</th>
              <th className="">Language</th>
              <th className="">stdin</th>
              <th className="">Sourcecode</th>
              <th className="">Output</th>
              <th className="">SubmissionDate</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody className="text-white">
            {submission &&
              submission.map((data, index) => {
                return (
                  <tr
                    className={index % 2 !== 0 ? `bg-[#2a2a2a]` : ""}
                    key={data.docId}
                  >
                    <td>{data.username}</td>
                    <td>{data.language === "52" ? "C++" : "JAVA"}</td>
                    <td>{data.stdin}</td>
                    <td>{data.code.substring(0, 100)}</td>
                    <td>{data.output}</td>
                    <td>
                      {data.createdAt.toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                    <td>
                      <button
                        className="text-blue-500 hover:text-blue-200"
                        onClick={() => navigate("/submission/" + data.docId)}
                      >
                        {" "}
                        Open
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllSubmission;
