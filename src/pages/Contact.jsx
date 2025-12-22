import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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

import heroImg from "../assets/contact/DSC08774.jpg";

const Contact = () => {
  const heroSlides = [
    {
      image: heroImg,
      alt: "Contact Hero",
    },
  ];

  const [categories, setCategories] = useState([]);
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:2000";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/category/get`);
        if (response.ok) {
          const result = await response.json();
          if (result.status && Array.isArray(result.data)) {
            setCategories(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [API_BASE_URL]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(2, "Name is too short"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().matches(/^[0-9+ ]+$/, "Invalid phone number").min(10, "Invalid phone number").max(10, "Invalid phone number"),
    projectType: Yup.string().required("Please select a project type"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
  });

  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setFormStatus({ type: "", message: "" });
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/contact/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();

        if (response.ok && result.status) {
          setFormStatus({
            type: "success",
            message: "Thank you! Your message has been sent successfully.",
          });
          resetForm();
        } else {
          setFormStatus({
            type: "error",
            message: result.message || "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error sending email:", error);
        setFormStatus({
          type: "error",
          message: "Failed to connect to the server. Please check your internet connection.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

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

      <section id="contact-form" className="contact-split-section">
        <div className="container">
          <div className="contact-grid">
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

              {formStatus.message && (
                <div
                  style={{
                    padding: "1rem",
                    marginBottom: "2rem",
                    borderRadius: "var(--radius-sm)",
                    background:
                      formStatus.type === "success"
                        ? "rgba(40, 167, 69, 0.1)"
                        : "rgba(220, 53, 69, 0.1)",
                    color:
                      formStatus.type === "success" ? "#28a745" : "#dc3545",
                    border: `1px solid ${formStatus.type === "success" ? "#28a745" : "#dc3545"
                      }`,
                  }}
                >
                  {formStatus.message}
                </div>
              )}

              <form className="premium-form" onSubmit={formik.handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className={`form-input ${formik.touched.name && formik.errors.name ? 'error' : ''}`}
                      placeholder="Your Name"
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <span className="error-message" style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{formik.errors.name}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className={`form-input ${formik.touched.email && formik.errors.email ? 'error' : ''}`}
                      placeholder="Your Email"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <span className="error-message" style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{formik.errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      className={`form-input ${formik.touched.phone && formik.errors.phone ? 'error' : ''}`}
                      placeholder="+91 98123 45678"
                      {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <span className="error-message" style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{formik.errors.phone}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectType">I'm Interested In...</label>
                    <div className="select-wrapper">
                      <select
                        id="projectType"
                        className={`form-select ${formik.touched.projectType && formik.errors.projectType ? 'error' : ''}`}
                        {...formik.getFieldProps('projectType')}
                      >
                        <option value="" disabled>
                          Select Project Type
                        </option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formik.touched.projectType && formik.errors.projectType && (
                      <span className="error-message" style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{formik.errors.projectType}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className={`form-input ${formik.touched.subject && formik.errors.subject ? 'error' : ''}`}
                    placeholder="Project Inquiry"
                    {...formik.getFieldProps('subject')}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <span className="error-message" style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{formik.errors.subject}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className={`form-textarea ${formik.touched.message && formik.errors.message ? 'error' : ''}`}
                    placeholder="Tell us about your project..."
                    {...formik.getFieldProps('message')}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <span className="error-message" style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{formik.errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-global"
                  disabled={formik.isSubmitting}
                >
                  <span>{formik.isSubmitting ? "Sending..." : "Send Message"}</span>
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
