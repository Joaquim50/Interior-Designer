import React from 'react'

const PageHeader = ({ title, subtitle, backgroundImage }) => {
    return (
        <section className="cta-banner-section">
            <div className="cta-banner-bg">
                <img
                    src={backgroundImage}
                    alt={title}
                    className="cta-bg-image"
                />
                <div className="cta-overlay"></div>
            </div>
            <div className="container relative-z">
                <div className="cta-content">
                    <h1 className="cta-headline">{title}</h1>
                    <div className="cta-accent-line"></div>
                    {subtitle && <p className="cta-text">{subtitle}</p>}
                </div>
            </div>
        </section>
    )
}

export default PageHeader
