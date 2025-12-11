import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data";

const PortfolioCategories = () => {
  const categories = [
    "All",
    "Luxury Residential",
    "Corporate Offices",
    "Hospitality",
    "Data Centres",
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Carousel states for each tile
  const [mainIndex, setMainIndex] = useState(0);
  const [topRightIndex, setTopRightIndex] = useState(0);
  const [bottomRightIndex, setBottomRightIndex] = useState(0);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === activeCategory)
      );
    }
    // Reset carousel indices when filter changes
    setMainIndex(0);
    setTopRightIndex(0);
    setBottomRightIndex(0);
  }, [activeCategory]);

  // Get projects for each tile
  const mainProject =
    filteredProjects[mainIndex % filteredProjects.length] || projects[0];
  const topRightProject =
    filteredProjects[(mainIndex + 1) % filteredProjects.length] || projects[1];
  const bottomRightProject =
    filteredProjects[(mainIndex + 2) % filteredProjects.length] || projects[2];

  // Carousel navigation
  const nextMain = useCallback(() => {
    setMainIndex((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const prevMain = () => {
    setMainIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
  };

  const nextTopRight = useCallback(() => {
    setTopRightIndex(
      (prev) => (prev + 1) % (topRightProject?.gallery?.length || 1)
    );
  }, [topRightProject]);

  const nextBottomRight = useCallback(() => {
    setBottomRightIndex(
      (prev) => (prev + 1) % (bottomRightProject?.gallery?.length || 1)
    );
  }, [bottomRightProject]);

  // Auto-play for carousels
  useEffect(() => {
    const timer = setInterval(nextMain, 5000);
    return () => clearInterval(timer);
  }, [nextMain]);

  useEffect(() => {
    const timer = setInterval(nextTopRight, 4000);
    return () => clearInterval(timer);
  }, [nextTopRight]);

  useEffect(() => {
    const timer = setInterval(nextBottomRight, 4500);
    return () => clearInterval(timer);
  }, [nextBottomRight]);

  return (
    <section className="portfolio-categories-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <span className="subheading">Portfolio</span>
          <h2 className="heading-lg">Our Signature Projects</h2>
          <p
            className="text-lead"
            style={{
              marginTop: "0.5rem",
              color: "var(--color-text-light)",
              margin: "0.5rem auto 0",
            }}
          >
            From Corporate Excellence to Luxury Living
          </p>
        </div>

        {/* Category Navigation */}
        <div className="category-nav">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Left Large Tile */}
          <div className="bento-tile bento-tile-main">
            <div className="tile-carousel">
              <img
                src={mainProject.gallery[0]}
                alt={mainProject.title}
                className="tile-image"
              />
              <div className="tile-overlay">
                <h3 className="tile-title">{mainProject.title}</h3>
              </div>
              <div className="carousel-controls">
                <button
                  onClick={prevMain}
                  className="carousel-arrow carousel-arrow-left"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextMain}
                  className="carousel-arrow carousel-arrow-right"
                  aria-label="Next project"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="carousel-dots">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainIndex(idx)}
                    className={`carousel-dot ${
                      idx === mainIndex ? "active" : ""
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Top Right Tile */}
          <div className="bento-tile bento-tile-top-right">
            <div className="tile-carousel">
              <img
                src={
                  topRightProject.gallery[
                    topRightIndex % (topRightProject.gallery?.length || 1)
                  ]
                }
                alt={topRightProject.subcategory}
                className="tile-image"
              />
              <div className="tile-overlay">
                <h4 className="tile-label">{topRightProject.subcategory}</h4>
              </div>
              <div className="carousel-dots">
                {topRightProject.gallery?.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTopRightIndex(idx)}
                    className={`carousel-dot ${
                      idx === topRightIndex ? "active" : ""
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Right Tile */}
          <div className="bento-tile bento-tile-bottom-right">
            <div className="tile-carousel">
              <img
                src={
                  bottomRightProject.gallery[
                    bottomRightIndex % (bottomRightProject.gallery?.length || 1)
                  ]
                }
                alt={bottomRightProject.subcategory}
                className="tile-image"
              />
              <div className="tile-overlay">
                <h4 className="tile-label">{bottomRightProject.subcategory}</h4>
              </div>
              <div className="carousel-dots">
                {bottomRightProject.gallery?.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBottomRightIndex(idx)}
                    className={`carousel-dot ${
                      idx === bottomRightIndex ? "active" : ""
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCategories;
