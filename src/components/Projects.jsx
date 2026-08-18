import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

function getProjectCover(project) {
  return project.images?.[0] || project.image || "";
}

function ProjectCard({ project, index, isVisible, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const delay = (index % 3) * 100;
  const cover = getProjectCover(project);
  const hasGallery = Array.isArray(project.images) && project.images.length > 0;

  return (
    <button
      type="button"
      className="group relative text-left border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm overflow-hidden transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-gold/40"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(50px) scale(0.97)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
        borderColor: hovered ? project.color + "60" : undefined,
        boxShadow: hovered ? `0 20px 60px ${project.color}18` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
    >
      {cover ? (
        <div className="relative h-44 overflow-hidden">
          <img
            src={cover}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.15))",
            }}
          />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="font-mono text-[10px] px-2 py-1 rounded-full border backdrop-blur-sm"
              style={{
                color: project.color,
                borderColor: project.color + "30",
                background: "rgba(0,0,0,0.35)",
              }}
            >
              {project.category}
            </span>
            {hasGallery && (
              <span className="font-mono text-[10px] px-2 py-1 rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-sm">
                {project.images.length} photos
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 50% 20%, ${project.color}2a, transparent), linear-gradient(180deg, rgba(255,255,255,0.02), transparent)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">{project.icon || "💼"}</span>
          </div>
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="font-mono text-[10px] px-2 py-1 rounded-full border"
              style={{
                color: project.color,
                borderColor: project.color + "30",
                background: project.color + "10",
              }}
            >
              {project.category}
            </span>
          </div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${project.color}0a, transparent)`, opacity: hovered ? 1 : 0 }} />

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4 gap-4">
          {!cover && <span className="text-3xl">{project.icon || "💼"}</span>}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-opacity-90 truncate">
              {project.name}
            </h3>
            <p className="font-mono text-xs" style={{ color: project.color }}>
              {project.tagline}
            </p>
          </div>
        </div>

        <p
          className="font-body text-sm text-mist leading-relaxed mb-5"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(project.panels || []).slice(0, 4).map((panel) => (
            <span
              key={panel}
              className="font-mono text-xs text-ghost border border-ghost/20 px-2 py-0.5 rounded-full"
            >
              {panel}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-[var(--color-border)]">
          <div className="flex flex-wrap gap-1.5">
            {(project.stack || []).slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs text-mist/60 bg-[var(--color-void)] px-2 py-1 rounded-sm border border-[var(--color-border)]"
              >
                {tech}
              </span>
            ))}
            {(project.stack || []).length > 6 && (
              <span className="font-mono text-xs text-gold bg-gold/10 px-2 py-1 rounded-sm border border-gold/20">
                +{project.stack.length - 6}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function ProjectModal({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(getProjectCover(project));
  const gallery = project.images || [];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    setActiveImage(getProjectCover(project));
  }, [project]);

  const detailItems = useMemo(
    () => [
      { label: "Category", value: project.category },
      { label: "Status", value: project.status },
      { label: "Year", value: project.year || "N/A" },
      { label: "Tech Stack", value: (project.stack || []).join(", ") || "N/A" },
      { label: "Panels", value: (project.panels || []).join(", ") || "N/A" },
    ],
    [project],
  );

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-white/10 bg-[var(--color-ink)] rounded-2xl shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span
                  className="font-mono text-[10px] px-2 py-1 rounded-full border"
                  style={{
                    color: project.color,
                    borderColor: project.color + "30",
                    background: project.color + "10",
                  }}
                >
                  {project.category}
                </span>
                <h3 className="mt-3 font-display text-3xl md:text-4xl text-white font-black">
                  {project.name}
                </h3>
                <p className="mt-2 text-gold/80 font-mono text-sm">
                  {project.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-10 w-10 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                x
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={project.name}
                  className="w-full aspect-[16/10] object-cover"
                />
              ) : (
                <div
                  className="w-full aspect-[16/10] flex items-center justify-center"
                  style={{
                    background: `radial-gradient(ellipse 80% 80% at 50% 20%, ${project.color}2a, transparent), linear-gradient(180deg, rgba(255,255,255,0.02), transparent)`,
                  }}
                >
                  <span className="text-7xl">{project.icon || "💼"}</span>
                </div>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`rounded-xl overflow-hidden border transition-all ${activeImage === image ? "border-gold ring-2 ring-gold/30" : "border-white/10 opacity-80 hover:opacity-100"}`}
                  >
                    <img
                      src={image}
                      alt={project.name}
                      className="h-20 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <p className="mt-5 text-mist leading-relaxed text-sm md:text-base">
              {project.description}
            </p>
          </div>

          <div className="p-5 md:p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {detailItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-gold/70">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm text-white/90 break-words">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-gold/70 mb-2">
                Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {(project.stack || []).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-gold/70 mb-2">
                Links
              </div>
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-gold/30 bg-gold text-void px-4 py-2 text-sm font-semibold hover:bg-gold-light transition-colors"
                  >
                    Live Demo
                  </a>
                )}
                {project.figma && (
                  <a
                    href={project.figma}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    Figma
                  </a>
                )}
                {project.playStore && (
                  <a
                    href={project.playStore}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    Play Store
                  </a>
                )}
              </div>
            </div>

            {project.seoDescription && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold/70 mb-2">
                  SEO Notes
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {project.seoDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ preview = false, limit = 4 }) {
  const { projects } = useData();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const filtered =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);
  const visibleProjects = preview ? filtered.slice(0, limit) : filtered;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section
      id="projects"
      className="bg-[var(--color-ink)] py-10 px-6"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div
            className="font-mono text-xs text-gold tracking-widest uppercase mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            Featured Projects
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display text-5xl md:text-6xl font-black text-white"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              What I've
              <br />
              <span className="text-gradient-gold italic">Built</span>
            </h2>

            {preview ? (
              <Link
                to="/projects"
                className="font-mono text-xs px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-void transition-all duration-300"
              >
                View All Projects
              </Link>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                      filter === category
                        ? "bg-gold text-void border-gold"
                        : "border-[var(--color-border)] text-mist hover:border-gold/40 hover:text-gold/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {visibleProjects.length === 0 ? (
          <div className="border border-[var(--color-border)] rounded-sm p-8 text-center text-mist">
            No projects found for this filter.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                isVisible={isVisible}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        )}

        <div
          className="mt-10 text-center font-mono text-xs text-ghost"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease 0.5s",
          }}
        >
          Showing {visibleProjects.length} of {filtered.length} projects
          {preview && (
            <Link
              to="/projects"
              className="ml-3 text-gold hover:text-gold-light transition-colors"
            >
              View all
            </Link>
          )}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
