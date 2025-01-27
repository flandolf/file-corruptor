import React, { useState } from 'react';
import { Button, Typography, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type FileUploadProps = {
    corruptionType: string;
    corruptionStrength: number;
};

const url = 'http://localhost:3000/';

function FileUpload({ corruptionType, corruptionStrength }: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file);
            setSelectedFile(file);
            setIsFileSelected(true);
        }
    };

    function corruptFile(file: File, corruptionStrength: number): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const uint8Array = new Uint8Array(arrayBuffer);

                // Simple corruption logic: flip bits based on corruptionStrength
                for (let i = 0; i < uint8Array.length; i++) {
                    if (Math.random() < corruptionStrength / 100) {
                        uint8Array[i] = ~uint8Array[i];
                    }
                }

                resolve(new Blob([uint8Array], { type: file.type }));
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    const handleSubmit = () => {
        if (!selectedFile) {
            return;
        }
        setIsLoading(true);
        corruptFile(selectedFile, 100)
            .then((corruptedBlob) => {
                const url = URL.createObjectURL(corruptedBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = selectedFile.name; // Use the original file name
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
                setIsLoading(false);
            })
            .catch((error) => {
                notification.error({
                    message: 'Error',
                    description: 'Error while processing file. ' + error,
                });
                setIsLoading(false);
            });
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                style={{
                    display: 'none',
                }}
                id="file"
            />
            <Button
                type="primary"
                onClick={() => {
                    document.getElementById('file')?.click();
                }}
                icon={<UploadOutlined />}
            >
                Upload File
            </Button>
            {isFileSelected ? <p style={{ marginTop: '10px' }}>{selectedFile?.name}</p> : null}
            {isFileSelected ? (
                <div>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={isLoading}
                        icon={isLoading ? undefined : <UploadOutlined />}
                    >
                        {isLoading ? 'Loading' : 'Get Corrupted File!'}
                    </Button>
                    <Button
                        danger
                        type="text"
                        onClick={() => {
                            setSelectedFile(null);
                            setIsFileSelected(false);
                        }}
                    >
                        Reset
                    </Button>
                </div>
            ) : null}
        </div>
    );
}

export default FileUpload;
