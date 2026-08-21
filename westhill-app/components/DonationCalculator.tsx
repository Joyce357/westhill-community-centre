"use client";

import { useState } from "react";
import { DONATION_IMPACTS } from "@/lib/data";

export default function DonationCalculator() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleSelectPreset = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const currentAmount = customAmount ? parseFloat(customAmount) : selectedAmount || 50;

  const getImpactText = () => {
    if (isNaN(currentAmount) || currentAmount <= 0) {
      return "Select or enter an amount to see the impact of your support.";
    }
    if (currentAmount < 25) {
      return "Helps support essential administrative needs and volunteer supply kits.";
    }
    if (currentAmount >= 25 && currentAmount < 50) {
      return DONATION_IMPACTS[25];
    }
    if (currentAmount >= 50 && currentAmount < 100) {
      return DONATION_IMPACTS[50];
    }
    if (currentAmount >= 100 && currentAmount < 250) {
      return DONATION_IMPACTS[100];
    }
    return DONATION_IMPACTS[250];
  };

  return (
    <div
      className="standard-card-container"
      style={{
        border: "1px solid rgba(15, 59, 106, 0.05)",
        boxShadow: "var(--wh-shadow-soft)",
      }}
    >
      <h3
        className="calculator-title"
        style={{
          marginBottom: "20px",
          fontFamily: "var(--wh-font-primary)",
          color: "var(--wh-blue-primary)",
          fontSize: "1.4rem",
          textAlign: "center",
        }}
      >
        Help Support Our Programs
      </h3>

      <div className="calculator-buttons">
        {[25, 50, 100, 250].map((amt) => (
          <button
            key={amt}
            type="button"
            className={`calc-btn ${selectedAmount === amt ? "active" : ""}`}
            onClick={() => handleSelectPreset(amt)}
          >
            ${amt}
          </button>
        ))}
      </div>

      <div className="calculator-custom" style={{ position: "relative", marginBottom: "20px" }}>
        <span
          style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            fontWeight: 600,
            color: "var(--wh-text-muted)",
          }}
        >
          $
        </span>
        <input
          type="number"
          id="custom-donation-amount"
          placeholder="Custom Amount"
          min="1"
          value={customAmount}
          onChange={handleCustomChange}
          style={{
            width: "100%",
            padding: "12px 12px 12px 30px",
            borderRadius: "var(--wh-radius-sm)",
            border: "2px solid var(--wh-bg-alt)",
            outline: "none",
          }}
        />
      </div>

      <div
        className="calculator-impact-preview"
        id="calc-impact-text"
        style={{
          fontSize: "0.88rem",
          color: "var(--wh-text-body)",
          marginBottom: "25px",
          minHeight: "45px",
          lineHeight: 1.5,
          fontStyle: "italic",
          borderLeft: "2px solid var(--wh-orange-accent)",
          paddingLeft: "15px",
        }}
      >
        {getImpactText()}
      </div>

      {/* Safe Donation Provider Notice and Secure Redirection CTA */}
      <div
        style={{
          borderTop: "1px solid rgba(15, 59, 106, 0.1)",
          paddingTop: "20px",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(43, 142, 86, 0.06)",
            border: "1px solid rgba(43, 142, 86, 0.2)",
            borderRadius: "var(--wh-radius-sm)",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <i className="fas fa-shield-alt" style={{ color: "var(--wh-green-primary)", fontSize: "1.1rem" }}></i>
            <h4
              style={{
                fontSize: "0.95rem",
                color: "var(--wh-blue-primary)",
                fontFamily: "var(--wh-font-primary)",
                margin: 0,
              }}
            >
              Secure Online Donations
            </h4>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--wh-text-body)", lineHeight: 1.4, margin: 0 }}>
            Online payments will be processed through our verified, CRA-compliant charity payment partner. No financial or card data is ever collected or stored on this server.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: "100%", padding: "12px", fontSize: "1rem", fontWeight: 600 }}
          onClick={() => {
            alert(
              `Thank you for choosing to support West Hill Community Centre with a $${currentAmount} contribution. Online donation processing will be activated upon final integration with our official charity payment gateway. For immediate donations, cheques may be mailed to our address.`
            );
          }}
        >
          Proceed to Secure Donation (${currentAmount}) <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
        </button>
      </div>
    </div>
  );
}
