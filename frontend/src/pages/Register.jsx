import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
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

  const handleRegister = async () => {
    if (!payload.username || !payload.password) {
      setError(true);
      setErrorMsg("username/password are required");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://textandyoutube.adaptable.app/register",
        payload
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMsg(error.message || "server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="m-4">
        <p>Please register</p>
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
          onClick={() => handleRegister()}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Register;
