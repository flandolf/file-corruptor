import React from "react";
import FileUpload from "./components/FileUpload";
import FileCorruptionSettings from "./components/FileCorruptionSettings";


function App() {
  return (
    <div className="App">
      <h1>File Corruptor</h1>
      <FileUpload />
      <FileCorruptionSettings />
    </div>
  );
}

export default App;
