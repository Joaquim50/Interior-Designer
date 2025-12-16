import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PortfolioCategories = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carousel states for each tile
  const [mainIndex, setMainIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0); // Track which image in main project's gallery
  const [topRightIndex, setTopRightIndex] = useState(0);
  const [bottomRightIndex, setBottomRightIndex] = useState(0);

  // Use environment variable for API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:2000";

  // Fetch projects from backend
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/frontend/portfolio`
        );
        if (response.ok) {
          const data = await response.json();

          const formatImageUrl = (path) => {
            if (!path) return "";
            let cleanPath = path.replace(/\\/g, "/");
            if (!cleanPath.startsWith("/")) {
              cleanPath = "/" + cleanPath;
            }
            return `${API_BASE_URL}${cleanPath}`;
          };

          const mappedProjects = data.map((item) => ({
            id: item._id,
            title: item.title,
            category: Array.isArray(item.category) && item.category.length > 0
              ? item.category[0]
              : "",
            tags: Array.isArray(item.category) ? item.category : [],
            subcategory: item.subcategory || "",
            image: item.thumbnail_image
              ? formatImageUrl(item.thumbnail_image)
              : "",
            gallery: item.image_gallery
              ? item.image_gallery.map((img) => formatImageUrl(img))
              : [],
          }));

          setProjects(mappedProjects);

          // Derive categories from projects
          const uniqueCategories = new Set(["All"]);
          mappedProjects.forEach((project) => {
            if (project.category) uniqueCategories.add(project.category);
            if (project.tags && Array.isArray(project.tags)) {
              project.tags.forEach((tag) => uniqueCategories.add(tag));
            }
          });
          setCategories(Array.from(uniqueCategories));
        } else {
          console.error("Failed to fetch portfolios");
        }
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [API_BASE_URL]);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => {
          if (p.tags && Array.isArray(p.tags) && p.tags.includes(activeCategory)) {
            return true;
          }
          return p.category === activeCategory;
        })
      );
    }
    // Reset carousel indices when filter changes
    setMainIndex(0);
    setMainImageIndex(0);
    setTopRightIndex(0);
    setBottomRightIndex(0);
  }, [activeCategory, projects]);

  // Get projects for each tile
  const mainProject = filteredProjects.length > 0
    ? filteredProjects[mainIndex % filteredProjects.length]
    : null;
  const topRightProject = filteredProjects.length > 1
    ? filteredProjects[(mainIndex + 1) % filteredProjects.length]
    : filteredProjects[0] || null;
  const bottomRightProject = filteredProjects.length > 2
    ? filteredProjects[(mainIndex + 2) % filteredProjects.length]
    : filteredProjects[1] || filteredProjects[0] || null;

  // Carousel navigation
  const nextMain = useCallback(() => {
    setMainIndex((prev) => (prev + 1) % filteredProjects.length);
    setMainImageIndex(0); // Reset to first image when changing projects
  }, [filteredProjects.length]);

  const prevMain = () => {
    setMainIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
    setMainImageIndex(0); // Reset to first image when changing projects
  };

  const nextMainImage = useCallback(() => {
    setMainImageIndex(
      (prev) => (prev + 1) % (mainProject?.gallery?.length || 1)
    );
  }, [mainProject]);

  const prevMainImage = () => {
    setMainImageIndex(
      (prev) => (prev - 1 + (mainProject?.gallery?.length || 1)) % (mainProject?.gallery?.length || 1)
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
    const timer = setInterval(nextMainImage, 5000);
    return () => clearInterval(timer);
  }, [nextMainImage]);

  useEffect(() => {
    const timer = setInterval(nextTopRight, 4000);
    return () => clearInterval(timer);
  }, [nextTopRight]);

  useEffect(() => {
    const timer = setInterval(nextBottomRight, 4500);
    return () => clearInterval(timer);
  }, [nextBottomRight]);

  if (loading) {
    return (
      <section className="portfolio-categories-section">
        <div className="container">
          <div className="text-center" style={{ padding: "4rem 0" }}>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!mainProject) {
    return (
      <section className="portfolio-categories-section">
        <div className="container">
          <div className="text-center" style={{ padding: "4rem 0" }}>
            <p>No projects available.</p>
          </div>
        </div>
      </section>
    );
  }

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
              className={`category-btn ${activeCategory === category ? "active" : ""
                }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="bento-grid" style={{ height: "700px" }}>
          {/* Left Large Tile */}
          <div className="bento-tile bento-tile-main">
            <div className="tile-carousel">
              <img
                src={
                  mainProject.gallery?.length > 0
                    ? mainProject.gallery[mainImageIndex % mainProject.gallery.length]
                    : mainProject.image
                }
                alt={mainProject.title}
                className="tile-image"

              />
              <div className="tile-overlay">
                <h3 className="tile-title">{mainProject.title}</h3>
              </div>
              <div className="carousel-controls">
                <button
                  onClick={prevMainImage}
                  className="carousel-arrow carousel-arrow-left"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextMainImage}
                  className="carousel-arrow carousel-arrow-right"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              {mainProject.gallery && mainProject.gallery.length > 1 && (
                <div className="carousel-dots">
                  {mainProject.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImageIndex(idx)}
                      className={`carousel-dot ${idx === mainImageIndex ? "active" : ""
                        }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Top Right Tile */}
          {topRightProject && (
            <div className="bento-tile bento-tile-top-right">
              <div className="tile-carousel">
                <img
                  style={{ objectFit: 'fit' }}
                  src={
                    topRightProject.gallery?.[
                    topRightIndex % (topRightProject.gallery?.length || 1)
                    ] || topRightProject.image
                  }
                  alt={topRightProject.title || topRightProject.title}
                  className="tile-image"
                />
                <div className="tile-overlay">
                  <h4 className="tile-label">{topRightProject.title || topRightProject.title}</h4>
                </div>
                {topRightProject.gallery && topRightProject.gallery.length > 1 && (
                  <div className="carousel-dots">
                    {topRightProject.gallery.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setTopRightIndex(idx)}
                        className={`carousel-dot ${idx === topRightIndex ? "active" : ""
                          }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Right Tile */}
          {bottomRightProject && (
            <div className="bento-tile bento-tile-bottom-right">
              <div className="tile-carousel">
                <img
                  style={{ objectFit: 'fit' }}
                  src={
                    bottomRightProject.gallery?.[
                    bottomRightIndex % (bottomRightProject.gallery?.length || 1)
                    ] || bottomRightProject.image
                  }
                  alt={bottomRightProject.title}
                  className="tile-image"
                />
                <div className="tile-overlay">
                  <h4 className="tile-label">{bottomRightProject.title}</h4>
                </div>
                {bottomRightProject.gallery && bottomRightProject.gallery.length > 1 && (
                  <div className="carousel-dots">
                    {bottomRightProject.gallery.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setBottomRightIndex(idx)}
                        className={`carousel-dot ${idx === bottomRightIndex ? "active" : ""
                          }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioCategories;
