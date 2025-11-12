import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css"; 
import { Link } from "react-router-dom";
function Signup() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageProfile: null,
  });

  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);

    if (value.password !== value.confirmPassword) {
      toast.error("Passwords do not match");
      setIsSigningUp(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("email", value.email);
      formData.append("password", value.password);
      formData.append("confirmPassword", value.confirmPassword);
      formData.append("imageProfile", value.imageProfile);

      const response = await axios.post("http://localhost:3000/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setValue({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          imageProfile: null,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6">
        <h2 className="text-center text-success mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="form-container text-light">
          {/* Profile Image */}
          <div className="mb-3 text-center">
            <label className="form-label d-block mb-3">Student Profile</label>

            {/* Hidden File Input */}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) =>
                setValue({ ...value, imageProfile: e.target.files[0] })
              }
              required
            />

            {/* Preview */}
            {value.imageProfile && (
              <div className="text-center mt-3">
                <img
                  src={URL.createObjectURL(value.imageProfile)}
                  alt="preview"
                  width="100"
                  height="100"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              </div>
            )}

            {/* Custom Upload Button */}
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {value.imageProfile ? "Change Image" : "Upload Profile Image"}
            </button>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={value.confirmPassword}
              onChange={(e) =>
                setValue({ ...value, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          {/* Submit */}
          <button
  type="submit"
  className="btn btn-success w-100 d-flex justify-content-center align-items-center"
  disabled={isSigningUp}
>
  {isSigningUp ? (
    <>
      <div
        className="spinner-border spinner-border-sm me-2"
        role="status"
      ></div>
      Signing up...
    </>
  ) : (
    "Sign Up"
  )}
</button>
<Link to="/login" className="text-primary text-decoration-none">
Already have an account? Log in
</Link>

        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
