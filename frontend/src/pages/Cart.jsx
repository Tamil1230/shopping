import React, { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    saveCartToDB,
    loadCartFromDB,
    clearCart, // Add this to your CartContext if not present
  } = useCart();

  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId && cart.length === 0) {
      loadCartFromDB(userId);
    }
  }, [userId, loadCartFromDB]);

  const handleSaveCart = () => {
    if (userId) {
      saveCartToDB(userId);
      alert("Cart saved!");
    }
  };

  const handleOrder = () => {
    setShowModal(true);
  };

  const handleConfirmOrder = () => {
    setShowModal(false);
    clearCart();
    
  };

  return (
    <div className="container mt-5">
      <Link to="/Home" className="btn btn-secondary mb-3">
        &larr; Home{" "}
      </Link>
      <h2>Your Cart</h2>
      <button
        className="btn btn-primary mb-3 me-2"
        onClick={handleSaveCart}
        disabled={cart.length === 0}
      >
        Save Cart
      </button>
      <button
        className="btn btn-success mb-3"
        onClick={handleOrder}
        disabled={cart.length === 0}
      >
        Order
      </button>
      {cart.length === 0 ? (
        <div className="alert alert-info">Cart is empty.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th style={{ width: "160px" }}>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => decrementQuantity(item._id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => incrementQuantity(item._id)}
                  >
                    +
                  </button>
                </td>
                <td>${item.price}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: 400,
              background: "#fff",
              borderRadius: 8,
              padding: 24,
              textAlign: "center",
              zIndex: 1060,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              pointerEvents: "auto",
            }}
          >
            <h4>Order Confirmation</h4>
            <p>Your order has been placed successfully!</p>
            <button className="btn btn-success" onClick={handleConfirmOrder}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
