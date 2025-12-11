import React from "react";
import { useParams, Link } from "react-router-dom";
import Section from "../components/Section";
import { services } from "../data";
import { ArrowLeft, Check } from "lucide-react";
import PageHeader from "../components/PageHeader";

const ServiceDetail = () => {
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <Section className="text-center">
        <h2 className="heading-md">Service Not Found</h2>
        <Link to="/services" className="btn-global">
          Back to Services
        </Link>
      </Section>
    );
  }

  return (
    <div className="page-service-detail">
      <PageHeader
        title={service.title}
        subtitle={service.description}
        backgroundImage={
          service.image ||
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
        }
      />

      <Section
        className="section-alt"
        style={{ paddingBottom: "2rem", paddingTop: "2rem" }}
      >
        <div className="container">
          <Link
            to="/services"
            className="flex"
            style={{
              gap: "0.5rem",
              marginBottom: "2rem",
              fontSize: "0.9rem",
              color: "var(--color-text-light)",
            }}
          >
            <ArrowLeft size={16} /> Back to Services
          </Link>
        </div>
      </Section>

      <Section>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
          }}
        >
          <div>
            <h3 className="heading-md">What's Included</h3>
            <p
              style={{ marginBottom: "2rem", color: "var(--color-text-light)" }}
            >
              Our {service.title} package covers everything you need to
              transform your space.
            </p>
            <ul className="grid" style={{ gap: "1rem" }}>
              {service.inclusions.map((item, index) => (
                <li
                  key={index}
                  className="flex"
                  style={{ gap: "1rem", alignItems: "center" }}
                >
                  <span style={{ color: "var(--color-accent)" }}>
                    <Check size={20} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              background: "#f4f4f4",
              padding: "2rem",
              borderRadius: "8px",
            }}
          >
            <h3 className="heading-md">Get Started</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Ready to begin your project? Contact us today for a consultation.
            </p>
            <Link
              to="/contact"
              className="btn-global"
              style={{ width: "100%", textAlign: "center" }}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ServiceDetail;
