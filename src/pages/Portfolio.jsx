// import React, { useState, useEffect } from "react";
// import Section from "../components/Section";
// import ProjectCard from "../components/ProjectCard";
// import ProjectLightbox from "../components/ProjectLightbox";
// import HeroSlider from "../components/HeroSlider";
// import { projects as initialProjects } from "../data";
// import Loader from "../components/Loader";

// const Portfolio = () => {
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [projects, setProjects] = useState(initialProjects);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPortfolios = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:2000/api/frontend/portfolio"
//         );
//         if (response.ok) {
//           const data = await response.json();

//           const formatImageUrl = (path) => {
//             if (!path) return "";
//             // Replace backslashes with forward slashes
//             let cleanPath = path.replace(/\\/g, "/");
//             // Ensure leading slash
//             if (!cleanPath.startsWith("/")) {
//               cleanPath = "/" + cleanPath;
//             }
//             return `http://localhost:2000${cleanPath}`;
//           };

//           const mappedProjects = data.map((item) => ({
//             id: item._id,
//             title: item.title,
//             category: item.page, // Keeping this for backward compatibility if needed, but we'll use tags for filtering
//             tags: item.tags || [], // Map tags
//             subcategory: "",
//             image:
//               item.images && item.images.length > 0
//                 ? formatImageUrl(item.images[0])
//                 : "", // Use first image
//             description: item.description,
//             gallery: item.images
//               ? item.images.map((img) => formatImageUrl(img))
//               : [],
//             challenge: "", // Not present in API response
//             solution: "", // Not present in API response
//             result: "", // Not present in API response
//             title_one: item.title_one,
//             description_one: item.description_one,
//             title_two: item.title_two,
//             description_two: item.description_two,
//             title_three: item.title_three,
//             description_three: item.description_three,
//           }));

//           if (mappedProjects.length > 0) {
//             setProjects(mappedProjects);
//           }
//         } else {
//           console.error("Failed to fetch portfolios");
//         }
//       } catch (error) {
//         console.error("Error fetching portfolios:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPortfolios();
//   }, []);

//   const categories = [
//     "All",
//     "Luxury",
//     "Residential",
//     "Corporate",
//     "Office",
//     "Hospitality",
//     "Data Center",
//   ];

//   const filteredProjects =
//     activeCategory === "All"
//       ? projects
//       : projects.filter((project) => {
//           // Check if project has tags array and if it includes the active category
//           if (project.tags && Array.isArray(project.tags)) {
//             return project.tags.includes(activeCategory);
//           }
//           // Fallback to old category check if no tags (or for static data)
//           return project.category === activeCategory;
//         });

//   const openLightbox = (project) => {
//     setSelectedProject(project);
//   };

//   const closeLightbox = () => {
//     setSelectedProject(null);
//   };

//   // Create slides for HeroSlider from projects
//   const heroSlides = projects.map((project) => ({
//     image: project.image,
//     projectData: project, // Store project data to access in click handler
//   }));

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="page-portfolio">
//       <HeroSlider
//         slides={heroSlides}
//         staticTitle="Our Work"
//         staticSubtitle="Transforming Visions into Exceptional Spaces"
//         staticDescription="For over 15 years, we've delivered precision-crafted interiors across Mumbai. Explore our portfolio of completed residential, commercial, hospitality, and data centre projects that showcase our commitment to quality and innovation."
//         staticCtaText="View Project"
//         onCtaClick={(slide) => openLightbox(slide.projectData)}
//       />

//       <Section className="text-center" style={{ padding: "var(--space-md) 0" }}>
//         {/* Filter Navigation */}
//         <div className="category-nav">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`category-btn ${
//                 activeCategory === category ? "active" : ""
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </Section>

//       <Section style={{ paddingTop: "0" }}>
//         <div className="portfolio-grid-3-col">
//           {filteredProjects.map((project) => (
//             <ProjectCard
//               key={project.id}
//               {...project}
//               onClick={() => openLightbox(project)}
//             />
//           ))}
//         </div>
//       </Section>

//       {/* Lightbox Modal */}
//       {selectedProject && (
//         <ProjectLightbox project={selectedProject} onClose={closeLightbox} />
//       )}
//     </div>
//   );
// };

// export default Portfolio;


// import React, { useState, useEffect } from "react";
// import Section from "../components/Section";
// import ProjectCard from "../components/ProjectCard";
// import ProjectLightbox from "../components/ProjectLightbox";
// import HeroSlider from "../components/HeroSlider";
// import Loader from "../components/Loader";

// const Portfolio = () => {
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Use environment variable for API base URL
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:2000";

//   useEffect(() => {
//     const fetchPortfolios = async () => {
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/frontend/portfolio`
//         );
//         if (response.ok) {
//           const data = await response.json();

//           const formatImageUrl = (path) => {
//             if (!path) return "";
//             // Replace backslashes with forward slashes
//             let cleanPath = path.replace(/\\/g, "/");
//             // Ensure leading slash
//             if (!cleanPath.startsWith("/")) {
//               cleanPath = "/" + cleanPath;
//             }
//             return `${API_BASE_URL}${cleanPath}`;
//           };

//           const mappedProjects = data.map((item) => ({
//             id: item._id,
//             title: item.title,
//             category: item.page,
//             tags: item.tags || [],
//             subcategory: "",
//             image:
//               item.images && item.images.length > 0
//                 ? formatImageUrl(item.images[0])
//                 : "",
//             description: item.description,
//             gallery: item.images
//               ? item.images.map((img) => formatImageUrl(img))
//               : [],
//             challenge: "",
//             solution: "",
//             result: "",
//             title_one: item.title_one,
//             description_one: item.description_one,
//             title_two: item.title_two,
//             description_two: item.description_two,
//             title_three: item.title_three,
//             description_three: item.description_three,
//           }));

//           setProjects(mappedProjects);
//         } else {
//           console.error("Failed to fetch portfolios");
//         }
//       } catch (error) {
//         console.error("Error fetching portfolios:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPortfolios();
//   }, [API_BASE_URL]);

//   // Dynamically generate categories from projects
//   const categories = ["All"];
//   const categorySet = new Set();

//   projects.forEach((project) => {
//     // Add tags to categories
//     if (project.tags && Array.isArray(project.tags)) {
//       project.tags.forEach((tag) => categorySet.add(tag));
//     }
//     // Also add the main category if it exists
//     if (project.category && project.category !== "All") {
//       categorySet.add(project.category);
//     }
//   });

//   // Convert Set to array and sort
//   const dynamicCategories = Array.from(categorySet).sort();
//   const allCategories = [...categories, ...dynamicCategories];

//   const filteredProjects =
//     activeCategory === "All"
//       ? projects
//       : projects.filter((project) => {
//           // Check if project has tags array and if it includes the active category
//           if (project.tags && Array.isArray(project.tags)) {
//             const hasTag = project.tags.includes(activeCategory);
//             if (hasTag) return true;
//           }
//           // Also check the main category field
//           return project.category === activeCategory;
//         });

//   const openLightbox = (project) => {
//     setSelectedProject(project);
//   };

//   const closeLightbox = () => {
//     setSelectedProject(null);
//   };

//   // Create slides for HeroSlider from projects
//   const heroSlides = projects.map((project) => ({
//     image: project.image,
//     projectData: project,
//   }));

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="page-portfolio">
//       <HeroSlider
//         slides={heroSlides}
//         staticTitle="Our Work"
//         staticSubtitle="Transforming Visions into Exceptional Spaces"
//         staticDescription="For over 15 years, we've delivered precision-crafted interiors across Mumbai. Explore our portfolio of completed residential, commercial, hospitality, and data centre projects that showcase our commitment to quality and innovation."
//         staticCtaText="View Project"
//         onCtaClick={(slide) => openLightbox(slide.projectData)}
//       />

//       <Section className="text-center" style={{ padding: "var(--space-md) 0" }}>
//         {/* Filter Navigation */}
//         <div className="category-nav">
//           {allCategories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`category-btn ${
//                 activeCategory === category ? "active" : ""
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </Section>

//       <Section style={{ paddingTop: "0" }}>
//         <div className="portfolio-grid-3-col">
//           {filteredProjects.map((project) => (
//             <ProjectCard
//               key={project.id}
//               {...project}
//               onClick={() => openLightbox(project)}
//             />
//           ))}
//         </div>
//       </Section>

//       {/* Lightbox Modal */}
//       {selectedProject && (
//         <ProjectLightbox project={selectedProject} onClose={closeLightbox} />
//       )}
//     </div>
//   );
// };

// export default Portfolio;


import React, { useState, useEffect } from "react";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import ProjectLightbox from "../components/ProjectLightbox";
import HeroSlider from "../components/HeroSlider";
import Loader from "../components/Loader";
import DOMPurify from 'dompurify';
import { Pagination, Stack } from '@mui/material';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });
  const projectsPerPage = 6;

  // Use environment variable for API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:2000";

  // Helper function to format image URLs
  const formatImageUrl = (path) => {
    if (!path) return "";
    let cleanPath = path.replace(/\\/g, "/");
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }
    return `${API_BASE_URL}${cleanPath}`;
  };

  // Helper function to map project data
  const mapProjectData = (item) => ({
    id: item._id,
    title: item.title,
    category: Array.isArray(item.category) && item.category.length > 0
      ? item.category[0]
      : "",
    tags: Array.isArray(item.category) ? item.category : [],
    subcategory: "",
    image: item.thumbnail_image ? formatImageUrl(item.thumbnail_image) : "",
    description: "",
    gallery: item.image_gallery ? item.image_gallery.map((img) => formatImageUrl(img)) : [],
    the_challenge: item.the_challenge ? DOMPurify.sanitize(item.the_challenge, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : "",
    our_solution: item.our_solution ? DOMPurify.sanitize(item.our_solution, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : "",
    the_result: item.the_result ? DOMPurify.sanitize(item.the_result, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : "",
    the_challenge_html: item.the_challenge || "",
    our_solution_html: item.our_solution || "",
    the_result_html: item.the_result || "",
    challenge: item.the_challenge || "",
    solution: item.our_solution || "",
    result: item.the_result || "",
    title_one: "The Challenge",
    description_one: item.the_challenge || "",
    title_two: "Our Solution",
    description_two: item.our_solution || "",
    title_three: "The Result",
    description_three: item.the_result || "",
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/category/get`);
        if (response.ok) {
          const result = await response.json();
          if (result.status && Array.isArray(result.data)) {
            setCategories(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [API_BASE_URL]);

  // Fetch ALL projects for the slider (no category filter)
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/frontend/portfolio/get?limit=1000`
        );
        if (response.ok) {
          const result = await response.json();
          const portfolioData = result.data || [];
          setAllProjects(portfolioData.map(mapProjectData));
        }
      } catch (error) {
        console.error("Error fetching all projects for slider:", error);
      }
    };

    fetchAllProjects();
  }, [API_BASE_URL]);

  // Fetch Portfolios
  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      try {
        const categoryParam = activeCategory !== "All" ? `&category=${encodeURIComponent(activeCategory)}` : "";
        const response = await fetch(
          `${API_BASE_URL}/api/frontend/portfolio/get?page=${currentPage}&limit=${projectsPerPage}${categoryParam}`
        );
        if (response.ok) {
          const result = await response.json();
          const portfolioData = result.data || [];

          if (result.pagination) {
            setPagination({
              totalPages: result.pagination.totalPages,
              total: result.pagination.total,
              page: result.pagination.page
            });
          }

          const formatImageUrl = (path) => {
            if (!path) return "";
            let cleanPath = path.replace(/\\/g, "/");
            if (!cleanPath.startsWith("/")) {
              cleanPath = "/" + cleanPath;
            }
            return `${API_BASE_URL}${cleanPath}`;
          };

          const mappedProjects = portfolioData.map((item) => ({
            id: item._id,
            title: item.title,
            category: Array.isArray(item.category) && item.category.length > 0
              ? item.category[0]
              : "",
            tags: Array.isArray(item.category) ? item.category : [],
            subcategory: "",
            image: item.thumbnail_image
              ? formatImageUrl(item.thumbnail_image)
              : "",
            description: "",
            gallery: item.image_gallery
              ? item.image_gallery.map((img) => formatImageUrl(img))
              : [],
            the_challenge: item.the_challenge ? DOMPurify.sanitize(item.the_challenge, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : "",
            our_solution: item.our_solution ? DOMPurify.sanitize(item.our_solution, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : "",
            the_result: item.the_result ? DOMPurify.sanitize(item.the_result, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : "",
            the_challenge_html: item.the_challenge || "",
            our_solution_html: item.our_solution || "",
            the_result_html: item.the_result || "",
            challenge: item.the_challenge || "",
            solution: item.our_solution || "",
            result: item.the_result || "",
            title_one: "The Challenge",
            description_one: item.the_challenge || "",
            title_two: "Our Solution",
            description_two: item.our_solution || "",
            title_three: "The Result",
            description_three: item.the_result || "",
          }));

          setProjects(mappedProjects);
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
  }, [API_BASE_URL, currentPage, activeCategory]);

  // Create all categories array starting with "All"
  const allCategories = ["All", ...categories.map(cat => cat.name)];

  const filteredProjects = projects;

  const openLightbox = (project) => {
    setSelectedProject(project);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  // Create slides for HeroSlider from ALL projects (unfiltered)
  const heroSlides = allProjects.length > 0
    ? allProjects.map((project) => ({
      image: project.image,
      projectData: project,
    }))
    : [{ image: "", duration: 5000 }];


  return (
    <div className="page-portfolio">
      <HeroSlider
        slides={heroSlides}
        staticTitle="Our Work"
        staticSubtitle="Transforming Visions into Exceptional Spaces"
        staticDescription="For over 15 years, we've delivered precision-crafted interiors across Mumbai. Explore our portfolio of completed residential, commercial, hospitality, and data centre projects that showcase our commitment to quality and innovation."
        staticCtaText="View Projects"
        staticCtaLink="#portfolio-grid"
      />

      <Section id="portfolio-grid" className="text-center" style={{ padding: "var(--space-md) 0", scrollMarginTop: "100px" }}>
        {/* Filter Navigation */}
        <div className="category-nav">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1); // Reset to first page
              }}
              className={`category-btn ${activeCategory === category ? "active" : ""
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Section>

      <Section style={{ paddingTop: "0", minHeight: "400px", position: "relative" }}>
        {loading && projects.length === 0 ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem 0" }}>
            <Loader />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="portfolio-grid-3-col" style={{ opacity: loading ? 0.6 : 1, transition: "opacity 0.3s ease" }}>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onClick={() => openLightbox(project)}
              />
            ))}
          </div>
        ) : (
          <div style={{ padding: "4rem 0", textAlign: "center" }}>
            <h3 className="heading-sm" style={{ color: "var(--color-text-light)" }}>No portfolios found</h3>
            <p className="text-body" style={{ marginTop: "1rem" }}>Try selecting another category or check back later.</p>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <Stack alignItems="center" py={5}>
            <Pagination
              count={pagination.totalPages}
              page={currentPage}
              onChange={(event, value) => {
                setCurrentPage(value);
              }}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
              sx={{
                '& .MuiPaginationItem-root': {
                  '&.Mui-selected': {
                    backgroundColor: '#DC0000',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#B30000',
                    },
                  },
                },
              }}
            />
          </Stack>
        )}
      </Section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <ProjectLightbox project={selectedProject} onClose={closeLightbox} />
      )}
    </div>
  );
};

export default Portfolio;