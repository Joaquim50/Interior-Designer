import React from 'react'
import { ArrowRight } from 'lucide-react'

const ProjectCard = ({ id, title, category, image, onClick }) => {
  return (
    <article
      className="project-card"
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${title}`}
    >
      <div className="project-image-wrapper">
        <img src={image} alt={title} className="project-image" />
        <div className="project-overlay"></div>
        <div className="project-icon">
          <ArrowRight size={24} strokeWidth={1.5} />
        </div>
      </div>
      <div className="project-info">
        <span className="project-category">{category}</span>
        <h3 className="project-title">{title}</h3>
      </div>

      <style>{`
        .project-card {
          display: block;
          cursor: pointer;
          position: relative;
          transition: box-shadow 0.35s ease-out;
        }
        
        .project-card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .project-image-wrapper {
          position: relative;
          overflow: hidden;
          margin-bottom: 1.2rem;
          aspect-ratio: 4/3;
          background-color: #f0f0f0;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }

        .project-card:hover .project-image {
          transform: scale(1.03);
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-icon {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text);
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .project-card:hover .project-icon {
          opacity: 1;
          transform: translateY(0);
        }

        .project-info {
          padding: 0 0.5rem;
        }

        .project-category {
          font-size: 0.75rem;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .project-title {
          font-size: 1.35rem;
          font-family: var(--font-heading);
          margin: 0;
          transition: transform 0.3s ease, color 0.3s ease;
          transform-origin: left;
        }

        .project-card:hover .project-title {
          transform: translateY(-3px);
          color: var(--color-text);
        }
        
        /* Focus States for Accessibility */
        .project-card:focus-visible {
            outline: 2px solid var(--color-accent);
            outline-offset: 4px;
        }
        
        .project-card:focus-visible .project-image {
            transform: scale(1.03);
        }
        
        .project-card:focus-visible .project-overlay,
        .project-card:focus-visible .project-icon {
            opacity: 1;
            transform: translateY(0);
        }
      `}</style>
    </article>
  )
}

export default ProjectCard
