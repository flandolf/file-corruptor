import React, { useState } from 'react';
import { Radio, Slider, Typography } from 'antd';

interface FileCorruptionSettingsProps {
  corruptionType: string;
  setCorruptionType: (type: string) => void;
  corruptionStrength: number;
  setCorruptionStrength: (strength: number) => void;
}

const FileCorruptionSettings: React.FC<FileCorruptionSettingsProps> = ({
  corruptionType,
  setCorruptionType,
  corruptionStrength,
  setCorruptionStrength,
}) => {
  const handleTypeChange = (event: any) => {
    setCorruptionType(event.target.value);
  };

  const handleStrengthChange = (event: any) => {
    setCorruptionStrength(event);
  };

  return (
    <div>
        <Typography.Paragraph>Corruption Type:</Typography.Paragraph>
        <Radio.Group
          id="radio-group"
          defaultValue="random"
          onChange={handleTypeChange}
          buttonStyle="solid"
          style={{
            marginBottom: '5px',
          }}
        >
          <Radio.Button value="random">Random</Radio.Button>
          <Radio.Button value="repeating">Repeating</Radio.Button>
          <Radio.Button value="missing">Missing</Radio.Button>
        </Radio.Group>

        <Typography.Paragraph>Corruption Strength:</Typography.Paragraph>
        <Slider
          id="corruptionSlider"
          defaultValue={50}
          min={0}
          max={100}
          onChange={handleStrengthChange}
          disabled={false}
          trackStyle={{
            backgroundColor: '#cc4f89',
          }}
        />
    </div>
  );
};

export default FileCorruptionSettings;
