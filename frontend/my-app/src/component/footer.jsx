import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";
function Footer() {
  return (
    <footer className="bg-danger text-light text-center py-3 mt-auto">
      <p className="mb-0">
        &copy; {new Date().getFullYear()} Abdushekur’s Tutorial Hub. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
