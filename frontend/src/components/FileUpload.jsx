import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const url = 'http://localhost:3000/';

function FileUpload({ corruptionType, corruptionStrength }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        setIsFileSelected(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        fetch(`${url}api/corrupt`, {
            method: 'POST',
            headers: {
                'corruption-type': corruptionType.toString(),
                'corruption-strength': parseInt(corruptionStrength),
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
            <h2>Upload File</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
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
                        document.getElementById('file').click();
                    }}
                >
                    <UploadOutlined />
                    Select File
                </Button>
                {isFileSelected ? <p style={{ marginTop: '10px' }}>{selectedFile.name}</p> : null}
                {isFileSelected ? (
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        icon={isLoading ? '' : <UploadOutlined />}
                    >
                        {isLoading ? 'Loading' : 'Get Corrupted File!'}
                    </Button>
                ) : null}
            </form>
            <Button
                danger
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
