import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

function ProjectCard({ project, index, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const delay = (index % 3) * 100;
  return (
    <div
      className="group relative border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm overflow-hidden cursor-pointer transition-all duration-500"
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
    >
      <div
        className="h-1 w-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${project.color}0a, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{project.icon}</span>
          <span
            className="font-mono text-xs px-2 py-1 rounded-full border"
            style={{
              color: project.color,
              borderColor: project.color + "30",
              background: project.color + "10",
            }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-opacity-90">
          {project.name}
        </h3>
        <p className="font-mono text-xs mb-4" style={{ color: project.color }}>
          {project.tagline}
        </p>
        <p className="font-body text-sm text-mist leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.panels.map((panel) => (
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
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs text-mist/60 bg-[var(--color-void)] px-2 py-1 rounded-sm border border-[var(--color-border)]"
              >
                {tech}
              </span>
            ))}
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

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const filtered =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);
  const visibleProjects = preview ? projects.slice(0, limit) : filtered;

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div
          className="mt-10 text-center font-mono text-xs text-ghost"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease 0.5s",
          }}
        >
          Showing {visibleProjects.length} of {projects.length} projects
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
    </section>
  );
}
