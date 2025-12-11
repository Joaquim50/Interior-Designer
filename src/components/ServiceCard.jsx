import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const ServiceCard = ({ id, title, description, icon }) => {
    return (
        <Link to={`/services/${id}`} className="service-card">
            <div className="service-content">
                <h3 className="service-title">{title}</h3>
                <p className="service-desc">{description}</p>
                <span className="service-link">Learn More <ArrowRight size={16} /></span>
            </div>

            <style>{`
        .service-card {
          display: block;
          padding: 2rem;
          background: var(--color-bg-alt);
          border: 1px solid transparent;
          transition: all 0.3s ease;
          height: 100%;
        }
        .service-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-5px);
        }
        .service-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-family: var(--font-heading);
        }
        .service-desc {
          color: var(--color-text-light);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .service-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text);
          font-weight: 500;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .service-card:hover .service-link {
          color: var(--color-accent);
        }
      `}</style>
        </Link>
    )
}

export default ServiceCard
