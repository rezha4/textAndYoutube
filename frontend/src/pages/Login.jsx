import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!payload.username || !payload.password) {
      setError(true);
      setErrorMsg("username/password can't be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://textandyoutube.adaptable.app/login",
        payload,
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.status === 200) {
        navigate("/");
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      setErrorMsg(error.message || "server error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="m-4">
        <p>
          Please login. Not registered yet?{" "}
          <a className="link" href="/register">
            Register here
          </a>
        </p>
        {error && <p className="text-danger">Error: {errorMsg}</p>}
        <label className="form-label" htmlFor="username">
          username
        </label>
        <input
          disabled={loading}
          className="form-control"
          type="text"
          name="username"
          value={payload.username}
          onChange={(e) => handleChange(e)}
        />
        <label className="form-label" htmlFor="password">
          password
        </label>
        <input
          disabled={loading}
          className="form-control"
          type="password"
          name="password"
          value={payload.password}
          onChange={(e) => handleChange(e)}
        />
        <button
          disabled={loading}
          className="btn btn-primary mt-4"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
