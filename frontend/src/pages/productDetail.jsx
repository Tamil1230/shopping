import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

const ProductDetail = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    ratings: "",
    images: "",
    category: "",
    seller: "",
    stock: ""
  });
  const [images, setImages] = useState([]); //
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    images.forEach((file) => data.append("images", file));
    try {
      await axios.post("http://localhost:8000/api/products", data);
      setResult(<div className="alert alert-success">Product added successfully!</div>);
      setForm({
        name: "",
        price: "",
        description: "",
        ratings: "",
        images: "",
        category: "",
        seller: "",
        stock: ""
      });
      setImages([]);
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
      <Link to="/Home" className="btn btn-secondary mb-3">&larr; Home Page</Link>
    
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
       
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Add Product</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    className="form-control"
                    required
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    required
                    value={form.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Ratings</label>
                  <input
                    type="number"
                    name="ratings"
                    min="0"
                    max="5"
                    step="1"
                    className="form-control"
                    required
                    value={form.ratings}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Images</label>
                  <input
                    type="file"
                    name="images"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    required
                    value={form.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Seller</label>
                  <input
                    type="text"
                    name="seller"
                    className="form-control"
                    required
                    value={form.seller}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    className="form-control"
                    required
                    value={form.stock}
                    onChange={handleChange}
                  />
                </div>
                <button  type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
              <div className="mt-3">{result}</div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default ProductDetail;