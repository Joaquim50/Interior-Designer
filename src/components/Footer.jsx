import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer>
      {/* Top Footer Section */}
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Left Column: Call to Action */}
            <div className="footer-col">
              <Link
                to="/"
                className="logo"
                style={{
                  display: "block",
                  marginBottom: "1.5rem",
                  color: "#fff",
                }}
              >
                TRIVIE
              </Link>
              <h4 className="footer-heading">Let’s design together</h4>
              <p className="footer-desc">
                Ready to transform your space? We are here to help you create
                the environment of your dreams.
              </p>
              <Link
                to="/contact"
                className="btn-global"
                style={{ width: "fit-content" }}
              >
                GET TRIVIA NOW
              </Link>
            </div>

            {/* Middle Column: Contact */}
            <div className="footer-col">
              <h4 className="footer-heading">Address</h4>
              <ul className="contact-list">
                <li>
                  <MapPin size={18} className="contact-icon" />
                  <span>
                    Court Chambers, 5C, Vitthaldas Thackersey Marg, New Marine
                    Lines, Churchgate, Mumbai, Maharashtra 400020
                  </span>
                </li>
                <li>
                  <Phone size={18} className="contact-icon" />
                  <span>099304 98557</span>
                </li>
                <li>
                  <Mail size={18} className="contact-icon" />
                  <span>sanjiv.mehra@trivie.net</span>
                </li>
                <li>
                  <Mail size={18} className="contact-icon" />
                  <span>kavash@trivie.net</span>
                </li>
              </ul>
              <Link
                to="/contact"
                className="btn-global"
                style={{
                  marginTop: "1.5rem",
                  fontSize: "0.8rem",
                  padding: "0.5rem 1.5rem",
                  width: "fit-content",
                }}
              >
                GET AN ESTIMATE
              </Link>
            </div>

            {/* Right Column: Navigation */}
            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul
                className="footer-links"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/process">Process</Link>
                </li>
                <li>
                  <Link to="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="footer-bottom">
        <div className="container">
          <nav className="footer-nav">
            {/* Links moved to main footer area */}
          </nav>
          <p className="copyright">
            Copyright by BOLD THEMES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
