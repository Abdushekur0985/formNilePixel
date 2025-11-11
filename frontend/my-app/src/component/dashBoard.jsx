import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./dashBoard.css";

function DashBoard() {
  return (
    <>
      {/*Modern Navbar*/}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">Abdushekur's  tutorial Hub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="dashboard-hero">
        <h1>Welcome to Abdushekur's Tutorial Hub</h1>
        
        <p>
          I provide <strong>personalized tutoring services</strong> and build
          <strong> appealing, functional websites</strong> tailored to your needs.
        </p>
        <div className="cta-buttons">
          <Button variant="primary" href="/signup" className="me-3">
            Get Started
          </Button>
          <Button variant="outline-light" href="/login">
            Already have an account?
          </Button>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
