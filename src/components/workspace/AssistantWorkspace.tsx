import React from "react";
import { ProjectKnowledgeWorkspace, KnowledgeDocument, KnowledgeCitation } from "../../types";
import { ChatMessage } from "../../contexts/WorkspaceContext";

interface AssistantWorkspaceProps {
  assistant: ProjectKnowledgeWorkspace | null | undefined;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  chatMessages: ChatMessage[];
  isTyping: boolean;
  handleSearchSubmit: () => void;
  handleQuestionTrigger: (doc: KnowledgeDocument) => void;
  handleCitationClick: (citation: KnowledgeCitation) => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

export const AssistantWorkspace = React.memo(({
  assistant,
  searchQuery,
  setSearchQuery,
  chatMessages,
  isTyping,
  handleSearchSubmit,
  handleQuestionTrigger,
  handleCitationClick,
  chatEndRef
}: AssistantWorkspaceProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Search Bar */}
      <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", background: "#050508", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "6px 12px", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#666" }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search keywords: 'GKE', 'incident', 'coverage', 'Terraform', 'latency'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            style={{ background: "none", border: "none", color: "#ffffff", fontSize: "11px", width: "100%", outline: "none" }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "10px" }}>✕</button>
          )}
        </div>
      </div>

      {/* Suggestions Categorized Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {assistant && (["Architecture", "Debugging", "Testing", "FAQ"] as const).map((cat) => {
          const catDocs = assistant.documents.filter(doc => doc.category === cat && (
            !searchQuery || 
            doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            doc.body.toLowerCase().includes(searchQuery.toLowerCase()) || 
            doc.keywords.some((k: string) => k.toLowerCase().includes(searchQuery.toLowerCase()))
          ));
          if (catDocs.length === 0) return null;
          return (
            <div key={cat} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "8px", fontWeight: 800, textTransform: "uppercase", color: "#666", letterSpacing: "0.5px" }}>{cat}</span>
              <div 
                className="assistant-suggestions" 
                style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
              >
                {catDocs.map((doc, idx) => (
                  <button
                    key={doc.id}
                    id={`sugg-${cat}-${idx}`}
                    onClick={() => handleQuestionTrigger(doc)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                        e.preventDefault();
                        const nextIdx = (idx + 1) % catDocs.length;
                        document.getElementById(`sugg-${cat}-${nextIdx}`)?.focus();
                      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        const prevIdx = (idx - 1 + catDocs.length) % catDocs.length;
                        document.getElementById(`sugg-${cat}-${prevIdx}`)?.focus();
                      }
                    }}
                    style={{
                      background: "rgba(255,255,255,0.01)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "var(--accentColor)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                      outline: "none"
                    }}
                  >
                    {doc.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat History Box */}
      <div 
        className="chat-history-container" 
        style={{
          background: "rgba(255,255,255,0.01)",
          border: "1px solid rgba(255,255,255,0.03)",
          borderRadius: "8px",
          padding: "15px",
          minHeight: "220px",
          maxHeight: "350px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        {chatMessages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div 
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                width: "100%"
              }}
            >
              <div
                style={{
                  background: isUser ? "rgba(194, 164, 255, 0.08)" : "rgba(255,255,255,0.02)",
                  border: isUser ? "1px solid rgba(194,164,255,0.15)" : "1px solid rgba(255,255,255,0.04)",
                  borderRadius: isUser ? "10px 10px 0 10px" : "10px 10px 10px 0",
                  padding: "10px 12px",
                  maxWidth: "85%",
                  fontSize: "11px",
                  lineHeight: "1.4",
                  color: isUser ? "#ffffff" : "#adacac"
                }}
              >
                <div>{msg.text}</div>
                
                {/* Citations / Sources pill indicators */}
                {msg.citations && msg.citations.length > 0 && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "8px", paddingTop: "6px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontSize: "9px", color: "#666", alignSelf: "center" }}>Sources:</span>
                    {msg.citations.map((cit, citIdx) => (
                      <button
                        key={citIdx}
                        onClick={() => handleCitationClick(cit)}
                        className="citation-btn"
                        style={{
                          background: "rgba(194,164,255,0.05)",
                          border: "1px solid rgba(194,164,255,0.2)",
                          borderRadius: "4px",
                          color: "var(--accentColor)",
                          fontSize: "9px",
                          fontWeight: 700,
                          padding: "2px 6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        {cit.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: "10px 10px 10px 0",
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <span className="typing-dot" style={{ width: "4px", height: "4px", background: "var(--accentColor)", borderRadius: "50%", display: "inline-block" }} />
              <span className="typing-dot" style={{ width: "4px", height: "4px", background: "var(--accentColor)", borderRadius: "50%", display: "inline-block" }} />
              <span className="typing-dot" style={{ width: "4px", height: "4px", background: "var(--accentColor)", borderRadius: "50%", display: "inline-block" }} />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
});

AssistantWorkspace.displayName = "AssistantWorkspace";
export default AssistantWorkspace;
