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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) {
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        fetch(`${url}api/corrupt`, {
            method: 'POST',
            headers: {
                'corruption-type': corruptionType.toString(),
                'corruption-strength': corruptionStrength.toString(),
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    notification.error({
                        message: 'Error',
                        description: 'Error while processing request.',
                    });
                    throw new Error('Error downloading the file');
                }
                return response.blob();
            })
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'corrupted-file'; // Set the desired file name
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch((error) => {
                notification.error({
                    message: 'Error',
                    description: 'Error while processing request. ' + error,
                });
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
                        onClick={() => {
                            handleSubmit;
                        }}
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
