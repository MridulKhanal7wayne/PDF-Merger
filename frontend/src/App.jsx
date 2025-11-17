import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!files || files.length < 2) {
    alert("Please select at least 2 PDF files to merge.");
    return;
  }

  setLoading(true);
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("pdfs", files[i]);
  }

  try {
    const response = await fetch("http://localhost:5000/merge", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
     
      const text = await response.text();
      console.error("Merge failed, server returned:", response.status, text);
      throw new Error(`Server error: ${response.status} ${text}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "merged.pdf";
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    alert(" PDF merged successfully!");
  } catch (err) {
    console.error("Error in handleSubmit:", err);
    alert(" Error merging PDFs. See console for details.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-primary" href="#">
            <i className="fa fa-file-pdf-o"></i> PDF_M
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-5">
        <h1 className="fw-bold text-primary">
          <i className="fa fa-file-pdf-o"></i> Merge Your PDFs Seamlessly
        </h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
          Upload multiple PDF files and merge them instantly — secure, fast, and
          free. No sign-up needed!
        </p>
      </section>

      {/* Upload  */}
      <div
        className="card p-4 shadow-lg mx-auto"
        style={{ maxWidth: "550px", borderRadius: "16px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputGroupFile02" className="form-label fw-semibold">
              Select your PDF files
            </label>
            <div className="input-group">
              <input
                type="file"
                multiple
                accept=".pdf"
                className="form-control"
                id="inputGroupFile02"
                onChange={handleFileChange}
                required
              />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                <i className="fa fa-upload"></i>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Merging PDFs...
              </>
            ) : (
              <>
                <i className="fa fa-layer-group me-2"></i> Merge PDFs
              </>
            )}
          </button>
        </form>
      </div>

      {/* About */}
      <section id="about" className="text-center py-5 bg-white mt-5">
        <div className="container">
          <h2 className="text-primary fw-bold mb-3">About PDF_M</h2>
          <p
            className="text-secondary mx-auto"
            style={{ maxWidth: "700px" }}
          >
            PDF_M is your go-to PDF merger tool designed for simplicity and
            security. Whether you’re combining study notes, reports, or
            presentations, our lightweight web tool makes it fast and reliable.
          </p>

          <div className="row mt-5">
            <div className="col-md-4">
              <i className="fa fa-lock text-primary fa-2x mb-3"></i>
              <h5>Secure</h5>
              <p>Your files are processed securely and never stored permanently.</p>
            </div>
            <div className="col-md-4">
              <i className="fa fa-bolt text-primary fa-2x mb-3"></i>
              <h5>Fast</h5>
              <p>Merge PDFs instantly with no extra steps or sign-ups.</p>
            </div>
            <div className="col-md-4">
              <i className="fa fa-globe text-primary fa-2x mb-3"></i>
              <h5>Accessible</h5>
              <p>Works on all devices — no installation required.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-3 text-secondary">
        © 2025 PDF_M | Made by Wayne Enterprises
      </footer>
    </div>
  );
}
