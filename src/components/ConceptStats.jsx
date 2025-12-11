import React, { useEffect, useState, useRef } from 'react'

const CircularProgress = ({ percentage, label1, label2 }) => {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef(null)

    const radius = 50
    const circumference = 2 * Math.PI * radius
    // If visible, calculate offset based on percentage. If not, full circumference (empty).
    const strokeDashoffset = isVisible
        ? circumference - (percentage / 100) * circumference
        : circumference

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div className="stat-item text-center" ref={ref}>
            <div className="circular-chart-wrapper">
                <svg className="circular-chart" viewBox="0 0 120 120">
                    <circle
                        className="circular-bg"
                        cx="60"
                        cy="60"
                        r={radius}
                    />
                    <circle
                        className="circular-progress"
                        cx="60"
                        cy="60"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                    />
                    <text x="60" y="65" className="percentage-text">{percentage}%</text>
                </svg>
            </div>
            <div className="stat-label">
                <span className="label-line-1">{label1}</span>
                <span className="label-line-2">{label2}</span>
            </div>
        </div>
    )
}

const ConceptStats = () => {
    return (
        <div className="grid concept-grid" style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid #eee' }}>
            {/* Left Content */}
            <div className="concept-content">
                <p className="text-lead" style={{ marginBottom: '2rem', color: '#333' }}>
                    We believe that great design is not just about aesthetics, but about creating spaces that enhance the way you live and work. Our approach combines functionality with timeless elegance to deliver results that are both beautiful and practical.
                </p>
                <button className="btn-pill">OUR CONCEPT</button>
            </div>

            {/* Right Stats */}
            <div className="stats-grid">
                <CircularProgress
                    percentage={75}
                    label1="SPENT PER PROJECT"
                    label2="Designing"
                />
                <CircularProgress
                    percentage={85}
                    label1="BASIC CONCEPT"
                    label2="Approved"
                />
                <CircularProgress
                    percentage={100}
                    label1="CLIENT SATISFACTION"
                    label2="Guaranteed"
                />
            </div>
        </div>
    )
}

export default ConceptStats
