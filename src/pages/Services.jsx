import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import ProcessSection from "../components/ProcessSection";

const Services = () => {
  const heroSlides = [
    {
      image:
        "images/services/_PIX6681.jpg",
      alt: "Luxury Interior 1",
    },
  ];

  const sectors = [
    {
      id: "expertise",
      title: "Our Areas of Expertise",
      headline: "Specialised Solutions Across all Interior Domains",
      description:
        "We've mastered the unique requirements of each sector, delivering spaces that function perfectly for their intended purpose.",
      cta: "View Sector Portfolio",
      image:
        "images/services/PIX00400.jpg",
      link: "/services",
    },
    {
      id: "residential",
      title: "Residential Interiors",
      headline: "Your Personal Sanctuary, Perfected",
      description:
        "We transform houses into homes that reflect your personality and lifestyle. From apartments to villas, we create spaces that balance beauty, comfort, and functionality with timeless elegance.",
      cta: "Explore Residential Projects",
      image:
        "images/services/_PIX3637.jpg",
      link: "/services",
    },
    {
      id: "commercial",
      title: "Commercial Interiors",
      headline: "Environments that Boost Productivity & Reflect Your Brand",
      description:
        "Create workspaces that inspire innovation and foster collaboration. We design and execute corporate interiors that enhance employee wellbeing while powerfully communicating your brand identiy.",
      cta: "View Office Projects",
      image:
        "images/services/_PIX4578.jpg",
      link: "/services",
    },
    {
      id: "kitchens",
      title: "Modular Kitchens",
      headline: "Where Culinary Dreams Meet Functional Design",
      description:
        "Experience kitchens that blend sophisticated aesthetics with ergonomic efficiecy. Our custom modular solutions maximize space utilization while creating the heart of your home.",
      cta: "Explore Kitchen Designs",
      image:
        "images/services/PIX09001.jpg",
      link: "/services",
    },
    {
      id: "renovation",
      title: "Renovation",
      headline: "Transforming Existing Spaces with Fresh Perspectives",
      description:
        "Breathe new life into your existting spaces with our comprehensive renovation services. We reimagine and rebuild while respecting your timeline and mimizing disruption.",
      cta: "Discuss Renovation",
      image:
        "images/services/PIX_4111.jpg",
      link: "/services",
    },
    {
      id: "styling",
      title: "Interior Styling",
      headline: "The Art of Perfect Finishing Touches",
      description:
        "Complete your space with professional styling that adds personality and character. We select and arrange furnishings, artwork, and accessories to create cohesive, magazine-worthy interiors.",
      cta: "Explore Styling Services",
      image:
        "images/services/DSC08708.jpg",
      link: "/services",
    },
  ];

  return (
    <div className="page-wrapper">
      <HeroSlider
        slides={heroSlides}
        staticTitle="Comprehensive Interior Solutions"
        staticSubtitle="Precision-Tailored Services for Every Space"
        staticDescription="From luxury residences to mission-critical commercial environments, we deliver end-to-end interior solutions that blend aesthetic excellence with fuctional design and systematic project execution."
        staticCtaText="Start Your Project"
        staticCtaLink="/contact"
      />

      {/* Our Services - Sectors List */}
      <section
        className="sectors-section"
        style={{
          background: "var(--color-surface-200)",
          padding: "var(--space-xl) 0",
        }}
      >
        <div className="container">
          {/* Section Header - Left Aligned */}
          {/* <div style={{ marginBottom: "var(--space-lg)", maxWidth: "600px" }}>
            <span className="subheading">Our Services</span>
            <h2 className="heading-lg">Our Expertise</h2>
            <p
              style={{ margin: "1.5rem 0 0", color: "var(--color-text-light)" }}
            >
              From private residences to complex commercial environments, we
              bring a depth of experience to every project type.
            </p>
          </div> */}

          {/* List Layout */}
          <div className="process-steps-container" style={{ gap: "4rem" }}>
            {sectors.map((sector, index) => (
              <div
                key={sector.id}
                className={`process-step ${index % 2 !== 0 ? "reverse" : ""}`}
              >
                <div className="step-image-wrapper">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="step-image"
                    loading="lazy"
                  />
                </div>
                <div className="step-content-wrapper">
                  <h3 className="step-title">{sector.title}</h3>
                  <h4 className="step-subtitle">{sector.headline}</h4>
                  <p className="step-description">{sector.description}</p>
                  <div style={{ marginTop: "2rem" }}>
                    <Link to={sector.link} className="btn btn-global">
                      {sector.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {/* <ProcessSection /> */}

      {/* Turn a Home Section */}
      {/* <section
        className="section-padding"
        style={{ background: "var(--color-surface-200)" }}
      >
        <div className="container">
          <div
            className="grid-2-col"
            style={{ alignItems: "center", gap: "4rem" }}
          >
            <div className="content">
              <span className="subheading">Turn a Home Into Your Space</span>
              <h2 className="heading-lg">Let's talk interior design</h2>
              <p
                style={{
                  color: "var(--color-text-light)",
                  lineHeight: "1.8",
                  marginBottom: "1.5rem",
                }}
              >
                Your home should be a reflection of who you are—a space that
                tells your story and supports your lifestyle. Our interior
                design services go beyond aesthetics to create environments that
                are both beautiful and deeply personal.
              </p>
              <p
                style={{
                  color: "var(--color-text-light)",
                  lineHeight: "1.8",
                  marginBottom: "2rem",
                }}
              >
                Whether you're looking to refresh a single room or transform
                your entire home, we work closely with you to understand your
                needs, preferences, and aspirations. The result is a space that
                feels uniquely yours.
              </p>
              <Link to="/contact" className="btn btn-global">
                Start Your Project
              </Link>
            </div>
            <div className="image">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&w=1000&q=80"
                alt="Interior Design"
                style={{ width: "100%", height: "auto", display: "block" }}
                loading="lazy"
                width="1000"
                height="667"
              />
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Services;
