import { useState, useRef } from 'react';
import { uploadAndProcessDocument, submitSummaryFeedback } from '../apis/summarizerApi';
import { SUMMARY_DECISIONS } from '../constants/summaryConstants';
import './Summarizer.css';

const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [showAcceptReject, setShowAcceptReject] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.txt'))) {
      setPdfFile(file);
      setError('');
    } else {
      setError('Please select a valid PDF or TXT file.');
      setPdfFile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSummary('');
    setShowAcceptReject(false);
    setThreadId(null);
    setSuccessMessage('');

    try {
      if (!pdfFile) {
        throw new Error('Please upload a PDF or TXT file.');
      }
      
      const data = await uploadAndProcessDocument(pdfFile);
      
      if (data.summary) {
        setSummary(data.summary);
        setThreadId(data.threadId);
        setShowAcceptReject(true);
      } else {
        throw new Error('No summary received from the server.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating the summary.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (accepted) => {
    setIsSubmittingFeedback(true);
    setError('');
    setSuccessMessage('');

    try {
      const data = await submitSummaryFeedback(threadId, accepted);
      
      if (data.success) {
        setSuccessMessage(data.message);
        // Clear form after a short delay to show the success message
        setTimeout(() => {
          setShowAcceptReject(false);
          setSummary('');
          setPdfFile(null);
          setThreadId(null);
          setSuccessMessage('');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 100000);
      } else {
        throw new Error(data.message || 'An error occurred while submitting feedback.');
      }
      
    } catch (err) {
      setError(err.message || 'An error occurred while submitting feedback.');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const clearAll = () => {
    setPdfFile(null);
    setSummary('');
    setError('');
    setShowAcceptReject(false);
    setThreadId(null);
    setSuccessMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="summary-generator">
      <div className="container">
        <header className="header">
          <h1>AI Summary Generator</h1>
          <p>Upload a PDF or TXT file to generate a comprehensive summary</p>
        </header>

        <div className="input-section">
          <form onSubmit={handleSubmit} className="input-form">
            <div className="pdf-input-container">
              <label htmlFor="pdfInput" className="input-label">
                Upload your PDF or TXT file:
              </label>
              <div className="file-upload-area">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="pdfInput"
                  accept=".pdf,.txt"
                  onChange={handleFileChange}
                  className="file-input"
                  required
                />
                <div className="upload-placeholder">
                  <div className="upload-icon">📄</div>
                  <p>Click to select a PDF or TXT file</p>
                  <p className="upload-hint">or drag and drop here</p>
                </div>
                {pdfFile && (
                  <div className="file-info">
                    <span className="file-name">✓ {pdfFile.name}</span>
                    <span className="file-size">
                      ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <div className="action-buttons">
              <button
                type="submit"
                className="generate-btn"
                disabled={isLoading || !pdfFile}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Generating Summary...
                  </>
                ) : (
                  'Generate Summary'
                )}
              </button>
              
              <button
                type="button"
                className="clear-btn"
                onClick={clearAll}
                disabled={isLoading}
              >
                Clear All
              </button>
            </div>
          </form>
        </div>

        {summary && (
          <div className="summary-section">
            <h2>Generated Summary</h2>
            <div className="summary-content">
              <p>{summary}</p>
            </div>
            
            {showAcceptReject ? (
              <div className="feedback-section">
                <h3>Do you want to accept this summary?</h3>
                <div className="feedback-buttons">
                  <button
                    className="accept-btn"
                    onClick={() => handleFeedback(true)}
                    disabled={isSubmittingFeedback}
                  >
                    {isSubmittingFeedback ? (
                      <>
                        <span className="loading-spinner"></span>
                        Submitting...
                      </>
                    ) : (
                      '✅ Accept Summary'
                    )}
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleFeedback(false)}
                    disabled={isSubmittingFeedback}
                  >
                    {isSubmittingFeedback ? (
                      <>
                        <span className="loading-spinner"></span>
                        Submitting...
                      </>
                    ) : (
                      '❌ Reject Summary'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="summary-actions">
                <button
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText(summary)}
                >
                  📋 Copy Summary
                </button>
                <button
                  className="download-btn"
                  onClick={() => {
                    const blob = new Blob([summary], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'summary.txt';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  💾 Download Summary
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
