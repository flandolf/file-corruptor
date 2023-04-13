import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import FileCorruptionSettings from "./components/FileCorruptionSettings";

function App() {
  const [corruptionType, setCorruptionType] = useState("random");
  const [corruptionStrength, setCorruptionStrength] = useState(50);

  return (
    <div className="App">
      <h1>File Corruptor</h1>
      <FileCorruptionSettings
        corruptionType={corruptionType}
        setCorruptionType={setCorruptionType}
        corruptionStrength={corruptionStrength}
        setCorruptionStrength={setCorruptionStrength}
      />
      <FileUpload
        corruptionType={corruptionType}
        corruptionStrength={corruptionStrength}
      />
    </div>
  );
}

export default App;
