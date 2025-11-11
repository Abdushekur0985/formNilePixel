
// ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/forgotPassword", { email }, {
        withCredentials: true,
      });
      setMessage(res.data.message || "If this email is registered, a reset link was sent.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4 text-primary">Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Registered Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" enabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <div className="alert alert-info text-center mt-3" role="alert">
            {message}
          </div>
        )}

        <p className="text-center mt-3 mb-0">
          <a href="/resetPassword" className="text-decoration-none text-primary">
           you need to reset your password?
          </a>
        </p>
      </div>
    </div>
  );
}
export default ForgotPassword;
