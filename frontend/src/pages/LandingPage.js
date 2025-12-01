import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="hero-content">
          <div className="badge">✨ Next Generation POS</div>
          <h1>Transform Your <span className="gradient-text">Business</span></h1>
          <p className="tagline">Modern Point of Sale System for the Digital Age</p>
          <p className="description">
            Streamline operations, boost sales, and delight customers with our cloud-based POS solution
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary" onClick={handleLogin}>
              Get Started Free
              <span className="arrow">→</span>
            </button>
            <button className="cta-button secondary" onClick={() => document.querySelector('.features').scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="features-header">
            <span className="section-badge">Features</span>
            <h2>Everything You Need</h2>
            <p className="section-subtitle">Powerful features to run your business efficiently</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📊</div>
              </div>
              <h3>Sales Dashboard</h3>
              <p>Track revenue, orders, and performance metrics in real-time with beautiful visualizations</p>
              <div className="feature-link">Learn more →</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">💳</div>
              </div>
              <h3>Point of Sale</h3>
              <p>Lightning-fast checkout with multiple payment methods and instant receipt generation</p>
              <div className="feature-link">Learn more →</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📦</div>
              </div>
              <h3>Product Management</h3>
              <p>Effortlessly manage inventory, categories, pricing, and stock levels</p>
              <div className="feature-link">Learn more →</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📈</div>
              </div>
              <h3>Analytics</h3>
              <p>Deep insights into top products, sales trends, and customer behavior</p>
              <div className="feature-link">Learn more →</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🔄</div>
              </div>
              <h3>Real-time Updates</h3>
              <p>Instant synchronization across all devices and operations</p>
              <div className="feature-link">Learn more →</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🎨</div>
              </div>
              <h3>Clean Design</h3>
              <p>Modern, minimal interface designed for speed and simplicity</p>
              <div className="feature-link">Learn more →</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-container">
          <div className="about-left">
            <div className="section-badge">About</div>
            <h2>Built for the Future</h2>
            <p className="about-description">
              A modern, cloud-based POS solution designed for small to medium-sized retail businesses.
              Built with cutting-edge technologies to ensure reliability, speed, and ease of use.
            </p>

            <div className="tech-stack">
              <h3>Powered By</h3>
              <div className="tech-badges">
                <span className="tech-badge">
                  <span className="tech-icon">⚛️</span>
                  React
                </span>
                <span className="tech-badge">
                  <span className="tech-icon">⚡</span>
                  FastAPI
                </span>
                <span className="tech-badge">
                  <span className="tech-icon">🐍</span>
                  Python
                </span>
                <span className="tech-badge">
                  <span className="tech-icon">💾</span>
                  SQLite
                </span>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="credits-card">
              <div className="credits-header">
                <h3>Development Team</h3>
              </div>

              <div className="developers-list">
                <div className="developer-item">
                  <div className="developer-avatar">C</div>
                  <div className="developer-info">
                    <div className="developer-name">Chananya Aiamprakhon</div>
                    <div className="developer-id">6710421004</div>
                  </div>
                </div>
                <div className="developer-item">
                  <div className="developer-avatar">N</div>
                  <div className="developer-info">
                    <div className="developer-name">Natchaporn Saithorn</div>
                    <div className="developer-id">6610421009</div>
                  </div>
                </div>
              </div>

              <div className="credits-divider"></div>

              <div className="project-details">
                <div className="detail-item">
                  <div className="detail-label">Course</div>
                  <div className="detail-value">CI 6103 Cloud Computing 1-68</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Institution</div>
                  <div className="detail-value">National Institute of Development Administration (NIDA)</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Program</div>
                  <div className="detail-value">Computer Science and Information Systems (CSIS)</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Faculty</div>
                  <div className="detail-value">School of Applied Statistics</div>
                </div>
              </div>

              <div className="project-footer">
                <span className="project-year">© 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2025 POS System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
