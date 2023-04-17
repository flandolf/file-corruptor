import { Card, ConfigProvider, Switch, Typography, theme } from 'antd';
import { useDarkMode } from './lib/darkModeContext';
const { defaultAlgorithm, darkAlgorithm } = theme;
import { useState } from 'react';
import FileCorruptionSettings from './components/FileSettings';
import FileUpload from './components/FileUpload';
const App = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    const [corruptionType, setCorruptionType] = useState('random');
    const [corruptionStrength, setCorruptionStrength] = useState(50);
    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
                token: {
                    colorPrimary: '#cc4f89',
                },
            }}
        >
            <Card className="container">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography.Title
                        style={{
                            margin: '0px',
                        }}
                        level={2}
                    >
                        File Corruptor
                    </Typography.Title>
                    <Switch
                        checked={darkMode}
                        checkedChildren={'Dark'}
                        unCheckedChildren={'Light'}
                        onChange={(checked) => {
                            setDarkMode(checked);
                            localStorage.setItem('darkMode', JSON.stringify(checked));
                        }}
                        style={{
                            padding: '0px',
                            margin: '0px',
                            alignSelf: 'center',
                        }}
                    />
                </div>
                <FileCorruptionSettings
                    corruptionType={corruptionType}
                    setCorruptionType={setCorruptionType}
                    corruptionStrength={corruptionStrength}
                    setCorruptionStrength={setCorruptionStrength}
                />
                <FileUpload corruptionType={corruptionType} corruptionStrength={corruptionStrength} />
                <footer>(c) 2023 Andy Wang</footer>
            </Card>
        </ConfigProvider>
    );
};

export default App;
