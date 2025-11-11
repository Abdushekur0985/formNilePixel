
import React from "react";

function LoginValidation(fieldName, value) {
  //validation email
  if (fieldName === "email") {
    if (!value) {
      return "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Invalid email format.";
    } else {
      return "";
    }
  }

  // Validation password
  if (fieldName === "password") {
    const minLength = 8;
    const maxLength = 20;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!value) {
      return "Password is required.";
    } else if (value.length < minLength || value.length > maxLength) {
      return "Password must be between 8 and 20 characters.";
    } else if (!specialChar.test(value)) {
      return "Password must contain at least one special character.";
    } else if (!lowerCase.test(value)) {
      return "Password must contain at least one lowercase letter.";
    } else if (!upperCase.test(value)) {
      return "Password must contain at least one uppercase letter.";
    } else if (!number.test(value)) {
      return "Password must contain at least one number.";
    } else {
      return "";
    }
  }

  // ✅ Default: no validation error for other fields
  return "";
}

export default LoginValidation;
