import React from "react";
import { useParams, Link } from "react-router-dom";
import Section from "../components/Section";
import { projects } from "../data";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

const PortfolioDetail = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:2000/api/frontend/portfolio/get/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status) {
            const item = data.data;
            const formatImageUrl = (path) => {
              if (!path) return "";
              let cleanPath = path.replace(/\\/g, "/");
              if (!cleanPath.startsWith("/")) {
                cleanPath = "/" + cleanPath;
              }
              return `http://localhost:2000${cleanPath}`;
            };

            setProject({
              id: item._id,
              title: item.title,
              category: item.page,
              image:
                item.images && item.images.length > 0
                  ? formatImageUrl(item.images[0])
                  : "",
              description: item.description,
              gallery: item.images
                ? item.images.map((img) => formatImageUrl(img))
                : [],
              title_one: item.title_one,
              description_one: item.description_one,
              title_two: item.title_two,
              description_two: item.description_two,
              title_three: item.title_three,
              description_three: item.description_three,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!project) {
    return (
      <Section className="text-center">
        <h2 className="heading-md">Project Not Found</h2>
        <Link to="/portfolio" className="btn">
          Back to Portfolio
        </Link>
      </Section>
    );
  }

  return (
    <div className="page-portfolio-detail">
      {/* Project Hero */}
      <PageHeader
        title={project.title}
        subtitle={project.category}
        backgroundImage={project.image}
      />

      <Section>
        <Link
          to="/portfolio"
          className="flex"
          style={{
            gap: "0.5rem",
            marginBottom: "2rem",
            fontSize: "0.9rem",
            color: "var(--color-text-light)",
          }}
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 2fr", gap: "4rem" }}
        >
          <div>
            {project.title_one && (
              <>
                <h3 className="heading-md" style={{ color: "#D32F2F" }}>
                  {project.title_one}
                </h3>
                <p
                  style={{
                    color: "var(--color-text-light)",
                    marginBottom: "2rem",
                  }}
                >
                  {project.description_one}
                </p>
              </>
            )}

            {project.title_two && (
              <>
                <h3 className="heading-md" style={{ color: "#D32F2F" }}>
                  {project.title_two}
                </h3>
                <p
                  style={{
                    color: "var(--color-text-light)",
                    marginBottom: "2rem",
                  }}
                >
                  {project.description_two}
                </p>
              </>
            )}

            {project.title_three && (
              <>
                <h3 className="heading-md" style={{ color: "#D32F2F" }}>
                  {project.title_three}
                </h3>
                <p
                  style={{
                    color: "var(--color-text-light)",
                    marginBottom: "2rem",
                  }}
                >
                  {project.description_three}
                </p>
              </>
            )}
          </div>

          <div>
            <h3 className="heading-md" style={{ marginBottom: "1.5rem" }}>
              Gallery
            </h3>
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {project.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  style={{ width: "100%", borderRadius: "4px" }}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PortfolioDetail;
