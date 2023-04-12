import React, { useState } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch("http://localhost:3000/api/corrupt", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `corrupted_${selectedFile.name}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            display: "none",
          }}
          id="file"
        />
        <Button
          type="primary"
          onClick={() => {
            document.getElementById("file").click();
          }}
        >
          <UploadOutlined />
          Select File
        </Button>
        {isFileSelected ? (
          <Button type="primary" htmlType="submit">
            Get Corrupted File!
          </Button>
        ) : null}
      </form>
      <Button
        type="primary"
        onClick={() => {
          setSelectedFile(null);
          setIsFileSelected(false);
        }}
      >
        Reset
      </Button>
    </div>
  );
}

export default FileUpload;
