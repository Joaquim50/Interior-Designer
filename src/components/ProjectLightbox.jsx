import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectLightbox = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!project) return null;

  const images = project.gallery || [project.image];
  const totalImages = images.length;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  // Handle click outside modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="lightbox-overlay" onClick={handleOverlayClick}>
      <div
        className="lightbox-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
      >
        {/* Close Button */}
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* 50/50 Split Container */}
        <div className="lightbox-content">
          {/* LEFT HALF - Image Gallery */}
          <div className="lightbox-gallery">
            <div className="gallery-image-wrapper">
              <img
                src={images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="gallery-image"
              />
            </div>

            {/* Carousel Controls */}
            {totalImages > 1 && (
              <>
                <button
                  className="gallery-nav gallery-nav-prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className="gallery-nav gallery-nav-next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={32} />
                </button>

                {/* Pagination Dots */}
                <div className="gallery-pagination">
                  <span className="pagination-count">
                    {currentImageIndex + 1} / {totalImages}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* RIGHT HALF - Project Story */}
          <div className="lightbox-story">
            <div className="story-content">
              {/* Project Title & Category */}
              <div className="story-header">
                <h2 id="lightbox-title" className="story-title">
                  {project.title}
                </h2>
                <span className="story-category">{project.category}</span>
              </div>

              {/* Case Study Sections */}
              {project.challenge && (
                <>
                  <div className="story-section">
                    <h3 className="section-label">The Challenge</h3>
                    <div className="section-text" dangerouslySetInnerHTML={{ __html: project.the_challenge_html || project.challenge }} />
                  </div>
                </>
              )}

              {project.solution && (
                <>
                  <div className="story-section">
                    <h3 className="section-label">Our Solution</h3>
                    <div className="section-text" dangerouslySetInnerHTML={{ __html: project.our_solution_html || project.solution }} />
                  </div>
                </>
              )}

              {project.result && (
                <>
                  <div className="story-section">
                    <h3 className="section-label">The Result</h3>
                    <div className="section-text" dangerouslySetInnerHTML={{ __html: project.the_result_html || project.result }} />
                  </div>
                </>
              )}

              {/* Fallback if no case study content */}
              {!project.challenge && !project.solution && !project.result && (
                <div className="story-section">
                  {project.title_one && (
                    <>
                      <h3
                        className="section-label"
                        style={{ color: "#D32F2F", marginBottom: "0.5rem" }}
                      >
                        {project.title_one}
                      </h3>
                      <p
                        className="section-text"
                        style={{ marginBottom: "2rem" }}
                      >
                        {project.description_one}
                      </p>
                    </>
                  )}
                  {project.title_two && (
                    <>
                      <h3
                        className="section-label"
                        style={{ color: "#D32F2F", marginBottom: "0.5rem" }}
                      >
                        {project.title_two}
                      </h3>
                      <p
                        className="section-text"
                        style={{ marginBottom: "2rem" }}
                      >
                        {project.description_two}
                      </p>
                    </>
                  )}
                  {project.title_three && (
                    <>
                      <h3
                        className="section-label"
                        style={{ color: "#D32F2F", marginBottom: "0.5rem" }}
                      >
                        {project.title_three}
                      </h3>
                      <p
                        className="section-text"
                        style={{ marginBottom: "2rem" }}
                      >
                        {project.description_three}
                      </p>
                    </>
                  )}
                  {/* Fallback to description if no detailed fields */}
                  {!project.title_one &&
                    !project.title_two &&
                    !project.title_three && (
                      <p className="section-text">{project.description}</p>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLightbox;
