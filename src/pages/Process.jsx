import React from "react";
import HeroSlider from "../components/HeroSlider";
import Section from "../components/Section";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Process = () => {
  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
      duration: 5000,
    },
  ];

  const steps = [
    {
      id: 1,
      title: "Consultation",
      subtitle: "Understanding Your Vision",
      description:
        "We begin with an in-depth consultation to understand your lifestyle, preferences, and functional needs. We analyze the site conditions and discuss your budget and timeline to establish a clear project roadmap.",
      image:
        "https://images.unsplash.com/photo-1556912172-45b7abe8ce8e?auto=format&fit=crop&w=800&q=80",
      buttonText: "Schedule Consultation",
      buttonLink: "/contact",
    },
    {
      id: 2,
      title: "Define",
      subtitle: "Concept & Design Development",
      description:
        "Our design team translates your requirements into a cohesive concept. We create detailed 2D layouts and photorealistic 3D visualizations, allowing you to experience your future space before construction begins.",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      buttonText: "View Design Portfolio",
      buttonLink: "/portfolio",
    },
    {
      id: 3,
      title: "Execution",
      subtitle: "Bringing Design to Life",
      description:
        "With the design finalized, our skilled craftsmen take over. We manage the entire build process with precision, ensuring quality control, timely procurement, and seamless coordination of all agencies on site.",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
      buttonText: "See Our Standards",
      buttonLink: "/services",
    },
    {
      id: 4,
      title: "Styling & Handover",
      subtitle: "The Final Flourish",
      description:
        "The final phase involves curating furniture, art, and accessories to elevate the space. We conduct a thorough quality check and walkthrough before handing over the keys to your ready-to-move-in dream space.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      buttonText: "Book Final Walkthrough",
      buttonLink: "/contact",
    },
  ];

  return (
    <div className="page-process">
      <HeroSlider
        slides={heroSlides}
        staticTitle="Our Seamless Process"
        staticSubtitle="From Vision to Reality, Perfected Over 15 Years"
        staticDescription="Experience the systematic approach that has made us Mumbai's trusted interior partner. Our proven 4-step methodology ensures exceptional results with complete peace of mind."
        staticCtaText="Start Your Project"
        staticCtaLink="/contact"
        autoPlay={false}
      />

      <Section>
        <div className="process-steps-container">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`process-step ${index % 2 !== 0 ? "reverse" : ""}`}
            >
              <div className="step-image-wrapper">
                <img src={step.image} alt={step.title} className="step-image" />
              </div>
              <div className="step-content-wrapper">
                <h3 className="step-title">{step.title}</h3>
                <h4 className="step-subtitle">{step.subtitle}</h4>
                <p className="step-description">{step.description}</p>
                <div style={{ marginTop: "2rem" }}>
                  <Link to={step.buttonLink} className="btn-global">
                    {step.buttonText}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* <Section className="text-center bg-light">
        <div className="container">
          <h2 className="heading-md mb-4">Ready to start your journey?</h2>
          <Link to="/contact" className="btn-global">
            Start Your Project
          </Link>
        </div>
      </Section> */}
    </div>
  );
};

export default Process;
