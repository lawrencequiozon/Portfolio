"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";

const languages = ["JavaScript", "TypeScript", "Python", "PHP", "SQL", "PowerShell"];

const projects = [
  {
    index: "01",
    status: "featured project",
    title: "CHIMS — Child Health Information Monitoring System",
    description: "A web-based system that helps barangay officials monitor and classify child health using height and weight data.",
    problem: "Help barangay officials check and monitor children’s health more efficiently.",
    solution: "Built CHIMS with a dashboard, authentication, CRUD workflows, and searchable records.",
    tags: ["PHP", "MySQL"],
    features: ["User authentication", "Dashboard", "CRUD operations", "Search & filtering", "Responsive design"],
    image: "/chims-dashboard.jpg",
    imageAlt: "CHIMS Nutritional Status Tool dashboard",
    color: "cyan",
  },
  {
    index: "02",
    status: "case study",
    title: "KUSSO — Kali Cafe Unified System for Seamless Operation",
    description: "A point-of-sale and inventory system designed to help Kali Cafe manage daily operations with more clarity.",
    problem: "Kali Cafe was tracking inventory manually, making sales reporting and low-stock monitoring difficult.",
    solution: "Built KUSSO to centralize sales, automate reports, and show inventory warnings before supplies run out.",
    tags: ["POS", "Inventory", "Sales reports"],
    features: ["Point of sale", "Inventory tracking", "Automated sales reports", "Low-stock warnings", "Clearer operations"],
    image: "/kusso.png",
    imageAlt: "KUSSO point-of-sale and inventory dashboard",
    color: "orange",
  },
];

const capabilities = ["Web development", "Backend development", "UI implementation", "Database development", "Maintenance & improvements"];
const techGroups = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "C#", "PHP", "C++"] },
  { label: "Frontend", items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS", "Bootstrap"] },
  { label: "Backend", items: ["Node.js", "Express", "Laravel", "Django", "Spring Boot"] },
  { label: "Database", items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase"] },
  { label: "Tools", items: ["Git", "GitHub", "VS Code", "Docker", "Figma", "Postman"] },
  { label: "Cloud / deployment", items: ["Vercel", "Netlify", "AWS", "Azure", "Google Cloud", "Render"] },
];
const techIconSlugs: Record<string, string> = {
  JavaScript: "javascript", TypeScript: "typescript", Python: "python", Java: "openjdk", "C#": "csharp", PHP: "php", "C++": "cplusplus",
  HTML: "html5", CSS: "css3", React: "react", "Next.js": "nextdotjs", "Tailwind CSS": "tailwindcss", Bootstrap: "bootstrap",
  "Node.js": "nodedotjs", Express: "express", Laravel: "laravel", Django: "django", "Spring Boot": "springboot",
  MySQL: "mysql", PostgreSQL: "postgresql", MongoDB: "mongodb", Firebase: "firebase", Supabase: "supabase",
  Git: "git", GitHub: "github", "VS Code": "visualstudiocode", Docker: "docker", Figma: "figma", Postman: "postman",
  Vercel: "vercel", Netlify: "netlify", AWS: "amazonaws", Azure: "microsoftazure", "Google Cloud": "googlecloud", Render: "render",
};
const techIconColors: Record<string, string> = {
  JavaScript: "f7df1e", TypeScript: "3178c6", Python: "3776ab", Java: "ed8b00", "C#": "512bd4", PHP: "777bb4", "C++": "00599c",
  HTML: "e34f26", CSS: "1572b6", React: "61dafb", "Next.js": "f5f5f5", "Tailwind CSS": "06b6d4", Bootstrap: "7952b3",
  "Node.js": "339933", Express: "f5f5f5", Laravel: "ff2d20", Django: "44b78b", "Spring Boot": "6db33f",
  MySQL: "4479a1", PostgreSQL: "4169e1", MongoDB: "47a248", Firebase: "ffca28", Supabase: "3ecf8e",
  Git: "f05032", GitHub: "f5f5f5", "VS Code": "007acc", Docker: "2496ed", Figma: "f24e1e", Postman: "ff6c37",
  Vercel: "f5f5f5", Netlify: "00c7b7", AWS: "ff9900", Azure: "0078d4", "Google Cloud": "4285f4", Render: "f5f5f5",
};
const learningFocus = [
  { issuer: "FOCUS 01", name: "Cybersecurity", label: "Current learning focus", detail: "Security fundamentals, safer systems, and threat awareness.", color: "cyan" },
  { issuer: "FOCUS 02", name: "Web Development", label: "Building practical systems", detail: "Useful interfaces, reliable backends, and user-friendly experiences.", color: "blue" },
  { issuer: "FOCUS 03", name: "Database Systems", label: "Reliable data foundations", detail: "Organized data, dependable queries, and maintainable system design.", color: "violet" },
];

function ArrowUpRight() { return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" /></svg>; }
function ArrowDown() { return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" /></svg>; }
function MailIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4" width="15" height="12" rx="2" /><path d="m3 6 7 5 7-5" /></svg>; }
function CheckIcon() { return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8.5 3.1 3L13 4.8" /></svg>; }
function SunIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.5" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M15.7 4.3l-1.4 1.4M5.7 14.3l-1.4 1.4" /></svg>; }
function MoonIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16.5 12.8A6.9 6.9 0 0 1 7.2 3.5 7 7 0 1 0 16.5 12.8Z" /></svg>; }

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}><span className="theme-toggle-icon">{theme === "dark" ? <SunIcon /> : <MoonIcon />}</span><span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span></button>;
}

function usePageTransitions() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".section, .contact, .footer"));
    elements.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 55, 275)}ms`);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function TechLogo({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const color = techIconColors[name] ?? "5eead4";
  if (!techIconSlugs[name] || failed) return <span className="tech-logo-fallback" style={{ color: `#${color}` }}>{name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}</span>;
  return <img src={`https://cdn.simpleicons.org/${techIconSlugs[name]}/${color}`} alt={`${name} logo`} loading="lazy" onError={() => setFailed(true)} />;
}
function TechItem({ name }: { name: string }) { return <span className="tech-item"><TechLogo name={name} /><span>{name}</span></span>; }

function useTypewriter(text: string, speed = 48) {
  const [value, setValue] = useState("");
  useEffect(() => {
    let position = 0;
    const timer = window.setInterval(() => {
      position += 1;
      setValue(text.slice(0, position));
      if (position >= text.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [text, speed]);
  return value;
}

function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      if (glowRef.current) {
        glowRef.current.style.left = `${event.clientX}px`;
        glowRef.current.style.top = `${event.clientY}px`;
        glowRef.current.style.opacity = "1";
      }
    };
    const leave = () => { if (glowRef.current) glowRef.current.style.opacity = "0"; };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);
  return <div className="mouse-glow" ref={glowRef} aria-hidden="true" />;
}

function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const startedAt = performance.now();
    const duration = 1400;
    let frame = 0;
    let finishTimer = 0;
    const update = (now: number) => {
      const nextProgress = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setProgress(nextProgress);
      if (nextProgress < 100) {
        frame = window.requestAnimationFrame(update);
      } else {
        finishTimer = window.setTimeout(() => setVisible(false), 220);
      }
    };
    frame = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(finishTimer);
    };
  }, []);
  if (!visible) return null;
  return <div className="boot-screen" aria-hidden="true"><div className="boot-inner"><div className="boot-label"><span>INITIALIZING MARK.QUIOZON</span><b>{progress}%</b></div><div className="boot-bar"><i style={{ transform: `scaleX(${progress / 100})` }} /></div><small>{progress === 100 ? <>SYSTEM READY <b>✓</b></> : "LOADING PORTFOLIO"}</small></div></div>;
}

function scrollToSection(event: ReactMouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.remove("section-focus");
  void target.offsetWidth;
  target.classList.add("section-focus");
  window.setTimeout(() => target.classList.remove("section-focus"), 900);
  const heading = target.querySelector<HTMLElement>(".section-heading");
  const top = heading ? window.scrollY + heading.getBoundingClientRect().top - 28 : window.scrollY + target.getBoundingClientRect().top - 28;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  window.history.replaceState(null, "", `#${id}`);
}

function TiltProfile() {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-5px)`;
  };
  const reset = () => { if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)"; };
  return <div className="profile-badge glass-card" ref={cardRef} onMouseMove={handleMove} onMouseLeave={reset}><div className="profile-photo" role="img" aria-label="Mark Lawrence Quiozon profile photo" /><div><span>MARK LAWRENCE QUIOZON</span><small>BSIT / PUP / CLASS OF 2026</small></div></div>;
}

function ProjectPreview({ image, imageAlt }: { image: string; imageAlt: string }) {
  return <div className="chims-preview"><Image src={image} alt={imageAlt} fill sizes="(max-width: 850px) 92vw, 760px" className="chims-dashboard-image" /><div className="project-scan" /></div>;
}

function ArrowLeft() { return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3m0 0 4-4M3 8l4 4" /></svg>; }
function ArrowRight() { return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10m0 0-4-4m4 4-4 4" /></svg>; }

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];
  const changeProject = (direction: number) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  };

  return <div className="project-carousel" aria-roledescription="carousel" aria-label="Selected projects">
    <article className={`project-card featured-project glass-card ${activeProject.color}`} key={activeProject.index} aria-roledescription="slide" aria-label={`${activeIndex + 1} of ${projects.length}`}>
      <div className="project-top"><span className="project-index">{activeProject.index}</span><span className="project-status"><i /> {activeProject.status}</span></div>
      <div className="project-visual"><ProjectPreview image={activeProject.image} imageAlt={activeProject.imageAlt} /></div>
      <div className="project-main"><div><h3>{activeProject.title}</h3><p>{activeProject.description}</p></div><div className="project-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      <div className="project-details"><div><span>PROBLEM</span><p>{activeProject.problem}</p></div><div><span>SOLUTION</span><p>{activeProject.solution}</p></div></div>
      <div className="project-bottom"><div className="feature-list">{activeProject.features.map((feature) => <span key={feature}>✓ {feature}</span>)}</div><div className="project-arrow"><ArrowUpRight /></div></div>
    </article>
    <div className="carousel-controls">
      <div className="carousel-count"><span>{String(activeIndex + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")}</div>
      <div className="carousel-dots">{projects.map((project, index) => <button className={index === activeIndex ? "active" : ""} key={project.index} onClick={() => setActiveIndex(index)} aria-label={`Show ${project.title}`} aria-current={index === activeIndex ? "true" : undefined} />)}</div>
      <div className="carousel-buttons"><button onClick={() => changeProject(-1)} aria-label="Previous project"><ArrowLeft /></button><button onClick={() => changeProject(1)} aria-label="Next project"><ArrowRight /></button></div>
    </div>
  </div>;
}

type CertificateKey = "isite" | "salesforce";

function CertificatePolaroid() {
  const [zoomed, setZoomed] = useState<CertificateKey | null>(null);
  useEffect(() => {
    if (!zoomed) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [zoomed]);
  const openWithKeyboard = (event: ReactKeyboardEvent<HTMLDivElement>, certificate: CertificateKey) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setZoomed(certificate);
    }
  };
  const zoomImage = zoomed === "salesforce" ? "/salesforce.png" : "/isite.jpg";
  const zoomAlt = zoomed === "salesforce" ? "Salesforce supported virtual internship certificate" : "iSITE certificate of appreciation for presenting KUSSO research";

  return <>
    <figure className="certificate-polaroid">
      <div className="certificate-back" role="button" tabIndex={0} onClick={() => setZoomed("salesforce")} onKeyDown={(event) => openWithKeyboard(event, "salesforce")} aria-label="Zoom Salesforce certificate">
        <div className="certificate-back-photo"><Image src="/salesforce.png" alt="Salesforce supported virtual internship certificate" fill sizes="(max-width: 850px) 80vw, 280px" /></div><span className="certificate-back-label">SALESFORCE / COMPLETION</span>
      </div>
      <div className="certificate-front" role="button" tabIndex={0} onClick={() => setZoomed("isite")} onKeyDown={(event) => openWithKeyboard(event, "isite")} aria-label="Zoom iSITE certificate">
        <div className="certificate-photo"><Image src="/isite.jpg" alt="iSITE certificate of appreciation for presenting KUSSO research" fill sizes="(max-width: 850px) 80vw, 280px" /></div><figcaption>iSITE / RESEARCH PRESENTER<span>KUSSO / MAY 2026</span></figcaption>
      </div>
    </figure>
    {zoomed && <div className="certificate-zoom" role="dialog" aria-modal="true" aria-label="Certificate preview" onClick={() => setZoomed(null)}><div className="certificate-zoom-card" onClick={(event) => event.stopPropagation()}><button className="certificate-zoom-close" type="button" onClick={() => setZoomed(null)} aria-label="Close certificate preview">×</button><div className="certificate-zoom-image"><Image src={zoomImage} alt={zoomAlt} fill sizes="72vw" /></div></div></div>}
  </>;
}

function Terminal() {
  const [phase, setPhase] = useState(0);
  const [typedName, setTypedName] = useState("");
  const [jsonLines, setJsonLines] = useState(0);
  const [buildProgress, setBuildProgress] = useState(0);
  const [languageIndex, setLanguageIndex] = useState(0);
  useEffect(() => {
    let cancelled = false;
    const wait = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration));
    const boot = async () => {
      await wait(450);
      if (cancelled) return;
      setPhase(1);
      for (let index = 1; index <= "mark-lawrence-quiozon".length; index += 1) {
        await wait(52);
        if (cancelled) return;
        setTypedName("mark-lawrence-quiozon".slice(0, index));
      }
      await wait(500);
      if (cancelled) return;
      setPhase(2);
      for (let line = 1; line <= 5; line += 1) {
        await wait(180);
        if (cancelled) return;
        setJsonLines(line);
      }
      await wait(520);
      if (cancelled) return;
      setPhase(3);
      for (let progress = 0; progress <= 100; progress += 4) {
        await wait(35);
        if (cancelled) return;
        setBuildProgress(progress);
      }
      setPhase(4);
    };
    void boot();
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setLanguageIndex((current) => (current + 1) % languages.length), 2200);
    return () => window.clearInterval(timer);
  }, []);
  const profileJson = [
    <><span className="indent"><span className="key">&quot;role&quot;</span>: <span className="string">&quot;web developer / IT professional&quot;</span>,</span></>,
    <><span className="indent"><span className="key">&quot;location&quot;</span>: <span className="string">&quot;Nagcarlan, Laguna&quot;</span>,</span></>,
    <><span className="indent"><span className="key">&quot;learning&quot;</span>: <span className="rotating-value" key={languages[languageIndex]}>&quot;{languages[languageIndex]}&quot;</span></span></>,
    <><span className="indent"><span className="key">&quot;education&quot;</span>: <span className="string">&quot;PUP / BSIT / 2026&quot;</span></span></>,
    <><span className="bracket">&#125;</span></>,
  ];
  return (
    <div className="terminal glass-card" aria-live="polite">
      <div className="terminal-bar"><div className="window-dots"><span /><span /><span /></div><span className="terminal-title">mark@portfolio ~ zsh</span><span className="terminal-actions">— □ ×</span></div>
      <div className="terminal-body">
        <div className="terminal-line"><span className="prompt">➜</span><span>~</span><span className="command">whoami</span></div>
        <div className="terminal-output">{typedName}<span className="caret" /></div>
        {phase >= 2 && <><div className="terminal-line terminal-entry"><span className="prompt">➜</span><span>~</span><span className="command">cat ./profile.json</span></div><div className="terminal-code"><span className="bracket">&#123;</span>{profileJson.slice(0, jsonLines).map((line, index) => <div key={index}>{line}</div>)}</div></>}
        {phase >= 3 && <><div className="terminal-line terminal-entry"><span className="prompt">➜</span><span>~</span><span className="command">./build-something-useful.sh</span></div><div className="terminal-progress"><span>[</span><i style={{ width: `${buildProgress}%` }} /><span>]</span><b>{buildProgress}%</b></div></>}
        {phase >= 4 && <div className="terminal-ready"><i /> SYSTEM READY ✓</div>}
        <div className="terminal-line last-line"><span className="prompt">➜</span><span>~</span><span className="command">_</span><span className="caret" /></div>
      </div>
      <div className="terminal-footer"><span><i className="live-dot" /> system online · {phase >= 4 ? "24ms" : "booting"}</span><span>pup / bsit / 2026</span></div>
    </div>
  );
}

export default function Home() {
  usePageTransitions();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const navigateFromMenu = (event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    setMenuOpen(false);
    scrollToSection(event, id);
  };

  return (
    <main>
      <BootScreen />
      <MouseGlow />
      <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" /><div className="grid-overlay" aria-hidden="true" />
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Mark Lawrence Quiozon home"><span className="brand-mark">ML</span><span className="brand-name">MARK<span>.QUIOZON</span></span></a>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="mobile-navigation">
          <a href="#about" onClick={(event) => navigateFromMenu(event, "about")}>About</a>
          <a href="#stack" onClick={(event) => navigateFromMenu(event, "stack")}>Tech Stack</a>
          <a href="#projects" onClick={(event) => navigateFromMenu(event, "projects")}>Projects</a>
          <a href="#certifications" onClick={(event) => navigateFromMenu(event, "certifications")}>Learning</a>
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="nav-contact" href="#contact" onClick={(event) => scrollToSection(event, "contact")}></a>
          <button className="nav-menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy"><div className="eyebrow"><span className="live-dot" /> Web developer / IT professional <span className="eyebrow-slash">/</span> Nagcarlan, Laguna</div><h1>I build<br /><span>useful systems.</span></h1><p className="hero-intro">I&apos;m Mark Lawrence Quiozon — a web developer and IT professional passionate about building useful, reliable, and user-friendly digital solutions.</p><div className="hero-actions"><a className="button button-primary" href="#projects" onClick={(event) => scrollToSection(event, "projects")}>View my projects <ArrowUpRight /></a><a className="text-link" href="#contact" onClick={(event) => scrollToSection(event, "contact")}>Contact me <ArrowDown /></a></div></div>
        <div className="hero-terminal"><div className="terminal-label">// current session</div><TiltProfile /><Terminal /></div>
      </section>

      <div className="signal-bar"><div className="signal-track"><span>WEB DEVELOPMENT</span><b>✦</b><span>CYBERSECURITY</span><b>✦</b><span>UI / UX</span><b>✦</b><span>DATABASES</span><b>✦</b><span>OPEN SOURCE</span><b>✦</b><span>WEB DEVELOPMENT</span><b>✦</b><span>CYBERSECURITY</span><b>✦</b><span>UI / UX</span><b>✦</b><span>DATABASES</span><b>✦</b><span>OPEN SOURCE</span><b>✦</b></div></div>

      <section className="about section shell" id="about"><div className="section-heading"><div className="section-id">01 <span>/</span> ABOUT ME</div><span className="section-line" /></div><div className="about-grid"><div className="about-title"><span className="micro-label">THE HUMAN BEHIND THE SYSTEM</span><h2>Build useful things.<br /><em>Keep learning.</em></h2><div className="about-image glass-card"><Image src="/me.jpg" alt="Mark Lawrence Quiozon" fill sizes="(max-width: 850px) 92vw, 520px" className="about-photo" /><span className="about-image-label">MARK / 2026</span></div></div><div className="about-copy glass-card"><div className="card-corner">01</div><p className="lead">Hi! I&apos;m Mark Lawrence Quiozon, a web developer and IT professional based in Nagcarlan, Laguna.</p><p>I graduated from the Polytechnic University of the Philippines with a Bachelor of Science in Information Technology, Class of 2026. I&apos;m particularly interested in websites and creating projects that help companies and businesses.</p><p>I&apos;m currently focused on improving my skills in cybersecurity and looking for opportunities to gain experience, contribute to projects, and work with a team.</p><div className="about-links"><a className="underlined-link" href="#contact" onClick={(event) => scrollToSection(event, "contact")}>Start a conversation <ArrowUpRight /></a><a className="underlined-link" href="https://www.facebook.com/marklawrencecaligan.quiozon" target="_blank" rel="noreferrer">Facebook <ArrowUpRight /></a></div></div></div><div className="education-card glass-card"><div><span className="micro-label">EDUCATION</span><strong>Bachelor of Science in Information Technology</strong></div><div><span className="micro-label">SCHOOL</span><strong>Polytechnic University of the Philippines</strong></div><div><span className="micro-label">CLASS</span><strong>2026</strong></div></div></section>

      <section className="stack section shell" id="stack"><div className="section-heading"><div className="section-id">02 <span>/</span> TECH STACK</div><span className="section-line" /></div><div className="stack-intro"><h2>Tools for turning<br /><em>ideas into systems.</em></h2><p>Grouped by the parts of a project I enjoy bringing to life.</p></div><div className="stack-grid">{techGroups.map((group) => <div className="stack-group glass-card" key={group.label}><span className="micro-label">{group.label}</span><div className="stack-items">{group.items.map((item) => <TechItem key={item} name={item} />)}</div></div>)}</div></section>

      <section className="projects section shell" id="projects"><div className="section-heading"><div className="section-id">03 <span>/</span> SELECTED PROJECT</div><span className="section-line" /></div><div className="projects-intro"><h2>Proof of <em>practice.</em></h2><p>Projects built around real community needs.</p></div><ProjectCarousel /></section>

      <section className="services section shell" id="services"><div className="section-heading"><div className="section-id">04 <span>/</span> WHAT I CAN DO</div><span className="section-line" /></div><div className="services-grid">{capabilities.map((capability, index) => <div className="service-item" key={capability}><span>0{index + 1}</span><h3>{capability}</h3><ArrowUpRight /></div>)}</div></section>

      <section className="credentials section shell" id="certifications"><div className="section-heading"><div className="section-id">05 <span>/</span> LEARNING FOCUS</div><span className="section-line" /></div><div className="credentials-grid"><div className="credential-intro"><span className="micro-label">THE NEXT RELEASE</span><h2>Always learning.<br /><em>Always useful.</em></h2><p>I&apos;m currently sharpening my cybersecurity foundations while building stronger web, backend, and database skills.</p><CertificatePolaroid /></div><div className="credential-cards">{learningFocus.map((focus) => <div className={`credential-card glass-card ${focus.color}`} key={focus.name}><div className="credential-top"><span>{focus.issuer}</span><span className="credential-check"><CheckIcon /></span></div><div className="credential-name">{focus.name}</div><p className="credential-description">{focus.detail}</p><div className="credential-status">{focus.label}</div></div>)}</div></div></section>

      <section className="contact shell" id="contact"><div className="contact-orb" aria-hidden="true" /><div className="micro-label">LET&apos;S WORK TOGETHER</div><h2>Have a project or<br /><em>opportunity?</em></h2><p className="contact-copy">Have a project, opportunity, or idea you&apos;d like to discuss? Feel free to get in touch.</p><div className="contact-actions"><a className="button button-primary" href="mailto:mark.lawrence@example.com">Get in touch <MailIcon /></a><a className="contact-social" href="https://www.facebook.com/marklawrencecaligan.quiozon" target="_blank" rel="noreferrer">Connect on Facebook <ArrowUpRight /></a></div></section>
      <footer className="footer shell"><span>© 2026 MARK LAWRENCE QUIOZON</span><span className="footer-center">BUILD / SUPPORT / REPEAT</span><div className="footer-links"><a href="#contact" aria-label="Contact Mark"><MailIcon /></a><a href="#top" aria-label="Back to top"><ArrowUpRight /></a></div></footer>
    </main>
  );
}
