import { BrowserRouter, Routes, Route } from "react-router-dom";
import CitizenPortal from "./pages/CitizenPortal";

function LandingPage() {
  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">✦</span>
          CivicPulse <span>AI</span>
        </div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#how">How it works</a>

          <a href="/citizen" className="nav-button">
            Government Portal
          </a>
        </div>
      </nav>

      <main className="hero">

        <div className="hero-content">

          <div className="badge">
            ● DIGITAL PUBLIC GOOD
          </div>

          <h1>
            Turning citizen voices
            <br />
            into <span>better decisions.</span>
          </h1>

          <p>
            CivicPulse AI transforms multilingual citizen feedback into
            actionable insights, helping governments identify infrastructure
            needs and prioritize high-impact investments.
          </p>

          <div className="hero-buttons">

            <a
              href="/citizen"
              className="primary-button"
            >
              Report an Issue →
            </a>

            <button className="secondary-button">
              View Government Dashboard
            </button>

          </div>

          <div className="trust-row">

            <div>
              <strong>95%+</strong>
              <span>Citizen Coverage</span>
            </div>

            <div>
              <strong>94.5%</strong>
              <span>Classification Accuracy</span>
            </div>

            <div>
              <strong>50K</strong>
              <span>Requests / Minute</span>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="visual-card">

            <div className="card-header">

              <div>
                <small>LIVE CIVIC INTELLIGENCE</small>
                <h3>Infrastructure Demand</h3>
              </div>

              <div className="status-dot">
                ● Live
              </div>

            </div>

            <div className="map-placeholder">

              <div className="map-grid"></div>

              <div className="map-point point-1">●</div>
              <div className="map-point point-2">●</div>
              <div className="map-point point-3">●</div>
              <div className="map-point point-4">●</div>

              <div className="map-label">
                <strong>High Demand Area</strong>
                <span>Water • 87 Priority</span>
              </div>

            </div>

            <div className="insight-row">

              <div>
                <span>Citizen Requests</span>
                <strong>12,482</strong>
              </div>

              <div>
                <span>Priority Issues</span>
                <strong>183</strong>
              </div>

              <div>
                <span>Resolved</span>
                <strong>47%</strong>
              </div>

            </div>

          </div>

        </div>

      </main>

      <section id="about" className="about-section">

        <div className="section-heading">

          <span>THE PROBLEM</span>

          <h2>
            Every citizen has a voice.
            <br />
            Governments need the signal.
          </h2>

        </div>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">◉</div>

            <h3>Multi-Modal</h3>

            <p>
              Voice, text, messaging and web submissions in one unified
              platform.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">⌁</div>

            <h3>AI-Powered</h3>

            <p>
              Automatically classify, summarize and prioritize citizen
              requests.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">⌖</div>

            <h3>Data-Driven</h3>

            <p>
              Combine citizen demand with demographic, infrastructure and
              budget data.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/citizen" element={<CitizenPortal />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;