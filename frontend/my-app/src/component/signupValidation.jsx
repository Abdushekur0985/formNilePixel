import React from "react";

function SignupValidation(fieldName, value, allValues = {}) {
  // Name validation
  if (fieldName === "name") {
    if (!value.trim()) {
      return "Name is required.";
    } else if (value.trim().length < 2) {
      return "Name must be at least 2 characters long.";
    } else {
      return "";
    }
  }

  // Email validation
  if (fieldName === "email") {
    if (!value.trim()) {
      return "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email format (e.g. example@gmail.com).";
    } else {
      return "";
    }
  }

  // Password validation
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
      return "Password must be 8–20 characters long.";
    } else if (!upperCase.test(value)) {
      return "Password must contain at least one uppercase letter.";
    } else if (!lowerCase.test(value)) {
      return "Password must contain at least one lowercase letter.";
    } else if (!number.test(value)) {
      return "Password must contain at least one number.";
    } else if (!specialChar.test(value)) {
      return "Password must contain at least one special character.";
    } else {
      return "";
    }
  }

  //  Confirm Password validation
  if (fieldName === "confirmPassword") {
    if (!value) {
      return "Please confirm your password.";
    } else if (value !== allValues.password) {
      return "Passwords do not match.";
    } else {
      return "";
    }
  }

  return "";
}

export default SignupValidation;
