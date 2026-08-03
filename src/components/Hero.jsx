import { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";



export default function Hero() {
  const { personalInfo, roles, stats } = useData();
  const [mounted, setMounted] = useState(false);
  const [firstName, ...restName] = personalInfo.name.split(" ");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-[78vh] flex items-center overflow-hidden bg-[var(--color-void)]"
      id="hero"
    >
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-center">
          <div className="max-w-4xl">
            <div
              className={`inline-flex items-center gap-2 border border-gold/20 bg-gold/5 px-4 py-1.5 rounded-full mb-8 transition-all duration-1000 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-6"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-ping-gold relative">
                <span className="absolute inset-0 rounded-full bg-gold animate-ping" />
              </span>
              <span className="font-mono text-xs text-gold/80 tracking-widest uppercase">
                Available for work
              </span>
            </div>

            <h1
              className={`font-display text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-4 transition-all duration-1000 delay-100 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <span className="text-ice inline-block hover:scale-105 transition-transform duration-500">
                {firstName}
              </span>
              <br />
              <span className="text-white inline-block hover:scale-105 transition-transform duration-500">
                {restName.join(" ")}
              </span>
            </h1>

            <div
              className={`text-2xl md:text-3xl font-display mb-6 transition-all duration-1000 delay-200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <RotatingRole roles={roles} />
            </div>

            <p
              className={`font-body text-mist text-lg md:text-xl leading-relaxed max-w-2xl mb-12 transition-all duration-1000 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              {personalInfo.summary}
            </p>

            <div
              className={`flex flex-wrap gap-4 mb-16 transition-all duration-1000 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 bg-gold text-void font-mono text-sm font-bold px-8 py-4 rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_var(--color-glow)] overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">
                  -&gt;
                </span>
                <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group relative inline-flex items-center gap-3 border border-ice/30 text-ice font-mono text-sm px-8 py-4 rounded-sm hover:bg-ice/5 hover:border-ice/60 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="relative z-10 group-hover:rotate-12 transition-transform duration-300">
                  ✉
                </span>
              </a>
              <a
                href={personalInfo.resumeUrl}
                download
                className="group relative inline-flex items-center gap-3 border border-gold/40 text-gold font-mono text-sm px-8 py-4 rounded-sm hover:bg-gold hover:text-void transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Download Resume</span>
                <span className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                  ↓
                </span>
              </a>
            </div>

            <HeroStats stats={stats} mounted={mounted} />
          </div>

          <HeroProfileImage
            name={personalInfo.name}
            src={personalInfo.profileImage}
            mounted={mounted}
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-mono text-xs text-ghost tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
        <div className="w-1 h-1 bg-gold rounded-full animate-scroll-dot" />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--color-ink)]"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      />
    </section>
  );
}

function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let lastTime = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const getAccent = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-particle")
        .trim();
      return raw || "rgba(201,168,76,0.6)";
    };

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    const draw = (time) => {
      const dt = Math.min((time - lastTime) / 16.67, 3);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      const accent = getAccent();

      particles.forEach((particle) => {
        // Gentle mouse attraction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          particle.vx += (dx / dist) * 0.02 * dt;
          particle.vy += (dy / dist) * 0.02 * dt;
        }

        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;

        // Dampen velocity
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Pulsing alpha
        const pulseAlpha =
          particle.alpha *
          (0.8 + 0.2 * Math.sin(time * particle.pulseSpeed + particle.pulse));

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = accent.replace(/[\d.]+\)$/, `${pulseAlpha})`);
        ctx.fill();

        // Glow for larger particles
        if (particle.r > 1) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.r * 2.5, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            particle.r * 0.5,
            particle.x,
            particle.y,
            particle.r * 2.5,
          );
          glowGradient.addColorStop(
            0,
            accent.replace(/[\d.]+\)$/, `${pulseAlpha * 0.5})`),
          );
          glowGradient.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const opacity = 0.09 * (1 - dist / 110);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = accent.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 40%, var(--color-glow) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.3,
        }}
      />
    </>
  );
}

function HeroProfileImage({ name, src, mounted }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const containerRef = useRef(null);
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  // Set fallback if no src provided or if image fails
  useEffect(() => {
    if (!src || src.trim() === "") {
      setImgSrc(
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      );
    } else {
      setImgSrc(src);
    }
  }, [src]);

  const handleImageError = () => {
    if (
      imgSrc !==
      "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
    ) {
      setImgSrc(
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      );
    } else {
      setImageFailed(true);
    }
  };

  const handleMouseMove = (e) => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rotateX = (y / box.height) * -10;
    const rotateY = (x / box.width) * 10;
    if (containerRef.current) {
      containerRef.current.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      className={`relative inline-block transition-all duration-1000 ${
        mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.1s ease-out" }}
    >
      {/* Rotating organic ring */}
      <div
        className="absolute -inset-4 border border-gold/20 animate-spin-slow"
        style={{
          borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
        }}
      />
      <div
        className="absolute -inset-7 border border-dashed border-gold/10 animate-spin-slow"
        style={{
          borderRadius: "50% 50% 55% 45% / 45% 50% 50% 55%",
          animationDirection: "reverse",
          animationDuration: "25s",
        }}
      />

      {/* Octagonal profile frame - SLIGHTLY REDUCED */}
      <div
        className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[24rem] md:h-[24rem] overflow-hidden shadow-[0_0_100px_var(--color-glow)] group"
        style={{
          borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
        }}
      >
        {!imageFailed ? (
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full grid place-items-center bg-[linear-gradient(135deg,var(--color-panel),var(--color-ink))]">
            <span className="font-display text-7xl md:text-8xl font-black text-gradient-gold">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function HeroStats({ stats, mounted }) {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!mounted) return;

    const targetValues = stats.map((s) => parseFloat(s.value) || 0);
    const duration = 2000;
    const steps = 40;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats(targetValues.map((target) => target * eased));

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targetValues);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [mounted, stats]);

  return (
    <div
      className={`flex flex-wrap gap-8 transition-all duration-1000 delay-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {stats.map((stat, index) => (
        <div key={stat.label} className="text-center group cursor-default">
          <div className="font-display text-3xl font-bold text-gold group-hover:scale-110 transition-transform duration-300 inline-block relative">
            {animatedStats[index].toFixed(1)}
            <span className="absolute -top-2 -right-4 text-lg">+</span>
          </div>
          <div className="font-mono text-xs text-mist tracking-widest uppercase mt-1 group-hover:text-ice transition-colors duration-300">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function RotatingRole({ roles }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIndex((current) => (current + 1) % roles.length);
        setIsExiting(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span
      className="text-gradient-gold font-display italic"
      style={{
        display: "inline-block",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: isExiting ? 0 : 1,
        transform: isExiting
          ? "translateY(-12px) scale(0.95)"
          : "translateY(0) scale(1)",
        filter: isExiting ? "blur(2px)" : "blur(0px)",
      }}
    >
      {roles[index]}
    </span>
  );
}
