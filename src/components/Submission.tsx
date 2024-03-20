import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";

type SubmissionType = {
  docId: string;
  username: string;
  language: string;
  code: string;
  createdAt: Date;
  output: string;
  stdin: string;
};
function Submission() {
  const { docId } = useParams();
  const allSubmissions = useSelector(
    (state: RootState) => state.Submission.submissions
  );
  const [data, setData] = useState<SubmissionType>();
  const [loading, setloading] = useState(true);
  const getSubmission = async () => {
    const entry = allSubmissions.filter(
      (data: SubmissionType) => data.docId === docId
    );
    setData(entry[0]);
    setloading(false);
  };

  useEffect(() => {
    getSubmission();
  }, []);
  return loading ? (
    <>Loading ...</>
  ) : (
    <div className=" text-white   text-3xl ">
      <div className="my-5">UserName : {data?.username}</div>

      <div className="my-5">
        Language : {data?.language === "52" ? "C++" : "JAVA"}
      </div>
      <div className="my-5">Date: {data?.createdAt.toLocaleString()}</div>

      <div className="my-5"> Input : {data?.stdin}</div>

      <div className="my-5">SourceCode : {data?.code}</div>

      <div className="my-5">Output: {data?.output}</div>
    </div>
  );
}

export default Submission;
