import { useState } from "react";
import { 
  CheckCircle, 
  FileCode, 
  Cpu, 
  Package, 
  AlertCircle,
  Copy,
  Check,
  Target,
  Zap,
  Code,
  Layers,
  AlertTriangle
} from "lucide-react";
import "./OutputViewer.css";

export default function OutputViewer({ output }) {
  const [copied, setCopied] = useState(false);

  if (!output) return null;

  const copyToClipboard = async () => {
    const textToCopy = `
Intent: ${output.intent}

Functional Requirements:
${output.functional_requirements?.join('\n• ') || 'None'}

Technical Constraints:
${output.technical_constraints?.join('\n• ') || 'None'}

Expected Outputs:
${output.expected_outputs?.join('\n• ') || 'None'}

Missing Information:
${output.missing_information?.join('\n• ') || 'None'}
    `.trim();

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getSectionIcon = (title) => {
    switch(title) {
      case "Functional Requirements": return <FileCode />;
      case "Technical Constraints": return <Cpu />;
      case "Expected Outputs": return <Package />;
      case "Missing Information": return <AlertCircle />;
      default: return <Zap />;
    }
  };

  const getSectionClass = (title) => {
    if (title === "Missing Information") return "warning";
    return "";
  };

  return (
    <div className="output-container">
      {/* Background Blobs */}
      <div className="output-bg-blob output-blob-1"></div>
      <div className="output-bg-blob output-blob-2"></div>

      <div className="output-card">
        {/* Shine Effect */}
        <div className="card-shine-effect"></div>

        {/* Header */}
        <div className="output-header">
          <div className="header-content">
            <div className="header-icon">
              <CheckCircle />
            </div>
            <div className="header-text">
              <h2>Refined Prompt Output</h2>
              <p>AI-optimized and ready to use</p>
            </div>
          </div>
          
          <button 
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={copyToClipboard}
          >
            {copied ? <Check /> : <Copy />}
            {copied ? 'Copied!' : 'Copy All'}
          </button>
        </div>

        {/* Content */}
        <div className="output-content">
          {/* Intent Section */}
          <div className="intent-section">
            <div className="section-header">
              <div className="section-icon">
                <Target />
              </div>
              <div className="section-label">Primary Intent</div>
            </div>
            <p className="intent-text">{output.intent}</p>
          </div>

          {/* Lists Grid */}
          <div className="lists-grid">
            {/* Functional Requirements */}
            <div className="list-section">
              <div className="list-section-header">
                <div className="list-icon">
                  <FileCode />
                </div>
                <div className="list-label">Functional Requirements</div>
                <div className="list-count">
                  {output.functional_requirements?.length || 0}
                </div>
              </div>
              
              <ul className="list-items">
                {output.functional_requirements?.length ? (
                  output.functional_requirements.map((item, idx) => (
                    <li key={idx} className="list-item">
                      <div className="item-bullet"></div>
                      <div className="item-text">{item}</div>
                    </li>
                  ))
                ) : (
                  <div className="empty-state">
                    <CheckCircle />
                    <div className="empty-state-text">All requirements captured</div>
                  </div>
                )}
              </ul>
            </div>

            {/* Technical Constraints */}
            <div className="list-section">
              <div className="list-section-header">
                <div className="list-icon">
                  <Cpu />
                </div>
                <div className="list-label">Technical Constraints</div>
                <div className="list-count">
                  {output.technical_constraints?.length || 0}
                </div>
              </div>
              
              <ul className="list-items">
                {output.technical_constraints?.length ? (
                  output.technical_constraints.map((item, idx) => (
                    <li key={idx} className="list-item">
                      <div className="item-bullet"></div>
                      <div className="item-text">{item}</div>
                    </li>
                  ))
                ) : (
                  <div className="empty-state">
                    <Code />
                    <div className="empty-state-text">No constraints specified</div>
                  </div>
                )}
              </ul>
            </div>

            {/* Expected Outputs */}
            <div className="list-section">
              <div className="list-section-header">
                <div className="list-icon">
                  <Package />
                </div>
                <div className="list-label">Expected Outputs</div>
                <div className="list-count">
                  {output.expected_outputs?.length || 0}
                </div>
              </div>
              
              <ul className="list-items">
                {output.expected_outputs?.length ? (
                  output.expected_outputs.map((item, idx) => (
                    <li key={idx} className="list-item">
                      <div className="item-bullet"></div>
                      <div className="item-text">{item}</div>
                    </li>
                  ))
                ) : (
                  <div className="empty-state">
                    <Layers />
                    <div className="empty-state-text">Outputs not specified</div>
                  </div>
                )}
              </ul>
            </div>

            {/* Missing Information */}
            <div className="list-section warning">
              <div className="list-section-header">
                <div className="list-icon">
                  <AlertTriangle />
                </div>
                <div className="list-label">Missing Information</div>
                <div className="list-count">
                  {output.missing_information?.length || 0}
                </div>
              </div>
              
              <ul className="list-items">
                {output.missing_information?.length ? (
                  output.missing_information.map((item, idx) => (
                    <li key={idx} className="list-item">
                      <div className="item-bullet"></div>
                      <div className="item-text">{item}</div>
                    </li>
                  ))
                ) : (
                  <div className="empty-state">
                    <CheckCircle />
                    <div className="empty-state-text">No missing information - Great!</div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="output-footer">
          <div className="quality-indicator">
            <div className="quality-item">
              <div className="quality-dot required"></div>
              <span>Requirements</span>
            </div>
            <div className="quality-item">
              <div className="quality-dot complete"></div>
              <span>Complete</span>
            </div>
            <div className="quality-item">
              <div className="quality-dot missing"></div>
              <span>Missing Info</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions remain the same for compatibility
export function renderSection(title, value) {
  return (
    <div className="section">
      <div className="label">{title}</div>
      <div>{value}</div>
    </div>
  );
}

export function renderList(title, items, emptyIsGood = false) {
  return (
    <div className="section">
      <div className="label">{title}</div>
      <ul>
        {items?.length ? (
          items.map((i, idx) => <li key={idx}>{i}</li>)
        ) : (
          <li style={{ color: "#888" }}>
            {emptyIsGood ? "None" : "Not specified"}
          </li>
        )}
      </ul>
    </div>
  );
}