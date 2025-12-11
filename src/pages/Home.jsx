import React from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import ConceptStats from "../components/ConceptStats";
import WhoWeAre from "../components/WhoWeAre";
import ContactSection from "../components/ContactSection";
import PortfolioCategories from "../components/PortfolioCategories";
import ProcessTimeline from "../components/ProcessTimeline";
import SectorsSection from "../components/SectorsSection";
import heroImg from "../assets/hero.png";
import { projects, services } from "../data";

const Home = () => {
  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80",
      title: "Just Imagine, We'll Create",
      subtitle: "Turnkey Interior Solutions for Discerning Clients",
      description: "",
      ctaText: "View Our Work",
      ctaLink: "/portfolio",
      secondaryCtaText: "Start Your Project",
      secondaryCtaLink: "/contact",
      duration: 6000,
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
      title: "Modern Luxury Living",
      subtitle: "Elevate Your Lifestyle",
      description:
        "Creating sanctuaries that blend comfort with high-end aesthetics.",
      ctaText: "Our Services",
      ctaLink: "/services",
      duration: 5000,
    },
    {
      image:
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=80",
      title: "Timeless Elegance",
      subtitle: "Crafted for You",
      description: "Bespoke designs that stand the test of time.",
      ctaText: "Contact Us",
      ctaLink: "/contact",
      duration: 5000,
    },
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
      title: "Commercial Excellence",
      subtitle: "Inspiring Workspaces",
      description:
        "Functional designs that enhance productivity and brand identity.",
      ctaText: "View Projects",
      ctaLink: "/portfolio",
      duration: 5000,
    },
    {
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
      title: "Coastal Serenity",
      subtitle: "Nature Meets Design",
      description: "Bringing the outdoors in with organic textures and light.",
      ctaText: "Get Started",
      ctaLink: "/contact",
      duration: 5000,
    },
  ];

  const featuredProjects = projects.slice(0, 3);
  const servicesPreview = services.slice(0, 4);

  return (
    <div className="page-wrapper">
      <HeroSlider
        slides={heroSlides}
        staticTitle="Just Imagine, We'll Create"
        staticSubtitle="Turnkey Interior Solutions for Discerning Clients"
        staticCtaText="View Portfolio"
        staticCtaLink="/portfolio"
      />

      {/* About & Concept Section */}
      <Section className="section-about" style={{ paddingBottom: "2rem" }}>
        <div className="container">
          <div className="grid grid-2-col items-center">
            <div className="about-content">
              <span className="subheading">About Us</span>
              <h2 className="heading-lg" style={{ fontSize: "55px" }}>
                Where Calm Confidence Meets Creative Vision
              </h2>
              <p className="text-lead">
                At Trivie Interriors, with 15+ years of transforming spaces
                across Mumbai, we blend industry expertise with modern project
                management to deliver smooth, stress-free, turnkey interior
                solutions through a refined mix of image-led and text-driven
                design storytelling.
              </p>
              <Link to="/about" className="btn-global">
                Learn More
              </Link>
            </div>
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
                alt="Modern Interior Design"
                className="about-image"
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-lg)",
                }}
              />
            </div>
          </div>

          {/* Merged Concept & Stats */}
          {/* <ConceptStats /> */}
        </div>
      </Section>

      {/* Portfolio Categories with Bento Grid */}
      <PortfolioCategories />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Sectors / Services Section */}
      <SectorsSection />

      {/* Who We Are Section */}
      {/* <WhoWeAre /> */}

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Home;
