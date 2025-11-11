
import React, { useState, useEffect } from "react";

function ImageUpload() {
  const [file, setFile] = useState(null);
  function getFile(event) {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;
    // Validation rules
    const validTypes = ["image/jpeg", "image/png"];
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(uploadedFile.type)) {
      alert("Invalid file type. Please upload a JPEG or PNG image.");
      return;
    }

    if (uploadedFile.size > maxSizeInBytes) {
      alert("File is too large. Maximum size is 2MB.");
      return;
    }

    // if (!uploadedFile.name.startsWith("profile_")) {
    //   alert("Filename must start with 'profile_'.");
    //   return;
    // }

    setFile(URL.createObjectURL(uploadedFile));
  }

  useEffect(() => {
    // Cleanup to prevent memory leaks
    return () => {
      if (file) URL.revokeObjectURL(file);
    };
  }, [file]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={getFile} />
      {file && <img src={file} alt="Preview" width="200" />}
    </div>
  );
}

export default ImageUpload;
