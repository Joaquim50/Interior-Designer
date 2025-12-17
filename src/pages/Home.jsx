import React from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import Section from "../components/Section";
// import ProjectCard from "../components/ProjectCard";
// import ConceptStats from "../components/ConceptStats";
// import WhoWeAre from "../components/WhoWeAre";
import ContactSection from "../components/ContactSection";
import PortfolioCategories from "../components/PortfolioCategories";
import ProcessTimeline from "../components/ProcessTimeline";
import SectorsSection from "../components/SectorsSection";
import img1 from "../assets/home/hero_slider/DSC08465.jpg";
import img2 from "../assets/home/hero_slider/DSC08722.jpg";
import img3 from "../assets/home/hero_slider/DSC09255.jpg";
import img4 from "../assets/home/hero_slider/DSC09429.jpg";
import img5 from "../assets/home/hero_slider/PIX08564.jpg";
import img6 from "../assets/home/hero_slider/_PIX4683.jpg";
import aboutImg from "../assets/home/PIX09196.jpg";
import { projects, services } from "../data";

const Home = () => {
  const heroSlides = [
    {
      image: img1,
      title: "Just Imagine, We'll Create",
      subtitle: "Trivie Interrior Solutions for Discerning Clients",
      description: "",
      ctaText: "View Our Work",
      ctaLink: "/portfolio",
      secondaryCtaText: "Start Your Project",
      secondaryCtaLink: "/contact",
      duration: 6000,
    },
    {
      image: img2,
      title: "Modern Luxury Living",
      subtitle: "Elevate Your Lifestyle",
      description:
        "Creating sanctuaries that blend comfort with high-end aesthetics.",
      ctaText: "Our Services",
      ctaLink: "/services",
      duration: 5000,
    },
    {
      image: img3,
      title: "Timeless Elegance",
      subtitle: "Crafted for You",
      description: "Bespoke designs that stand the test of time.",
      ctaText: "Contact Us",
      ctaLink: "/contact",
      duration: 5000,
    },
    {
      image: img4,
      title: "Commercial Excellence",
      subtitle: "Inspiring Workspaces",
      description:
        "Functional designs that enhance productivity and brand identity.",
      ctaText: "View Projects",
      ctaLink: "/portfolio",
      duration: 5000,
    },
    {
      image: img5,
      title: "Coastal Serenity",
      subtitle: "Nature Meets Design",
      description: "Bringing the outdoors in with organic textures and light.",
      ctaText: "Get Started",
      ctaLink: "/contact",
      duration: 5000,
    },
    {
      image: img6,
      title: "Twilight Haven",
      subtitle: "Luxury in Harmony with Nature",
      description: "A seamless blend of warm interiors and tranquil outdoor landscapes, designed for quiet moments and meaningful gatherings.",
      ctaText: "Explore the Space",
      ctaLink: "/contact",
      duration: 5000,
    }
  ];

  const featuredProjects = projects.slice(0, 3);
  const servicesPreview = services.slice(0, 4);

  return (
    <div className="page-wrapper">
      <HeroSlider
        slides={heroSlides}
        staticTitle="Just Imagine, We'll Create"
        staticSubtitle="Trivie Interrior Solutions for Discerning Clients"
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
                management to deliver smooth, stress-free, trivie interrior
                solutions through a refined mix of image-led and text-driven
                design storytelling.
              </p>
              <Link to="/about" className="btn-global">
                Learn More
              </Link>
            </div>
            <div className="about-image-wrapper">
              <img
                src={aboutImg}
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
