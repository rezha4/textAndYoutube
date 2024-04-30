import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    const response = await axios.post(
      "http://localhost:3000/register",
      payload
    );

    if (response.status === 200) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="m-4">
        <p>Please register</p>
        <label className="form-label" htmlFor="username">
          username
        </label>
        <input
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
          className="form-control"
          type="password"
          name="password"
          value={payload.password}
          onChange={(e) => handleChange(e)}
        />
        <button
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
