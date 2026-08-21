import { useState } from "react";
import { Send, Mic, Image, Sparkles, LayoutDashboard } from "lucide-react";
// Make sure to import getSavedReports alongside your existing function
import { classifyCitizenText, getSavedReports } from "../services/api";

function CitizenPortal() {
  const [topic, setTopic] = useState("Water");
  const [text, setText] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // New state for the dashboard
  const [dashboardReports, setDashboardReports] = useState([]);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const topicMap = {
    Water: "Water & Sanitation",
    Roads: "Roads & Transit",
    Healthcare: "Healthcare",
    Education: "Education",
    Energy: "Energy",
    Other: "Other",
  };

  async function handleAnalyze() {
    if (!text.trim()) {
      setError("Please describe your issue first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await classifyCitizenText(
        text,
        topicMap[topic]
      );

      if (response.success) {
        setResult(response.data);
      } else {
        setError("The AI could not analyze your issue.");
      }
    } catch (err) {
      setError(
        err.message || "Something went wrong while connecting to the backend."
      );
    } finally {
      setLoading(false);
    }
  }

  // New handler to fetch and toggle the dashboard
  async function handleToggleDashboard() {
    if (showDashboard) {
      setShowDashboard(false); // Hide if already showing
      return;
    }

    setIsDashboardLoading(true);
    setError("");
    
    try {
      const response = await getSavedReports();
      if (response.success) {
        setDashboardReports(response.data);
        setShowDashboard(true);
      } else {
        setError("Failed to load dashboard data.");
      }
    } catch (err) {
      setError("Something went wrong while fetching reports.");
    } finally {
      setIsDashboardLoading(false);
    }
  }

  return (
    <div className="citizen-page">

      <div className="citizen-header">
        <div>
          <div className="citizen-badge">
            CITIZEN PORTAL
          </div>

          <h1>
            Tell us what's happening
          </h1>

          <p>
            Your voice helps governments understand what your
            community needs.
          </p>
        </div>
      </div>

      <div className="complaint-card">

        <div className="form-section">
          <label>
            What is your issue about?
          </label>
          <div className="topic-grid">
            {[
              "Water",
              "Roads",
              "Healthcare",
              "Education",
              "Energy",
              "Other",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={
                  topic === item
                    ? "topic-button active"
                    : "topic-button"
                }
                onClick={() => setTopic(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>
            Describe your issue
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="For example: There has been no water supply in our area for the last three days..."
          />
          <div className="textarea-footer">
            <span>
              {text.length} characters
            </span>
            <div className="input-tools">
              <button type="button" title="Voice input">
                <Mic size={18} />
              </button>
              <button type="button" title="Attach image">
                <Image size={18} />
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="analyze-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Original Submit Button */}
          <button
            type="button"
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={loading}
          >
            <Sparkles size={18} />
            {loading ? "Analyzing..." : "Analyze with AI"}
            <Send size={17} />
          </button>

          {/* New Dashboard Button */}
          <button
            type="button"
            className="analyze-button"
            onClick={handleToggleDashboard}
            disabled={isDashboardLoading}
            style={{ backgroundColor: '#475569' }} // Makes it look secondary without needing a new CSS class
          >
            <LayoutDashboard size={18} />
            {isDashboardLoading ? "Loading Dashboard..." : (showDashboard ? "Hide Government Dashboard" : "View Government Dashboard")}
          </button>

        </div>
      </div>

      {/* Existing AI Result Card */}
      {result && !showDashboard && (
        <div className="ai-result-card">
          <div className="ai-result-header">
            <Sparkles size={20} />
            <h2>AI Analysis</h2>
          </div>
          <div className="result-grid">
            <div className="result-item">
              <span>Category</span>
              <strong>{result.category}</strong>
            </div>
            <div className="result-item">
              <span>Sentiment</span>
              <strong>{result.sentiment}</strong>
            </div>
            <div className="result-item">
              <span>Intent</span>
              <strong>{result.intent}</strong>
            </div>
            <div className="result-item">
              <span>Go For It Score</span>
              <strong>{result.goForItScore}/100</strong>
            </div>
          </div>
          <div className="result-summary">
            <span>Summary</span>
            <p>{result.summary}</p>
          </div>
        </div>
      )}

      {/* New Dashboard View reusing your existing CSS classes */}
      {showDashboard && (
        <div className="ai-result-card" style={{ marginTop: '20px' }}>
          <div className="ai-result-header">
            <LayoutDashboard size={20} />
            <h2>Government Dashboard</h2>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            {dashboardReports.length === 0 ? (
              <p>No reports found in the database.</p>
            ) : (
              dashboardReports.map((report) => (
                <div key={report.id} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
                  <p style={{ marginBottom: '15px', color: '#1e293b' }}>
                    <strong>Citizen Input:</strong> "{report.input_text}"
                  </p>
                  
                  {/* Reusing your result-grid layout for each saved item */}
                  <div className="result-grid">
                    <div className="result-item">
                      <span>Category</span>
                      <strong>{report.category}</strong>
                    </div>
                    <div className="result-item">
                      <span>Sentiment</span>
                      <strong>{report.sentiment}</strong>
                    </div>
                    <div className="result-item">
                      <span>Intent</span>
                      <strong>{report.intent}</strong>
                    </div>
                    <div className="result-item">
                      <span>Priority Score</span>
                      <strong>{report.go_for_it_score}/100</strong>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="privacy-note">
        🔒 Your information is processed securely and responsibly.
      </div>

    </div>
  );
}

export default CitizenPortal;