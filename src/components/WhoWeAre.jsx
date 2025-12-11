import React from "react";
import Section from "./Section";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const TeamCard = ({ image, label, name }) => {
  return (
    <div className="team-card" style={{ backgroundImage: `url(${image})` }}>
      <div className="team-content">
        <span className="team-label">{label}</span>
        <h3 className="team-name">{name}</h3>
        <div className="team-actions">
          <button className="btn-read-more">READ MORE</button>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <Facebook size={18} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={18} />
            </a>
            <a href="#" className="social-icon">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <Section className="section-who-we-are" style={{ background: "#F5F0EB" }}>
      {/* Header Area */}
      <div className="who-we-are-header">
        <div>
          <h4
            className="subheading"
            style={{
              display: "inline-block",
              borderBottom: "2px solid var(--color-accent)",
              paddingBottom: "5px",
              marginBottom: "1.5rem",
            }}
          >
            Designers & Innovators
          </h4>
          <h2 className="heading-xl">Who we are?</h2>
        </div>

        <div>
          <p className="text-lead" style={{ color: "#555", lineHeight: "1.8" }}>
            We are a collective of visionaries, architects, and designers
            dedicated to redefining the art of living. Our philosophy is rooted
            in the belief that every space should be a reflection of its
            inhabitants—unique, functional, and inspiring.
          </p>
        </div>
      </div>

      {/* Team Showcase & Inspiration Grid */}
      <div className="team-grid">
        {/* Founder Card */}
        <TeamCard
          image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
          label="MANAGING DIRECTOR"
          name="Sanjiv C. Mehra"
        />

        {/* Co-Founder Card */}
        <TeamCard
          image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80"
          label="DIRECTOR"
          name="Kavash Mehra"
        />

        {/* Inspirational Image with Quote */}
        <div
          className="inspiration-card"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80)",
          }}
        >
          <h3 className="quote-text">
            "Our obsession is creating distinctive interiors."
          </h3>
        </div>
      </div>
    </Section>
  );
};

export default WhoWeAre;
