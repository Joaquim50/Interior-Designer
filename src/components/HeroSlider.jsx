import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSlider = ({
  slides,
  autoPlay = true,
  transition = "fade",
  staticTitle,
  staticSubtitle,
  staticDescription,
  staticCtaText,
  staticCtaLink,
  onCtaClick,
}) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const duration = slides[current].duration || 5000;
    const timer = setTimeout(nextSlide, duration);

    return () => clearTimeout(timer);
  }, [current, autoPlay, isPaused, nextSlide, slides]);

  const handleCtaClick = (e) => {
    if (staticCtaLink && staticCtaLink.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(staticCtaLink);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (onCtaClick) {
      e.preventDefault();
      onCtaClick(slides[current]);
    }
  };

  return (
    <div
      className={`hero-slider ${transition}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-overlay"></div>
        </div>
      ))}

      {/* Static Content Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "13rem",
        }}
      >
        <div className="container" style={{ pointerEvents: "auto" }}>
          <div className="slide-text-wrapper">
            {staticSubtitle && (
              <h2
                className="subheading"
                style={{
                  color: "white",
                  opacity: 0.9,
                  animation: "fadeInUp 0.8s ease-out 0.3s forwards",
                }}
              >
                {staticSubtitle}
              </h2>
            )}
            {staticTitle && (
              <h1
                className="heading-xl hero-title"
                style={{
                  color: "white",
                  animation: "fadeInUp 0.8s ease-out 0.5s forwards",
                  opacity: 0,
                }}
              >
                {staticTitle}
              </h1>
            )}
            {staticDescription && (
              <p
                style={{
                  color: "white",
                  opacity: 0,
                  maxWidth: "600px",
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  marginTop: "1rem",
                  animation: "fadeInUp 0.8s ease-out 0.6s forwards",
                }}
              >
                {staticDescription}
              </p>
            )}
            <div
              className="flex"
              style={{
                gap: "1rem",
                marginTop: "2rem",
                animation: "fadeInUp 0.8s ease-out 0.7s forwards",
                opacity: 0,
              }}
            >
              {staticCtaText && (
                <Link
                  to={staticCtaLink || "#"}
                  onClick={handleCtaClick}
                  className="btn btn-primary"
                  style={{
                    borderColor: "white",
                    background: "white",
                    color: "black",
                  }}
                >
                  {staticCtaText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

      {/* Navigation Arrows */}
      <div className="slider-arrows">
        <button
          onClick={prevSlide}
          className="arrow-btn"
          aria-label="Previous Slide"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="arrow-btn"
          aria-label="Next Slide"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${index === current ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
