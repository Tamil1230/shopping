import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

export default function ViewDetail() {
    const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Add this

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setProduct(null);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading product details...</div>
        <Link to="/Home" className="btn btn-secondary mb-3">&larr; Home </Link>
      </div>
    );
  }
    const handleAddToCart = () => {
        addToCart(product);
        navigate("/Home");
    };
  return (
    <div className="container mt-5">
        <Link to="/Home" className="btn btn-secondary mb-3">&larr; Home </Link>
      <div className="card p-4 shadow">
        <div className="row align-items-center">
          <div className="col-md-5 text-center">
            <img
              src={
                product.images && product.images[0]
                  ? `http://localhost:8000${product.images[0].image}`
                  : "/default.jpg"
              }
              alt={product.name}
              style={{ width: "100%", maxWidth: "300px", height: "300px", objectFit: "contain", background: "#f8f9fa" }}
              className="rounded"
            />
          </div>
          <div className="col-md-7">
            <h2 className="mb-3">{product.name}</h2>
            <p className="mb-2"><strong>Description:</strong> {product.description}</p>
            <p className="mb-2"><strong>Category:</strong> {product.category}</p>
            <p className="mb-2"><strong>Seller:</strong> {product.seller}</p>
            <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
            <p className="mb-2"><strong>Stock:</strong> {product.stock}</p>
            <p className="mb-2"><strong>Ratings:</strong> {product.ratings} / 5</p>
            <button className="btn btn-success btn-lg mt-4 w-100" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}