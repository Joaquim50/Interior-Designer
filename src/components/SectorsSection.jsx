import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SectorsSection = () => {
  const sectors = [
    {
      id: "residential",
      title: "Luxury Residential Interiors",
      headline: "Your Sanctuary, Perfected",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80",
      link: "/services",
    },
    {
      id: "corporate",
      title: "Corporate Office Fit-Outs",
      headline: "Environments that Boost Productivity & Reflect Your Brand",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
      link: "/services",
    },
    {
      id: "hospitality",
      title: "Hospitality & Hotel Interiors",
      headline: "Spaces that Welcome, Impress, and Endure",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
      link: "/services",
    },
    {
      id: "datacentre",
      title: "Data Centre Interiors",
      headline: "Precision-Engineered Interiors for Critical Environments",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80",
      link: "/services",
    },
  ];

  return (
    <section className="sectors-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: "4rem" }}>
          <span className="subheading">Services</span>
          <h2 className="heading-lg">Comprehensive Interior Solutions</h2>
          {/* <h3
            className="heading-md"
            style={{ marginBottom: "1.5rem", fontWeight: 400 }}
          >
            Tailored Excellence Across Every Sector
          </h3> */}
          <p
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              color: "var(--color-text-light)",
              lineHeight: "1.6",
            }}
          >
            Tailored Excellence Across Every Sector
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="sectors-grid">
          {sectors.map((sector) => (
            <Link to={sector.link} key={sector.id} className="sector-tile">
              <div className="sector-image-wrapper">
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="sector-image"
                />
              </div>
              <div className="sector-overlay"></div>
              <div className="sector-content">
                <span className="sector-title">{sector.title}</span>
                <h6 className="sector-headline">{sector.headline}</h6>
                <div className="sector-arrow">
                  <span
                    style={{
                      marginRight: "0.5rem",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    Explore
                  </span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center" style={{ marginTop: "-2.5rem" }}>
          <Link to="/services" className="btn-global">
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;
