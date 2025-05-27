import React, { useState } from "react";

import axios from "axios";

export default function Sign() {
  const [form, setForm] = useState({
    name: "",
    Email: "",
    Password: "",
    ComfirmPassword: "",
    Address: "",
    PhoneNumber: "",
    District: ""    
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const payload = {
      username: form.name,
      password: form.Password,
      comfirmPassword: form.ComfirmPassword,
      email: form.Email,
      address: form.Address,
      phoneNumber: form.PhoneNumber,
      district: form.District,
    }; 
    try {
      
      await axios.post("http://localhost:8000/sign-up", payload);
      setResult(<div className="alert alert-success">User Added!</div>);
      setForm({
        name: "",
        Email: "",
        Password: "",
        ComfirmPassword: "",
        Address: "",
        PhoneNumber: "",
        District: ""
      });      
    } catch (err) {
      setResult(
        <div className="alert alert-danger">
          Error: {err.response?.data?.message || err.message}
        </div>
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">User Detail</h4>
          </div>
          <div className="card-body">
            {result}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="Email"
                  className="form-control"
                  required
                  value={form.Email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="Password"
                  className="form-control"
                  required
                  value={form.Password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="ComfirmPassword"
                  className="form-control"
                  required
                  value={form.ComfirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="Address"
                  className="form-control"
                  required
                  value={form.Address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="PhoneNumber"
                  className="form-control"
                  required
                  value={form.PhoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">District</label>
                <input
                  type="text"
                  name="District"
                  className="form-control"
                  required
                  value={form.District}
                  onChange={handleChange}
                />
              </div>
              
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}