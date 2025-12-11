import React from 'react'
import { Link } from 'react-router-dom'
import { Search, PenTool, FileText, Hammer, Key } from 'lucide-react'

const ProcessSection = () => {
    const steps = [
        {
            id: 1,
            title: "Discover",
            description: "Consultation & Site Analysis",
            icon: <Search size={28} strokeWidth={1.5} />
        },
        {
            id: 2,
            title: "Design",
            description: "Concept Development & 3D Visualization",
            icon: <PenTool size={28} strokeWidth={1.5} />
        },
        {
            id: 3,
            title: "Define",
            description: "Detailed Planning & Final Quote",
            icon: <FileText size={28} strokeWidth={1.5} />
        },
        {
            id: 4,
            title: "Build",
            description: "Meticulous On-Site Execution",
            icon: <Hammer size={28} strokeWidth={1.5} />
        },
        {
            id: 5,
            title: "Deliver",
            description: "Final Walkthrough & Handover",
            icon: <Key size={28} strokeWidth={1.5} />
        }
    ]

    return (
        <section className="process-section-horizontal" style={{ padding: '6rem 0', background: '#fff' }}>
            <div className="container">
                {/* Horizontal Steps Grid */}
                <div className="process-steps-grid">
                    {steps.map((step) => (
                        <div key={step.id} style={{
                            textAlign: 'center',
                            minWidth: '180px'
                        }}>
                            {/* Circular Icon */}
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                background: '#d4c5a8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#fff'
                            }}>
                                {step.icon}
                            </div>

                            {/* Step Title */}
                            <h3 style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'var(--color-text)',
                                marginBottom: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                {step.title}
                            </h3>

                            {/* Step Description */}
                            <p style={{
                                color: 'var(--color-text-light)',
                                fontSize: '0.9rem',
                                lineHeight: '1.6',
                                margin: 0
                            }}>
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProcessSection
