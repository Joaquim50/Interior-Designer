import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <section className="cta-banner-section">
      {/* Background Image & Overlay */}
      <div className="cta-banner-bg">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
          alt="Premium Interior Design"
          className="cta-bg-image"
          loading="lazy"
        />
        <div className="cta-overlay"></div>
      </div>

      <div className="container relative-z">
        <div className="cta-content">
          {/* Badge */}
          <div className="cta-badge">2000+ Businesses</div>

          {/* Main Headline */}
          <h2 className="cta-headline">Ready to Transform Your Space?</h2>

          {/* Accent Line */}
          <div className="cta-accent-line"></div>

          {/* Supporting Text */}
          <p className="cta-text">
            Let's Create Something Exceptional Together
          </p>

          {/* CTA Button */}
          <Link to="/contact" className="cta-button">
            <span>Start Your Dream Project Today</span>
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
