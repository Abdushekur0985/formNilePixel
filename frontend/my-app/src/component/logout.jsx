
// Logout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function Logout() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("https://abdushekurs-tutor-hub.onrender.com/logout", {}, { withCredentials: true });
      toast.success("✅ Logged out successfully");
      navigate("/signup");
    } catch (err) {
      toast.error("❌ Logout failed");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <button className="btn btn-outline-danger" onClick={() => setShowModal(true)}>
        Logout
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out of your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
