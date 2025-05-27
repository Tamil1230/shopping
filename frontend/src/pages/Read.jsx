import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Read() {
  const [form, setForm] = useState({
    name: "",
    Password: ""
  });
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: form.name,
      password: form.Password
    };
    try {
      const res = await axios.post("http://localhost:8000/sign-in", payload);
      console.log(res.data);
      console.log(res.data.user);
      localStorage.setItem("userId", res.data.user._id || res.data.userId);
      console.log(localStorage.getItem("userId"));
      setResult(<div className="alert alert-success">User Added!</div>);
      setForm({
        name: "",
        Password: "",
      });
      
      navigate("/Home");
    } catch (err) {
      setResult(
        <div className="alert alert-danger">
          Error: {err.response?.data?.message || err.message}
        </div>
      );
    }
  };

  return (
    <div className="container mt-5">
     <Link to="/ProductDetail" className="btn btn-secondary mb-3">Add Product</Link>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          required
          value={form.name}
          onChange={handleChange}
        />
        <label className="form-label">Password</label>
        <input
          type="password"
          name="Password"
          className="form-control"
          required
          value={form.Password}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
        {result}
      </form>
    </div>
  );
}