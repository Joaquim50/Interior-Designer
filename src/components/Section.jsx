import React from 'react'

const Section = ({ children, className = '', alt = false, id = '', style = {} }) => {
    return (
        <section
            id={id}
            className={`section ${alt ? 'section-alt' : ''} ${className}`}
            style={style}
        >
            <div className="container">
                {children}
            </div>
        </section>
    )
}

export default Section
