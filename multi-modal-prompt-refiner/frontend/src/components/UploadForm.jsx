import { refinePrompt } from "../services/api";
import { useState } from "react";
import { 
  Sparkles, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Zap,
  X,
  Shield,
  Clock,
  Lock,
  Wand2
} from "lucide-react";
import "./UploadForm.css";

export default function UploadForm({ setOutput, setError }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [file, setFile] = useState(null);
  const [textLength, setTextLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSize(formatFileSize(selectedFile.size));
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setFileSize("");
    // Reset file input
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type === 'application/pdf')) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setFileSize(formatFileSize(droppedFile.size));
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setTextLength(e.target.value.length);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData();
    
    // Add text description
    if (text.trim()) {
      formData.append('text', text);
    } else {
      setError('Please provide a text description');
      setIsLoading(false);
      return;
    }
    
    // Add file if exists
    if (file) {
      formData.append('file', file);
    }

    try {
      console.log('Submitting form with:', {
        text: text.substring(0, 50) + '...',
        file: file ? `${file.name} (${file.type})` : 'No file'
      });
      
      const result = await refinePrompt(formData);
      console.log('API Response:', result);
      setOutput(result);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Failed to refine prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      {/* Background Blobs */}
      
 <div className="header-icon">
          <Wand2 />
        </div>
      <div className="upload-header">
       
        <h1 className="header-title">Multi Modal Prompt Refiner</h1>
        <p className="header-subtitle">
          Transform your ideas into perfectly optimized AI prompts with our advanced refinement engine
        </p>
      </div>

      <div className="upload-main">
        <div className="form-card">
          {/* Loading Overlay */}
          <div className={`loading-overlay ${isLoading ? 'active' : ''}`}>
            <div className="loading-content">
              <Wand2 />
              <div className="loading-text">Refining your prompt...</div>
            </div>
          </div>

          <h2 className="form-title">
            <Sparkles />
            Create Your Prompt
          </h2>
          
          <form onSubmit={handleSubmit} className="upload-form">
            {/* Text Area */}
            <div className="form-group">
              <label className="form-label">Description *</label>
              <div className="textarea-container">
                <textarea
                  name="text"
                  value={text}
                  placeholder="Describe what you want to create... Include details about features, style, audience, and goals."
                  className="form-textarea"
                  required
                  onChange={handleTextChange}
                  minLength={10}
                  maxLength={5000}
                />
                <div className="textarea-counter">{textLength}/5000 characters</div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="file-upload-container">
              <label className="form-label">Visual Reference (Optional)</label>
              <div 
                className={`file-upload-wrapper ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
                style={{ cursor: 'pointer' }}
              >
                <input
                  type="file"
                  name="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="file-input"
                  id="file-input"
                  style={{ display: 'none' }}
                />
                
                <div className="file-upload-area">
                  <div className="upload-icon-small">
                    <Upload />
                  </div>
                  
                  <div className="upload-text-small">
                    <h4>Upload image or PDF</h4>
                    <p>Drag & drop or click to browse</p>
                  </div>
                </div>
              </div>
              <p className="file-upload-hint">Supports JPG, PNG, PDF • Max 10MB</p>
            </div>

            {/* File Selected Display */}
            {fileName && (
              <div className="file-selected">
                <div className="file-selected-content">
                  <div className="file-selected-icon">
                    <FileText />
                  </div>
                  <div className="file-selected-info">
                    <div className="file-selected-name">{fileName}</div>
                    <div className="file-selected-size">{fileSize}</div>
                  </div>
                  <button 
                    type="button" 
                    className="remove-file-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="submit-button"
            >
              <div className="button-shine"></div>
              <div className="submit-content">
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap />
                    <span>Refine Prompt</span>
                  </>
                )}
              </div>
            </button>
            
            {/* Debug Info (Remove in production) */}
            {process.env.NODE_ENV === 'development' && (
              <div style={{ 
                marginTop: '20px', 
                padding: '10px', 
                background: '#f5f5f5', 
                borderRadius: '8px',
                fontSize: '12px',
                color: '#666'
              }}>
                <div><strong>Debug Info:</strong></div>
                <div>Text length: {textLength}</div>
                <div>File: {fileName || 'None'}</div>
                <div>File size: {fileSize || 'N/A'}</div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="upload-footer">
        <p>Your data is processed securely and never stored</p>
        <div className="security-badges">
          <div className="security-badge">
            <Shield />
            <span>Secure</span>
          </div>
          <div className="security-badge">
            <Lock />
            <span>Private</span>
          </div>
          <div className="security-badge">
            <Clock />
            <span>Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
}