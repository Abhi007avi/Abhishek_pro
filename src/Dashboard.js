import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Custom CSS for additional styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList, faFileLines, faSliders, faUser, faShareNodes, faMoon, faSun,} from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import AddDocumentForm from './AddDocument';
import company_logo from './assets/company_logo.png';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [showModal, setShowModal] = useState(false);
  // Fetch the list of uploaded documents when the component mounts
  const [selectedDepartment, setSelectedDepartment] = useState('');
  
  useEffect(() => {
    if (selectedDepartment) {
      fetch(`http://localhost:5000/documents/department/${selectedDepartment}`)
        .then(response => response.json())
        .then(data => setDocuments(data))
        .catch(error => console.error('Error fetching documents:', error));
    }
  }, [selectedDepartment]);

  const handleViewDocument = (doc) => {
    
    setSelectedDocument(doc);
    setShowModal(true);
    
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value); // Update selected department
  };

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <aside id="sidebar" className="js-sidebar">
        <div className="h-100">
          <div className="sidebar-logo">
            
            <img src={company_logo} alt="BigCo Inc. logo"/>
          </div>
          <ul className="sidebar-nav">
           
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <FontAwesomeIcon icon={faList} className="pe-2" />
                Dashboard
              </a>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#pages"
                data-bs-toggle="collapse"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faFileLines} className="pe-2" />
                Pages
              </a>
              <ul id="pages" className="sidebar-dropdown list-unstyled collapse">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Page 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Page 2</a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#posts"
                data-bs-toggle="collapse"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faSliders} className="pe-2" />
                Posts
              </a>
              <ul id="posts" className="sidebar-dropdown list-unstyled collapse">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Post 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Post 2</a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#auth"
                data-bs-toggle="collapse"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faUserRegular} className="pe-2" />
                Auth
              </a>
              <ul id="auth" className="sidebar-dropdown list-unstyled collapse">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Login</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Register</a>
                </li>
              </ul>
            </li>
            <li className="sidebar-header">Multi-Level Menu</li>
            <li className="sidebar-item">
              <a
                href="#"
                className="sidebar-link collapsed"
                data-bs-target="#multi"
                data-bs-toggle="collapse"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faShareNodes} className="pe-2" />
                Multi Dropdown
              </a>
              <ul id="multi" className="sidebar-dropdown list-unstyled collapse">
                <li className="sidebar-item">
                  <a
                    href="#"
                    className="sidebar-link collapsed"
                    data-bs-target="#level-1"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                  >
                    Level 1
                  </a>
                  <ul id="level-1" className="sidebar-dropdown list-unstyled collapse">
                    <li className="sidebar-item">
                      <a href="#" className="sidebar-link">Level 1.1</a>
                    </li>
                    <li className="sidebar-item">
                      <a href="#" className="sidebar-link">Level 1.2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main">
        {/* Navbar */}
        <nav className="navbar navbar-expand px-3 border-bottom">
          <button className="btn" id="sidebar-toggle" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a href="#" className="nav-icon" data-bs-toggle="dropdown">
                  <img
                    src="image/profile.jpg"
                    className="avatar img-fluid rounded"
                    alt="Profile"
                  />
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" className="dropdown-item">Profile</a>
                  <a href="#" className="dropdown-item">Settings</a>
                  <a href="#" className="dropdown-item">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="content px-3 py-2">
  <div className="container-fluid">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4>Admin Dashboard</h4>
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDocumentModal">
        Add Document
      </button>
    </div>


    <div className="mb-3">
              <label htmlFor="departmentSelect" className="form-label">Select Department:</label>
              <select
                id="departmentSelect"
                className="form-select"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
              >
                <option value="">Select a department</option>
                <option value="Department1">Department 1</option>
                <option value="Department2">Department 2</option>
                <option value="Department3">Department 3</option>
                <option value="Department4">Department 4</option>
              </select>
            </div>

    {/* Document Table */}
    <div className="card border-0">
      <div className="card-header">
        <h5 className="card-title" style={{textAlign: "center"}}>{selectedDepartment} Document List</h5>
        <div style={{ textAlign: "left" }}>
    <p>STPPL / QA / LT / 01</p>
    <p>Rev. No.: 28</p>
    <p>Rev. Date: 01.02.2024</p>
   
  </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">SR.NO</th>
              <th scope="col">Document Name</th>
              <th scope="col">Code</th>
              <th scope="col">Revision</th>
              <th scope="col">Revision Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{doc.document_name}</td>
                <td>{doc.document_code}</td>
                <td>{doc.document_revision}</td>
                <td>{new Date(doc.revision_date).toLocaleDateString()}</td>
                <td>
                  <button className="btn-sm btn-primary" onClick={() => handleViewDocument(doc)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>


        {/* Add Document Modal */}
        <AddDocumentForm />


        <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        id="viewDocumentModal"
        tabIndex="-1"
        aria-labelledby="viewDocumentModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewDocumentModalLabel">View Document</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              
              {selectedDocument ? (
                <DocViewer
                documents={[{
                  uri: `http://localhost:5000/document/${selectedDocument.document_name}`,
                   fileType:"xlsx",
                    fileName: "equpment.xlsx"
                }]}
                pluginRenderers={DocViewerRenderers}
              />
              ) : (
                <p>No document selected</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    
    


        {/* Theme Toggle */}
        <a href="#" className="theme-toggle">
          <FontAwesomeIcon icon={faMoon} />
          <FontAwesomeIcon icon={faSun} />
        </a>

        {/* Footer */}
        <footer className="footer">
          <div className="container-fluid">
            <div className="row text-muted">
              <div className="col-6 text-start">
                <p className="mb-0">
                  <a href="#" className="text-muted">
                    <strong>DMS</strong>
                  </a>
                </p>
              </div>
              <div className="col-6 text-end">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">Contact</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">About Us</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">Terms</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-muted">Booking</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
