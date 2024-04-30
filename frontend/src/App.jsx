import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { AuthProvider } from "./pages/AuthContext";
import axios from "axios";
import Show from "./pages/Show";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/show" element={<Show />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
