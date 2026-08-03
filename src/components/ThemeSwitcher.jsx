import { useEffect, useState } from "react";

const THEMES = [
  { key: "gold", label: "Gold (Default)" },
  { key: "ocean", label: "Ocean Blue" },
  { key: "neon", label: "Neon Magenta" },
  { key: "ember", label: "Ember Orange" },
  { key: "sage", label: "Sage Green" },
  { key: "black", label: "Mono Black" },
  { key: "white", label: "Clean White" },
];

export default function ThemeSwitcher() {
  const [active, setActive] = useState("gold");

  const apply = (key) => {
    setActive(key);
    if (key === "gold") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", key);
    }
    localStorage.setItem("portfolio-theme", key);
  };

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") || "gold";
    apply(saved);
  }, []);

  return (
    <div className="theme-switcher" role="group" aria-label="Color theme">
      {THEMES.map((t) => (
        <button
          key={t.key}
          data-t={t.key}
          className={`theme-dot ${active === t.key ? "active" : ""}`}
          onClick={() => apply(t.key)}
          title={t.label}
          aria-label={t.label}
          aria-pressed={active === t.key}
        />
      ))}
    </div>
  );
}
