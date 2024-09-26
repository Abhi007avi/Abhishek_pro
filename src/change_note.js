import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChangeNoteForm = ({ departments, onSubmit }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('');
  const [causeOfChange, setCauseOfChange] = useState('');
  const [note, setNote] = useState('');

  // Fetch documents based on the selected department
  useEffect(() => {
    if (selectedDepartment) {
      axios.get(`/documents/department/${selectedDepartment}`)
        .then((response) => {
          setDocuments(response.data);
        })
        .catch((error) => {
          console.error('Error fetching documents:', error);
        });
    } else {
      setDocuments([]);
    }
  }, [selectedDepartment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      department: selectedDepartment,
      document: selectedDocument,
      version: selectedVersion,
      causeOfChange,
      note
    });
    // Reset form fields
    setSelectedDepartment('');
    setSelectedDocument('');
    setSelectedVersion('');
    setCauseOfChange('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="change-note-form">
      {/* Department Selection */}
      <div className="mb-3">
        <label htmlFor="department" className="form-label">Select Department:</label>
        <select
          id="department"
          className="form-select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          required
        >
          <option value="">--Select Department--</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Document Selection */}
      <div className="mb-3">
        <label htmlFor="document" className="form-label">Select Document:</label>
        <select
          id="document"
          className="form-select"
          value={selectedDocument}
          onChange={(e) => setSelectedDocument(e.target.value)}
          required
        >
          <option value="">--Select Document--</option>
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Document Version */}
      <div className="mb-3">
        <label htmlFor="version" className="form-label">Select Version:</label>
        <select
          id="version"
          className="form-select"
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          required
        >
          <option value="">--Select Version--</option>
          {/* You can dynamically load document versions */}
          <option value="1.0">Version 1.0</option>
          <option value="2.0">Version 2.0</option>
          <option value="3.0">Version 3.0</option>
        </select>
      </div>

      {/* Cause of Change */}
      <div className="mb-3">
        <label htmlFor="causeOfChange" className="form-label">Cause of Change:</label>
        <input
          id="causeOfChange"
          type="text"
          className="form-control"
          value={causeOfChange}
          onChange={(e) => setCauseOfChange(e.target.value)}
          placeholder="Enter the cause of change"
          required
        />
      </div>

      {/* Note */}
      <div className="mb-3">
        <label htmlFor="note" className="form-label">Change Note:</label>
        <textarea
          id="note"
          className="form-control"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter the updated note"
          rows="4"
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ChangeNoteForm;
