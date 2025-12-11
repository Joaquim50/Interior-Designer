import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = ({ title, subtitle, description, image, ctaText, ctaLink }) => {
    return (
        <div className="hero">
            <div className="hero-bg" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="hero-overlay"></div>
            <div className="hero-content container">
                <h2 className="subheading" style={{ color: 'white', opacity: 0.9 }}>{subtitle}</h2>
                <h1 className="heading-xl" style={{ color: 'white' }}>{title}</h1>
                <p className="text-lead" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem' }}>{description}</p>
                <div className="flex" style={{ gap: '1rem', marginTop: '2rem' }}>
                    <Link to={ctaLink} className="btn btn-primary" style={{ borderColor: 'white', background: 'white', color: 'black' }}>
                        {ctaText}
                    </Link>
                    <Link to="/contact" className="btn" style={{ borderColor: 'white', color: 'white' }}>
                        Contact Us
                    </Link>
                </div>
            </div>

            <style>{`
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          z-index: 1;
          transition: transform 10s ease;
        }
        .hero:hover .hero-bg {
          transform: scale(1.05);
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.3);
          z-index: 2;
        }
        .hero-content {
          position: relative;
          z-index: 3;
          padding-top: var(--header-height);
        }
      `}</style>
        </div>
    )
}

export default Hero
