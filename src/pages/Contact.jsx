import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Linkedin,
  Facebook,
  Instagram,
  Clock,
} from "lucide-react";
import HeroSlider from "../components/HeroSlider";

const Contact = () => {
  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
      alt: "Contact Hero",
    },
  ];

  return (
    <div className="page-contact">
      <HeroSlider
        slides={heroSlides}
        staticTitle="Start Your Project"
        staticSubtitle="Let's Create Something Exceptional Together"
        staticDescription="Your vision, amplified by our expertise. Get in touch to discuss how we can bring calm confidence to your next interior project with our systematic approach and meticulous craftsmanship."
        staticCtaText="Get in Touch"
        staticCtaLink="#contact-form"
      />

      {/* 50/50 Split Section */}
      <section id="contact-form" className="contact-split-section">
        <div className="container">
          <div className="contact-grid">
            {/* LEFT COLUMN - Contact Form */}
            <div
              className="contact-form-wrapper"
              style={{
                background: "var(--color-surface-100)",
                padding: "3rem",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ marginBottom: "2rem" }}>
                <h2 className="heading-md" style={{ marginBottom: "0.5rem" }}>
                  Tell Us About Your Project
                </h2>
                <p
                  className="text-body"
                  style={{ color: "var(--color-text-light)" }}
                >
                  We're Excited to Hear Your Ideas
                </p>
              </div>
              <form className="premium-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-input"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-input"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-input"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="interest">I'm Interested In...</label>
                    <div className="select-wrapper">
                      <select id="interest" className="form-select">
                        <option value="" disabled selected>
                          Select Project Type
                        </option>
                        <option value="luxury">Luxury Interiors</option>
                        <option value="corporate">Corporate Office</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="data-centre">Data Centre</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="form-input"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="form-textarea"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-global">
                  <span>Send Message</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Office Information Blocks */}
              <div className="office-info-grid">
                <div className="info-card">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Address</h4>
                    <p>
                      Court Chambers, 5C, Vitthaldas Thackersey Marg,
                      <br />
                      New Marine Lines, Churchgate,
                      <br />
                      Mumbai, Maharashtra 400020
                    </p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <Phone size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Phone Number</h4>
                    <p>099304 98557</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <Mail size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Email ID</h4>
                    <p>sanjiv.mehra@trivie.net</p>
                    <p>kavash@trivie.net</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <Clock size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Working Hours</h4>
                    <p>Mon-Sat: 10:30 AM - 6 PM</p>
                  </div>
                </div>

                <div className="info-card" style={{ gridColumn: "1 / -1" }}>
                  <div
                    className="info-content"
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h4 style={{ marginBottom: 0 }}>Follow Us:</h4>
                    <a
                      href="https://www.linkedin.com/company/trivie-interiors"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--color-text-body)" }}
                    >
                      <Linkedin size={24} />
                    </a>
                    <a
                      href="http://www.instagram.com/trivie_interriors"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--color-text-body)" }}
                    >
                      <Instagram size={24} />
                    </a>
                    <a
                      href="http://www.facebook.com/trivieinterriors"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--color-text-body)" }}
                    >
                      <Facebook size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Map */}
            <div className="contact-image-wrapper">
              <div className="contact-image-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.929587654321!2d72.8258!3d18.9388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e71c7c4335%3A0x4332832267252d6a!2sCourt%20Chambers%2C%20Vitthaldas%20Thackersey%20Marg%2C%20New%20Marine%20Lines%2C%20Churchgate%2C%20Mumbai%2C%20Maharashtra%20400020!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
