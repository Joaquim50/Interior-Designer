import React, { useState, useEffect } from "react";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import ProjectLightbox from "../components/ProjectLightbox";
import HeroSlider from "../components/HeroSlider";
import { projects as initialProjects } from "../data";
import Loader from "../components/Loader";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch(
          "http://localhost:2000/api/frontend/portfolio"
        );
        if (response.ok) {
          const data = await response.json();

          const formatImageUrl = (path) => {
            if (!path) return "";
            // Replace backslashes with forward slashes
            let cleanPath = path.replace(/\\/g, "/");
            // Ensure leading slash
            if (!cleanPath.startsWith("/")) {
              cleanPath = "/" + cleanPath;
            }
            return `http://localhost:2000${cleanPath}`;
          };

          const mappedProjects = data.map((item) => ({
            id: item._id,
            title: item.title,
            category: item.page, // Keeping this for backward compatibility if needed, but we'll use tags for filtering
            tags: item.tags || [], // Map tags
            subcategory: "",
            image:
              item.images && item.images.length > 0
                ? formatImageUrl(item.images[0])
                : "", // Use first image
            description: item.description,
            gallery: item.images
              ? item.images.map((img) => formatImageUrl(img))
              : [],
            challenge: "", // Not present in API response
            solution: "", // Not present in API response
            result: "", // Not present in API response
            title_one: item.title_one,
            description_one: item.description_one,
            title_two: item.title_two,
            description_two: item.description_two,
            title_three: item.title_three,
            description_three: item.description_three,
          }));

          if (mappedProjects.length > 0) {
            setProjects(mappedProjects);
          }
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
  }, []);

  const categories = [
    "All",
    "Luxury",
    "Residential",
    "Corporate",
    "Office",
    "Hospitality",
    "Data Center",
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => {
          // Check if project has tags array and if it includes the active category
          if (project.tags && Array.isArray(project.tags)) {
            return project.tags.includes(activeCategory);
          }
          // Fallback to old category check if no tags (or for static data)
          return project.category === activeCategory;
        });

  const openLightbox = (project) => {
    setSelectedProject(project);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  // Create slides for HeroSlider from projects
  const heroSlides = projects.map((project) => ({
    image: project.image,
    projectData: project, // Store project data to access in click handler
  }));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-portfolio">
      <HeroSlider
        slides={heroSlides}
        staticTitle="Our Work"
        staticSubtitle="Transforming Visions into Exceptional Spaces"
        staticDescription="For over 15 years, we've delivered precision-crafted interiors across Mumbai. Explore our portfolio of completed residential, commercial, hospitality, and data centre projects that showcase our commitment to quality and innovation."
        staticCtaText="View Project"
        onCtaClick={(slide) => openLightbox(slide.projectData)}
      />

      <Section className="text-center" style={{ padding: "var(--space-md) 0" }}>
        {/* Filter Navigation */}
        <div className="category-nav">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Section>

      <Section style={{ paddingTop: "0" }}>
        <div className="portfolio-grid-3-col">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onClick={() => openLightbox(project)}
            />
          ))}
        </div>
      </Section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <ProjectLightbox project={selectedProject} onClose={closeLightbox} />
      )}
    </div>
  );
};

export default Portfolio;
