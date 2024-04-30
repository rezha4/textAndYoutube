import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [text, setText] = useState("");
  const [youtube, setYoutube] = useState("");
  const [session, setSession] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("https://textandyoutube.adaptable.app/isAuth", {
          withCredentials: true,
        });
        setSession(res.data.username);
      } catch (error) {
        console.error("Error fetching session:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchSession();
  }, [session]);

  const handleClick = () => {
    const searchParams = new URLSearchParams({ text, youtube });
    navigate(`/show?${searchParams.toString()}`);
  };

  return (
    <div className="m-4">
      <p>
        Hi, {session}. Input the text to display & Youtube URL to
        show.
      </p>
      <label className="form-label" htmlFor="text">
        Text to display
      </label>
      <input
        className="form-control"
        type="text"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
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
      />
      <button
        className="btn btn-primary mt-4"
        onClick={() => handleClick()}
      >
        Show!
      </button>
    </div>
  );
};

export default Home;
