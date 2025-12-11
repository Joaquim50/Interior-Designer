import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, PenTool, FileText, Hammer, Key } from "lucide-react";
import anime from "animejs";

const ProcessTimeline = () => {
  const steps = [
    {
      id: 1,
      title: "Discover",
      subtitle: "Consultation & Site Analysis",
      icon: <Search size={32} strokeWidth={1.5} />,
      isFirst: true,
    },
    {
      id: 2,
      title: "Design",
      subtitle: "Concept Development & 3D Visualization",
      icon: <PenTool size={32} strokeWidth={1.5} />,
    },
    {
      id: 3,
      title: "Define",
      subtitle: "Detailed Planning & Final Quote",
      icon: <FileText size={32} strokeWidth={1.5} />,
    },
    {
      id: 4,
      title: "Build",
      subtitle: "Meticulous On-Site Execution",
      icon: <Hammer size={32} strokeWidth={1.5} />,
    },
    {
      id: 5,
      title: "Deliver",
      subtitle: "Final Walkthrough & Handover",
      icon: <Key size={32} strokeWidth={1.5} />,
      isLast: true,
    },
  ];

  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const iconRefs = useRef([]);
  const stepRefs = useRef([]);
  const [isReady, setIsReady] = useState(false);
  const [pathData, setPathData] = useState("");
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const updatePath = () => {
      if (
        !containerRef.current ||
        !pathRef.current ||
        iconRefs.current.length === 0
      )
        return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newPoints = steps.map((_, i) => {
        const icon = iconRefs.current[i];
        if (!icon) return { x: 0, y: 0 };
        const rect = icon.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });

      if (newPoints.some((p) => p.x === 0 && p.y === 0)) return;

      setPoints(newPoints);

      let d = `M ${newPoints[0].x} ${newPoints[0].y}`;
      for (let i = 0; i < newPoints.length - 1; i++) {
        const p0 = newPoints[i];
        const p1 = newPoints[i + 1];
        // Create a smooth S-curve between points
        const cp1x = (p0.x + p1.x) / 2;
        const cp1y = p0.y;
        const cp2x = (p0.x + p1.x) / 2;
        const cp2y = p1.y;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
      }

      setPathData(d);
      setIsReady(true);
    };

    // Initial calculation
    // Small timeout to ensure layout is settled
    const timer = setTimeout(updatePath, 100);
    window.addEventListener("resize", updatePath);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePath);
    };
  }, [steps.length]);

  useEffect(() => {
    if (!isReady || !pathRef.current || !pathData || points.length === 0)
      return;

    const path = pathRef.current;
    path.setAttribute("d", pathData);
    const totalLength = path.getTotalLength();

    // Set initial state
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    // Calculate distances to each icon center along the path
    // We can approximate this by summing segment lengths
    const iconDistances = [0];
    let currentLen = 0;

    // Re-calculate segment lengths
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = (p0.x + p1.x) / 2;
      const cp1y = p0.y;
      const cp2x = (p0.x + p1.x) / 2;
      const cp2y = p1.y;

      const dSegment = `M ${p0.x} ${p0.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
      const tempPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      tempPath.setAttribute("d", dSegment);
      const segmentLen = tempPath.getTotalLength();

      currentLen += segmentLen;
      iconDistances.push(currentLen);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 7000; // Slower animation
            const iconRadius = 50; // Approx radius (width 100px / 2)

            anime({
              targets: path,
              strokeDashoffset: [totalLength, 0],
              duration: duration,
              easing: "linear",
              update: (anim) => {
                
                const currentOffset = parseFloat(path.style.strokeDashoffset);
                const drawnLength = totalLength - currentOffset;

                steps.forEach((_, index) => {
                  const dist = iconDistances[index];
                  const stepEl = stepRefs.current[index];

                  // Check if the "head" of the line is within the icon's range
                  // Range: [center - radius, center + radius]
                  if (
                    drawnLength >= dist - iconRadius &&
                    drawnLength <= dist + iconRadius
                  ) {
                    stepEl.classList.add("hover-active");
                  } else {
                    stepEl.classList.remove("hover-active");
                  }
                });
              },
              complete: () => {
                // Ensure all classes are removed at the end
                steps.forEach((_, index) => {
                  if (stepRefs.current[index]) {
                    stepRefs.current[index].classList.remove("hover-active");
                  }
                });
              },
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isReady, pathData, points, steps.length]);

  return (
    <section className="horizontal-timeline-section">
      <div
        className="container"
        ref={containerRef}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* SVG Overlay */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0, // Strictly behind
            overflow: "visible",
          }}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#e5e5e5" />
            </marker>
          </defs>
          <path
            ref={pathRef}
            fill="none"
            stroke="#dadadaff" // Gray color
            strokeWidth="3"
            strokeDasharray="8 8" // Dotted line
            strokeLinecap="round"
          />
        </svg>

        {/* Section Header */}
        <div
          className="timeline-header"
          style={{ position: "relative", zIndex: 2 }}
        >
          <h2 className="timeline-main-heading">From Vision to Reality</h2>
          <p className="timeline-subtext">
            Our proven five-phase process ensures your project is delivered with
            precision, transparency, and excellence.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div
          className="horizontal-timeline"
          style={{ position: "relative", zIndex: 2 }}
        >
          {steps.map((step, index) => (
            <div key={step.id} className="timeline-step-wrapper">
              {/* Step */}
              <div
                className={`timeline-step ${step.isFirst ? "step-first" : ""} ${
                  step.isLast ? "step-last" : ""
                }`}
                role="button"
                tabIndex={0}
                aria-label={`${step.title}: ${step.subtitle}`}
                ref={(el) => (stepRefs.current[index] = el)}
              >
                {/* Circular Icon */}
                <div
                  className="step-circle"
                  ref={(el) => (iconRefs.current[index] = el)}
                  style={{
                    background: "#fff",
                    zIndex: 2, // Ensure icon is above SVG
                    position: "relative",
                  }}
                >
                  {step.icon}
                </div>

                {/* Step Content */}
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-subtitle-text">{step.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className="timeline-cta"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Link to="/contact" className="btn-timeline-cta">
            CONTACT US
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
