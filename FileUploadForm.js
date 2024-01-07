import React, { useState } from 'react';
import axios from 'axios';
import './FileUploadForm.css';

function FileUploadForm() {
    const [images, setImages] = useState([]);
    const [firstFile, setFirstFile] = useState(null);
    const [secondFile, setSecondFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        const formData = new FormData();
        images.forEach(image => {
            formData.append('images', image);
        });
        if (firstFile) {
            formData.append('firstFile', firstFile);
        }
        if (secondFile) {
            formData.append('secondFile', secondFile);
        }

        try {
            await axios.post('http://localhost:3002/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Files uploaded successfully!');
        } catch (error) {
            setIsError(true);
            setMessage('Error uploading files. Please try again.');
        }
    };

    return (
        <div className="container">
            <form id="uploadForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                <h2>Upload Files</h2>
                <div className="form-group">
                    <label htmlFor="images">Upload Images:</label>
                    <input 
                        type="file" 
                        id="images" 
                        name="images" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => setImages([...e.target.files])}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstFile">Upload First File (docx, pdf, txt):</label>
                    <input 
                        type="file" 
                        id="firstFile" 
                        name="firstFile" 
                        accept=".docx,.pdf,.txt" 
                        onChange={(e) => setFirstFile(e.target.files[0])}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="secondFile">Upload Second File (docx, pdf, txt):</label>
                    <input 
                        type="file" 
                        id="secondFile" 
                        name="secondFile" 
                        accept=".docx,.pdf,.txt" 
                        onChange={(e) => setSecondFile(e.target.files[0])}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && (
                <div className={`message ${isError ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default FileUploadForm;
