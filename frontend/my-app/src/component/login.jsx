// src/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginValidation from "./loginValidation";
import axios from "axios";

function Login() {
  const [value, setValue] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // ✅ Ensure cookies are sent with requests
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue({ ...value, [name]: inputValue });

    const error = LoginValidation(name, inputValue);
    if (name === "email") setEmailError(error);
    if (name === "password") setPasswordError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || passwordError || !value.email || !value.password) {
      toast.error("Invalid email or password!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      //  Send login request with credentials included
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
        credentials: "include" //  Required for cookie-based auth
      });

      if (response.ok) {
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        setValue({ email: "", password: "" });

        //  Redirect after short delay
        setTimeout(() => navigate("/tutorial"), 2000);
      } else {
        toast.error("Invalid credentials!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Server error. Please try again later.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center text-white"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(135deg, #1b0034, #2e005f, #4b0082), url('https://images.unsplash.com/photo-1477847616630-cf9cf8815fda?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "400px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h2 className="text-center fw-bold mb-3" style={{ color: "#fff" }}>
          Sign In
        </h2>
        <p className="text-center text-light mb-4">
          Welcome back! Please log in to your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={value.email}
              onChange={handleChange}
              className="form-control form-control-lg bg-transparent text-white"
              placeholder="Enter your email"
              style={{
                borderRadius: "12px",
                border: "1px solid black",
              }}
            />
            {emailError && (
              <small className="text-danger">{emailError}</small>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label text-light fw-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={value.password}
              onChange={handleChange}
              className="form-control form-control-lg bg-transparent text-white"
              placeholder="Enter your password"
              style={{
                borderRadius: "12px",
                border: "1px solid black",
              }}
            />
            {passwordError && (
              <small className="text-danger">{passwordError}</small>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold shadow-sm"
            style={{
              background: "linear-gradient(90deg, #7b2ff7, #f107a3)",
              borderRadius: "25px",
              color: "#fff",
            }}
          >
            Sign In
          </button>
          <p className="text-center mt-2">
              <Link to="/forgotPassword" className="text-primary text-decoration-none ">Forgot Password?</Link>
         </p>
    
          <div className="text-center mt-4">
            <p className="text-light mb-2">Or continue with</p>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-light px-3 py-2 rounded-pill"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                  alt="Google"
                  width="20"
                  className="me-2"
                />
                <a href="https://myaccount.google.com" target="_blank" className="text-black text-decoration-none">Google Account</a>

                
              </button>
              <button
                type="button"
                className="btn btn-primary px-3 py-2 rounded-pill"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  width="20"
                  className="me-2"
                />
                <a href="https://web.facebook.com/abdushakuur.mohammed.1" className="text-black text-decoration-none">Facebook</a>
              </button>
            </div>
          </div>
          <p className="text-center mt-4 text-light">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-decoration-none fw-semibold"
              style={{ color: "#b388ff" }}
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default Login;
