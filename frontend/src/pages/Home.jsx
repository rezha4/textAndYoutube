import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [text, setText] = useState("");
  const [youtube, setYoutube] = useState("");
  const [session, setSession] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          "https://textandyoutube.adaptable.app/isAuth",
          {
            withCredentials: true,
          }
        );
        setSession(res.data.username);
      } catch (error) {
        console.error("Error fetching session:", error);
        navigate("/login");
      }
    };

    fetchSession();
  }, [session]);

  const handleClick = () => {
    if (!text || !youtube) {
      setError(true);
      setErrorMsg("text/youtube URL are required");
      return;
    }
    const searchParams = new URLSearchParams({ text, youtube });
    navigate(`/show?${searchParams.toString()}`);
  };

  return (
    <>
      {session === "" ? (
        <div className="mt-5 d-flex gap-2 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
          <h4>loading...</h4>
        </div>
      ) : (
        <div className="m-4">
          <p>
            Hi, {session}. Input the text to display & Youtube URL to
            show.
          </p>
          {error && <p className="text-danger">Error: {errorMsg}</p>}
          <label className="form-label" htmlFor="text">
            Text to display
          </label>
          <input
            className="form-control"
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="any text"
          />
          <label className="form-label" htmlFor="youtube">
            Youtube URL to show
          </label>
          <input
            className="form-control"
            type="text"
            name="youtube"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            placeholder={"eg: https://www.youtube.com/watch?v=34wC1C61lg0"}
          />
          <button
            className="btn btn-primary mt-4"
            onClick={() => handleClick()}
          >
            Show!
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
