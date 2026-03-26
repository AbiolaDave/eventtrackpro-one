import React from "react";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <main className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">EventTrackPro</span>
          </h1>
          <p className="hero-subtitle">
            Your Modern Solution for Event Head Count Management
          </p>
          <p className="hero-description">
            EventTrackPro is a cutting-edge application designed to streamline
            the process of tracking head counts at events, eliminating the need
            for manual record-keeping. With our innovative QR-code technology,
            users can effortlessly add counters to events, record attendance,
            and submit data with ease.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Real-Time Tracking</h3>
              <p>Monitor attendance in real-time with instant updates</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎫</div>
              <h3>QR Code Technology</h3>
              <p>Effortless check-ins using QR code scanning</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access from any device, anywhere, anytime</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WelcomePage;
