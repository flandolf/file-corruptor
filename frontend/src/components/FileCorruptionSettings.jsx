import React, { useState } from "react";
import { Radio, Slider } from "antd";
function FileCorruptionSettings({
  corruptionType,
  setCorruptionType,
  corruptionStrength,
  setCorruptionStrength,
}) {
  const handleTypeChange = (event) => {
    setCorruptionType(event.target.value);
  };

  const handleStrengthChange = (event) => {
    setCorruptionStrength(event);
  };

  return (
    <div>
      <h2>Corruption Settings</h2>
      <form>
        <label htmlFor="type">Corruption Type:</label>
        <Radio.Group
          id="radio-group"
          defaultValue="random"
          onChange={handleTypeChange}
          buttonStyle="solid"
        >
          <Radio.Button value="random">Random</Radio.Button>
          <Radio.Button value="repeating">Repeating</Radio.Button>
          <Radio.Button value="missing">Missing</Radio.Button>
        </Radio.Group>
        <br />
        <label htmlFor="strength">Corruption Strength:</label>
        <Slider
          id="corruptionSlider"
          defaultValue={50}
          min={0}
          max={100}
          onChange={handleStrengthChange}
          disabled={false}
          trackStyle={{
            backgroundColor: "#1890ff",
          }}
        />
      </form>
    </div>
  );
}

export default FileCorruptionSettings;
