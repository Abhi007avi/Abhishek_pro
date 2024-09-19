import React, { useState } from 'react';

const AddDocumentForm = () => {
  const [documentName, setDocumentName] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [description, setDescription] = useState('');
  const [documentDepartment, setDocumentDepartment] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentRevision, setDocumentRevision] = useState('');
  const [documentCode, setDocumentCode] = useState('');
  const [revisionDate, setRevisionDate] = useState('');

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  // Helper function to format date to YYYY-MM-DD
  const formatDateToMySQL = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Add leading 0 to month
    const day = (`0${date.getDate()}`).slice(-2); // Add leading 0 to day
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentFile) {
      alert('Please upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('documentName', documentName);
    formData.append('documentFile', documentFile);
    formData.append('description', description);
    formData.append('documentDepartment', documentDepartment);
    formData.append('documentType', documentType);
    formData.append('documentRevision', documentRevision);
    formData.append('documentCode', documentCode);
    
    // Format the revision date before appending it
    const formattedDate = formatDateToMySQL(revisionDate);
    formData.append('revisionDate', formattedDate);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file.');
      }

      const result = await response.json();
      console.log('Success:', result);

      // Reset form fields after successful submission
      setDocumentName('');
      setDocumentFile(null);
      setDescription('');
      setDocumentDepartment('');
      setDocumentType('');
      setDocumentRevision('');
      setDocumentCode('');
      setRevisionDate('');
     
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal fade" id="addDocumentModal" tabIndex="-1" aria-labelledby="addDocumentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addDocumentModalLabel">Add New Document</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="documentName">Document Name</label>
                <input
                  type="text"
                  id="documentName"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="documentRevision">Document Revision</label>
                <input
                  type="text"
                  id="documentVersion"
                  value={documentRevision}
                  onChange={(e) => setDocumentRevision(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="documentCode">Document Code</label>
                <input
                  type="text"
                  id="documentCode"
                  value={documentCode}
                  onChange={(e) => setDocumentCode(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="revisionDate">Revision Date</label>
                <input
                  type="date"
                  id="revisionDate"
                  value={revisionDate}
                  onChange={(e) => setRevisionDate(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="documentDepartment">Department</label>
                <select
                  id="documentDepartment"
                  value={documentDepartment}
                  onChange={(e) => setDocumentDepartment(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">Select a Department</option>
                  <option value="Department1">Department 1</option>
                  <option value="Department2">Department 2</option>
                  <option value="Department3">Department 3</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="documentType">Document Type</label>
                <select
                  id="documentType"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">Select a Type</option>
                  <option value="Type1">SOP</option>
                  <option value="Type2">Report</option>
                  <option value="Type3">Chart</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="documentFile">Upload Document</label>
                <input
                  type="file"
                  id="documentFile"
                  onChange={handleFileChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Document
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentForm;
