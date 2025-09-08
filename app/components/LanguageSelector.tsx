import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, isRTL } = useLanguage();

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        [isRTL ? "left" : "right"]: "20px",
        zIndex: 1000,
        display: "flex",
        gap: "8px",
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        border: "1px solid #e9ecef",
      }}
    >
      <button
        onClick={() => setLanguage("en")}
        style={{
          padding: "8px 12px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: language === "en" ? "#007bff" : "#f8f9fa",
          color: language === "en" ? "white" : "#495057",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        title="English"
      >
        🇺🇸 EN
      </button>
      <button
        onClick={() => setLanguage("fa")}
        style={{
          padding: "8px 12px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: language === "fa" ? "#007bff" : "#f8f9fa",
          color: language === "fa" ? "white" : "#495057",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        title="فارسی"
      >
        🇮🇷 FA
      </button>
    </div>
  );
};

export default LanguageSelector;
