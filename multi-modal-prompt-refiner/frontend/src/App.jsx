import { useState } from "react";
import UploadForm from "./components/UploadForm";
import OutputViewer from "./components/OutputViewer";

export default function App() {
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div style={styles.page}>
      

      {error && <div style={styles.error}>{error}</div>}

      <UploadForm setOutput={setOutput} setError={setError} />

      <OutputViewer output={output} />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "40px 20px",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    maxWidth: "720px",
    margin: "0 auto 30px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#111",
  },
  subtitle: {
    fontSize: "15px",
    color: "#555",
    lineHeight: 1.6,
  },
  error: {
    maxWidth: "700px",
    margin: "0 auto 20px",
    padding: "12px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "6px",
    fontSize: "14px",
  },
 
};
