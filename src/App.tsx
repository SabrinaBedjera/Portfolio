import { useEffect, useRef, useState, type CSSProperties } from "react"
import "./curiosity-home.css"

type Project = {
  slug: string
  number: string
  title: string
  eyebrow: string
  summary: string
  description: string
  caseHeadline: string
  caseIntroduction: string
  contributions: Array<{
    number: string
    title: string
    body: string
    highlight?: string
  }>
  image?: string
  imageAlt?: string
  featureImage: string
  featureImageAlt: string
  tone: "mineral" | "data" | "energy"
}

const projects: Project[] = [
  {
    slug: "critical-minerals",
    number: "01",
    title: "Critical Minerals Investment & Commercialization",
    eyebrow: "Investment strategy · Materials",
    summary:
      "Evaluating strategic mineral opportunities from technical promise to commercial reality.",
    description:
      "A future case study exploring the questions, frameworks and decision-making behind strategic critical minerals investments.",
    caseHeadline: "Turning Critical Minerals Projects into Investments",
    caseIntroduction:
      "Technical assessment, commercial negotiations, investment strategy and data analytics supporting critical minerals investment and commercialization.",
    contributions: [
      {
        number: "01",
        title: "Assessing Projects",
        highlight: "$3.5B combined investment envelope",
        body: "Coordinated multidisciplinary technical, financial and commercial assessments of critical minerals and clean energy projects, supporting investment decisions across federal funding programs with a combined $3.5B investment envelope.",
      },
      {
        number: "02",
        title: "Negotiating Deals",
        highlight: "Canada’s first critical minerals offtake agreements",
        body: "Evaluated project economics, technical feasibility and commercial considerations, and collaborated on agreements with Nouveau Monde Graphite and Rio Tinto.",
      },
      {
        number: "03",
        title: "Designing Investment Programs",
        highlight: "Canada Critical Minerals Accelerator",
        body: "Helped shape the program, applying lessons from earlier investment and offtake work to inform strategy, project assessment and financing approaches.",
      },
      {
        number: "04",
        title: "Visualizing Investments",
        highlight: "Interactive Power BI dashboards",
        body: "Developed dashboards to visualize project pipelines, track funding allocations and support strategic investment decisions.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1784662193217-62fb0fd7ec2c?auto=format&fit=crop&w=1800&q=90",
    imageAlt:
      "Placeholder image of glowing pink and red mineral crystals against a dark background",
    featureImage: "/critical-minerals.png",
    featureImageAlt:
      "A curated arrangement of colourful mineral specimens on a white background",
    tone: "mineral",
  },
  {
    slug: "pacific-renewable-energy",
    number: "02",
    title: "Pacific Renewable Energy Data Visualization",
    eyebrow: "Independent project · Data",
    summary:
      "Tracing electricity access and renewable energy transitions across Papua New Guinea and Tonga.",
    description:
      "An interactive visual investigation of energy access and transition pathways. Final charts, methodology and source notes will be added to the complete case study.",
    caseHeadline: "Making Pacific Energy Transitions Visible",
    caseIntroduction:
      "An independent interactive data visualization examining electricity access and renewable energy transitions in Papua New Guinea and Tonga.",
    contributions: [
      {
        number: "01",
        title: "Investigating Pacific Energy Systems",
        highlight: "Electricity Access & Renewable Energy",
        body: "Analyzed electricity access, power generation and renewable energy development across Pacific Island countries and territories, including Papua New Guinea and Tonga.",
      },
      {
        number: "02",
        title: "Analyzing Energy Data",
        highlight: "Pacific Data Hub & IRENA",
        body: "Collected, cleaned and compared energy datasets from Pacific Data Hub and IRENA to investigate oil dependence, renewable electricity generation and differences in energy infrastructure.",
      },
      {
        number: "03",
        title: "Building Interactive Visualizations",
        highlight: "Excel & Flourish",
        body: "Developed interactive data visualizations using Excel and Flourish, including animated scatterplots, packed bubble charts and radial charts to explore energy trends across Pacific countries.",
      },
      {
        number: "04",
        title: "Communicating Energy Transitions",
        highlight: "Visual Storytelling Through Data",
        body: "Created an accessible visual narrative highlighting the different energy transition challenges facing Pacific Island countries, from electricity access to reducing oil dependence and expanding renewable capacity.",
      },
    ],
    featureImage: "/pacific-energy.png",
    featureImageAlt:
      "Lush mountainous Pacific Islands landscape with cloud moving through deep green valleys",
    tone: "data",
  },
  {
    slug: "clean-energy-innovation",
    number: "03",
    title: "Clean Energy Technology & Innovation",
    eyebrow: "Research · Collaboration",
    summary:
      "Connecting carbon management, emerging technology and international collaboration.",
    description:
      "A future case study bringing together selected work across clean energy technology research, strategy and international collaboration.",
    caseHeadline: "Connecting Clean Energy Ideas to Action",
    caseIntroduction:
      "Work spanning clean energy technology, carbon management strategy and international collaboration, with particular emphasis on carbon capture, utilization and storage.",
    contributions: [
      {
        number: "01",
        title: "Shaping Clean Energy Strategy",
        highlight: "Canada’s Carbon Management Strategy",
        body: "Contributed to Canada’s Carbon Management Strategy, supporting approaches to advance carbon management technologies and industrial decarbonization.",
      },
      {
        number: "02",
        title: "Assessing CCUS Technologies",
        highlight: "Carbon Capture, Utilization & Storage (CCUS)",
        body: "Reviewed technical information on carbon capture, utilization and storage (CCUS), connecting technology developments with Canadian industry and policy considerations.",
      },
      {
        number: "03",
        title: "Advancing International Collaboration",
        highlight: "IEA Committee on Energy Research and Technology",
        body: "Supported Canada’s engagement with the International Energy Agency’s Committee on Energy Research and Technology (CERT), contributing technical analysis and Canadian perspectives to international clean energy innovation discussions.",
      },
      {
        number: "04",
        title: "Translating Technical Knowledge",
        highlight: "IEA CCUS Regulatory Handbook",
        body: "Provided technical review and Canadian regulatory context for an International Energy Agency handbook on CCUS legal and regulatory frameworks.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1678984238170-00e65a997e34?auto=format&fit=crop&w=1800&q=90",
    imageAlt:
      "Tall industrial processing tower with a dense network of steel pipes",
    featureImage: "/clean-energy.png",
    featureImageAlt:
      "Direct air capture installation with repeating industrial equipment set against a green landscape",
    tone: "energy",
  },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={diagonal ? "arrow arrow--diagonal" : "arrow"}
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function EnergyGraphic({ large = false }: { large?: boolean }) {
  return (
    <div className={`energy-graphic ${large ? "energy-graphic--large" : ""}`}>
      <div className="chart-meta">
        <span>Electricity access</span>
        <span>2000—2022</span>
      </div>
      <svg
        viewBox="0 0 800 460"
        role="img"
        aria-label="Placeholder line chart comparing energy access trends in Papua New Guinea and Tonga"
      >
        <g className="grid">
          <path d="M40 70H760M40 170H760M40 270H760M40 370H760" />
          <path d="M40 55V390M220 55V390M400 55V390M580 55V390M760 55V390" />
        </g>
        <path
          className="line line--one"
          d="M40 315 C150 305,165 280,220 282 S345 250,400 252 S510 215,580 222 S680 180,760 150"
        />
        <path
          className="line line--two"
          d="M40 200 C145 196,165 170,220 172 S330 150,400 142 S520 112,580 105 S700 90,760 70"
        />
        <g className="dots">
          <circle cx="760" cy="150" r="7" />
          <circle cx="760" cy="70" r="7" />
        </g>
      </svg>
      <div className="chart-legend">
        <span>
          <i className="legend-dot legend-dot--orange" />
          Papua New Guinea
        </span>
        <span>
          <i className="legend-dot legend-dot--pink" />
          Tonga
        </span>
      </div>
    </div>
  )
}

const paletteStudies = [
  {
    name: "Deep teal",
    description: "Cool ivory · Muted sage",
    background: "#ECEFE8",
    ink: "#173C3A",
    accent: "#1E5A55",
    secondary: "#8B9B84",
  },
  {
    name: "Charcoal",
    description: "Soft grey · Muted plum",
    background: "#E8E7E8",
    ink: "#29282A",
    accent: "#2C2B2D",
    secondary: "#76596C",
  },
  {
    name: "Soft white",
    description: "Slate blue · Charcoal",
    background: "#F5F5F2",
    ink: "#262C31",
    accent: "#536C87",
    secondary: "#2D3338",
  },
]

function PaletteStudy() {
  return (
    <section className="palette-study" aria-labelledby="palette-study-title">
      <div className="palette-study__heading">
        <div>
          <p>Colour direction study · Prototype only</p>
          <h2 id="palette-study-title">
            Three quieter <em>directions</em>
          </h2>
        </div>
        <p>
          The layout, imagery and hierarchy are held constant. The existing
          gallery remains unchanged below.
        </p>
      </div>

      <div className="palette-study__grid">
        {paletteStudies.map((palette, index) => {
          const style = {
            "--study-bg": palette.background,
            "--study-ink": palette.ink,
            "--study-accent": palette.accent,
            "--study-secondary": palette.secondary,
          } as CSSProperties

          return (
            <article
              className="palette-option"
              style={style}
              key={palette.name}
            >
              <div className="palette-option__topline">
                <span>0{index + 1}</span>
                <span>{palette.name}</span>
              </div>
              <div className="palette-option__composition" aria-hidden="true">
                <div className="palette-option__mineral">
                  <img src={projects[0].image} alt="" />
                  <div>
                    <i />
                    <span>Critical Minerals</span>
                  </div>
                </div>
                <div className="palette-option__data">
                  <svg viewBox="0 0 200 90">
                    <path
                      className="study-grid"
                      d="M5 20H195M5 45H195M5 70H195"
                    />
                    <path
                      className="study-line study-line--one"
                      d="M5 70C35 65 42 54 65 57S105 42 125 45s42-21 70-26"
                    />
                    <path
                      className="study-line study-line--two"
                      d="M5 49c31-2 40-15 64-14s42-8 64-13 38-8 62-10"
                    />
                  </svg>
                  <span>Pacific Energy Data</span>
                </div>
                <div className="palette-option__energy">
                  <img src={projects[2].image} alt="" />
                  <span>Clean Energy</span>
                </div>
              </div>
              <div className="palette-option__footer">
                <div>
                  <span
                    className="palette-swatch"
                    style={{ backgroundColor: palette.background }}
                  />
                  <span
                    className="palette-swatch"
                    style={{ backgroundColor: palette.accent }}
                  />
                  <span
                    className="palette-swatch"
                    style={{ backgroundColor: palette.secondary }}
                  />
                </div>
                <p>{palette.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

const homeNavigation = [
  ["Home", "home"],
  ["Selected Work", "selected-work"],
  ["Lab", "lab"],
  ["Experience", "experience"],
  ["Education", "education"],
  ["About", "about"],
  ["Contact", "contact"],
]

function ExhibitLabel({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <span className="exhibit-label">
      <span className="exhibit-label__number">{number}</span>
      <span className="exhibit-label__title">{title}</span>
      <span className="exhibit-label__description">{description}</span>
      <span className="exhibit-label__arrow" aria-hidden="true">
        →
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------
   Cabinet-of-curiosities homepage (phase 1: background, type, stands)
   Geometry is in pixels of the 1672 × 941 reference/background image and
   converted to container units in CSS, so everything stays locked to the
   photograph at any size. Each exhibit has an empty `.ch-object` slot for
   the photorealistic object added in phase 2.
------------------------------------------------------------------- */

type Stand = {
  x: number // front face, top-left corner
  y: number
  w: number // front face width
  h: number // front face height
  d: number // visible depth of the top face
  s: number // horizontal shift of the back edge (+ shows right side, − shows left side)
}

type Exhibit = {
  key: string
  number: string
  title: string
  description: string
  href: string
  stand: Stand
  label: { x: number; y: number; w: number; h: number; r: number }
}

const exhibits: Exhibit[] = [
  {
    key: "work", number: "01", title: "Selected Work", description: "Case studies and featured projects", href: "#selected-work",
    stand: { x: 330, y: 786, w: 465, h: 120, d: 40, s: 26 },
    label: { x: 372, y: 798, w: 398, h: 104, r: -3 },
  },
  {
    key: "lab", number: "02", title: "Lab", description: "Technical and creative projects", href: "#lab",
    stand: { x: 574, y: 498, w: 298, h: 108, d: 22, s: 14 },
    label: { x: 618, y: 512, w: 254, h: 90, r: -2 },
  },
  {
    key: "experience", number: "03", title: "Experience", description: "Professional background", href: "#experience",
    stand: { x: 870, y: 504, w: 325, h: 112, d: 22, s: 4 },
    label: { x: 918, y: 520, w: 274, h: 94, r: -2.5 },
  },
  {
    key: "education", number: "04", title: "Education", description: "Academic background", href: "#education",
    stand: { x: 1216, y: 488, w: 404, h: 138, d: 24, s: -14 },
    label: { x: 1296, y: 512, w: 322, h: 110, r: -2.5 },
  },
  {
    key: "about", number: "05", title: "About", description: "My approach and interests", href: "#about",
    stand: { x: 935, y: 760, w: 386, h: 146, d: 32, s: -6 },
    label: { x: 1020, y: 790, w: 300, h: 114, r: -3 },
  },
  {
    key: "contact", number: "06", title: "Contact", description: "Let’s connect", href: "#contact",
    stand: { x: 1390, y: 748, w: 246, h: 118, d: 26, s: -18 },
    label: { x: 1455, y: 768, w: 178, h: 96, r: -4 },
  },
]

const SCENE_W = 1672
const u = (px: number) => `calc(${px} * var(--ch-unit))`

/** Bounding box and face polygons (in % of the box) for one acrylic stand. */
function standGeometry({ x, y, w, h, d, s }: Stand) {
  const left = x + Math.min(0, s)
  const top = y - d
  const bw = w + Math.abs(s)
  const bh = h + d
  const fx = Math.max(0, -s) // front face left edge inside the box
  const P = (px: number, py: number) => `${((px / bw) * 100).toFixed(3)}% ${((py / bh) * 100).toFixed(3)}%`
  const front = [P(fx, d), P(fx + w, d), P(fx + w, bh), P(fx, bh)]
  const topFace = [P(fx, d), P(fx + w, d), P(fx + w + s, 0), P(fx + s, 0)]
  const side =
    s >= 0
      ? [P(fx + w, d), P(fx + w + s, 0), P(fx + w + s, h), P(fx + w, bh)]
      : [P(fx, d), P(fx + s, 0), P(fx + s, h), P(fx, bh)]
  const edges = [
    // outline of the visible block, drawn as an SVG overlay in box pixels
    [fx, d, fx + w, d], [fx + w, d, fx + w, bh], [fx, bh, fx + w, bh], [fx, d, fx, bh],
    [fx, d, fx + s, 0], [fx + w, d, fx + w + s, 0], [fx + s, 0, fx + w + s, 0],
    s >= 0 ? [fx + w + s, 0, fx + w + s, h] : [fx + s, 0, fx + s, h],
  ]
  return { left, top, bw, bh, front, topFace, side, edges, sideRight: s >= 0 }
}

function AcrylicStand({ stand }: { stand: Stand }) {
  const g = standGeometry(stand)
  const poly = (pts: string[]) => ({ clipPath: `polygon(${pts.join(", ")})` })
  return (
    <span
      className="ch-stand"
      style={{ left: u(g.left), top: u(g.top), width: u(g.bw), height: u(g.bh) }}
      aria-hidden="true"
    >
      <span className="ch-stand__caustic" />
      <span className="ch-stand__shadow" />
      <span className="ch-stand__face ch-stand__face--top" style={poly(g.topFace)} />
      <span className="ch-stand__face ch-stand__face--front" style={poly(g.front)} />
      <span
        className={`ch-stand__face ch-stand__face--side ${g.sideRight ? "is-right" : "is-left"}`}
        style={poly(g.side)}
      />
      <svg className="ch-stand__edges" viewBox={`0 0 ${g.bw} ${g.bh}`} preserveAspectRatio="none">
        {g.edges.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </svg>
    </span>
  )
}

function CuriosityHomepage() {
  return (
    <main id="home" className="ch-home">
      <div className="ch-scene" style={{ ["--ch-scene-w" as string]: SCENE_W }}>
        <img className="ch-bg" src="/home-background.jpg" alt="" draggable={false} />

        <nav className="ch-nav" aria-label="Primary navigation">
          <a className="ch-nav__brand" href="#home">Sabrina Bedjera</a>
          <div className="ch-nav__links">
            {homeNavigation.map(([label, target], index) => (
              <a className={index === 0 ? "is-current" : ""} href={`#${target}`} key={target}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        <section className="ch-copy" aria-labelledby="home-title">
          <p className="ch-eyebrow">Science <span>×</span> Technology <span>×</span> Strategy</p>
          <h1 id="home-title">Making complex<br />ideas move forward.</h1>
          <p className="ch-lede">
            Engineering, energy, investment and creative technology for a more sustainable and
            connected world.
          </p>
        </section>

        <div className="ch-exhibits" aria-label="Explore portfolio sections">
          {exhibits.map((ex) => {
            const g = standGeometry(ex.stand)
            return (
              <a
                key={ex.key}
                className={`ch-exhibit ch-exhibit--${ex.key}`}
                href={ex.href}
                aria-label={`${ex.title}: ${ex.description}`}
              >
                <AcrylicStand stand={ex.stand} />
                {/* Phase 2: the photorealistic object for this exhibit goes here. */}
                <span
                  className="ch-object"
                  data-object={ex.key}
                  style={{ left: u(g.left), top: u(g.top), width: u(g.bw), height: u(g.bh) }}
                  aria-hidden="true"
                />
                <span
                  className="ch-label"
                  style={{
                    left: u(ex.label.x), top: u(ex.label.y), width: u(ex.label.w), height: u(ex.label.h),
                    transform: `rotate(${ex.label.r}deg)`,
                  }}
                  aria-hidden="true"
                >
                  <span className="ch-label__number">{ex.number}</span>
                  <span className="ch-label__title">{ex.title}</span>
                  <span className="ch-label__description">{ex.description}</span>
                  <span className="ch-label__arrow">→</span>
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </main>
  )
}

/** Temporary destinations for the homepage objects that have no section yet. */
const placeholderSections = [
  ["lab", "02", "Lab", "Technical and creative projects"],
  ["experience", "03", "Experience", "Professional background"],
  ["education", "04", "Education", "Academic background"],
  ["about", "05", "About", "My approach and interests"],
  ["contact", "06", "Contact", "Let’s connect"],
]

function PlaceholderSections() {
  return (
    <div className="ch-placeholders">
      {placeholderSections.map(([id, number, title, description]) => (
        <section id={id} className="ch-placeholder" key={id} aria-labelledby={`${id}-title`}>
          <p>{number} · Placeholder section</p>
          <h2 id={`${id}-title`}>{title}</h2>
          <span>{description} — content to be added.</span>
        </section>
      ))}
    </div>
  )
}

function MagazineExperiment({
  onExplore,
}: {
  onExplore: (project: Project) => void
}) {
  const [activeCover, setActiveCover] = useState(0)
  const [openingCover, setOpeningCover] = useState<number | null>(null)
  const openingTimer = useRef<number | null>(null)
  const rotationTimer = useRef<number | null>(null)
  const rotationLocked = useRef(false)
  const navigationStarted = useRef(false)

  useEffect(() => {
    return () => {
      if (openingTimer.current !== null) {
        window.clearTimeout(openingTimer.current)
      }
      if (rotationTimer.current !== null) {
        window.clearTimeout(rotationTimer.current)
      }
    }
  }, [])

  const selectCover = (index: number) => {
    if (
      openingCover !== null ||
      rotationLocked.current ||
      index === activeCover
    ) {
      return
    }

    rotationLocked.current = true
    setActiveCover(index)
    rotationTimer.current = window.setTimeout(() => {
      rotationLocked.current = false
      rotationTimer.current = null
    }, 780)
  }

  const rotate = (direction: number) => {
    const nextIndex =
      (activeCover + direction + projects.length) % projects.length
    selectCover(nextIndex)
  }

  const finishOpening = (project: Project) => {
    if (navigationStarted.current) return
    navigationStarted.current = true
    if (openingTimer.current !== null) {
      window.clearTimeout(openingTimer.current)
      openingTimer.current = null
    }
    onExplore(project)
  }

  const handleCoverClick = (
    project: Project,
    index: number,
    position: string,
  ) => {
    if (openingCover !== null || rotationLocked.current) return

    if (position !== "active") {
      selectCover(index)
      return
    }

    navigationStarted.current = false
    setOpeningCover(index)
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    openingTimer.current = window.setTimeout(
      () => finishOpening(project),
      reduceMotion ? 20 : 580,
    )
  }

  const getPosition = (index: number) => {
    if (index === activeCover) return "active"
    if ((index - activeCover + projects.length) % projects.length === 1)
      return "next"
    return "previous"
  }

  return (
    <section
      id="selected-work"
      className="magazine-experiment"
      aria-labelledby="covers-title"
      onKeyDown={(event) => {
        if (openingCover !== null) return
        if (event.key === "ArrowLeft") rotate(-1)
        if (event.key === "ArrowRight") rotate(1)
      }}
    >
      <div className="magazine-experiment__heading">
        <div>
          <p>Professional portfolio · 01—03</p>
          <h2 id="covers-title">
            Selected <em>Work</em>
          </h2>
        </div>
        <p>
          Please explore my experience across critical minerals, Pacific energy
          systems, and clean technology.
        </p>
      </div>

      <div className="cover-browser">
        <div className="cover-browser__stage" aria-live="polite">
          {projects.map((project, index) => {
            const position = getPosition(index)
            const title =
              project.tone === "mineral"
                ? ["Critical", "Minerals"]
                : project.tone === "data"
                  ? ["Pacific", "Energy"]
                  : ["Clean", "Energy"]
            const subtitle =
              project.tone === "mineral"
                ? "Investment & Commercialization"
                : project.tone === "data"
                  ? "Data Visualization"
                  : "Technology, Innovation & Decarbonization"

            return (
              <article
                className={`magazine-cover magazine-cover--${project.tone} magazine-cover--${position} ${
                  openingCover === index ? "magazine-cover--opening" : ""
                }`}
                key={project.title}
                aria-current={position === "active" ? "true" : undefined}
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    handleCoverClick(project, index, position)
                  }
                }}
              >
                <button
                  className="magazine-cover__open"
                  onClick={() => handleCoverClick(project, index, position)}
                  disabled={openingCover !== null}
                  aria-label={
                    position === "active"
                      ? `Open case study: ${project.title}`
                      : `Move ${project.title} magazine to the centre`
                  }
                >
                  <span className="magazine-cover__inside" aria-hidden="true">
                    <img src={project.featureImage} alt="" />
                  </span>
                  <span
                    className="magazine-cover__paper"
                    onAnimationEnd={() => {
                      if (openingCover === index) finishOpening(project)
                    }}
                  >
                    <span className="magazine-cover__masthead">
                      <span>Selected Work</span>
                      <span>Issue 1</span>
                    </span>
                    <span className="magazine-cover__copy">
                      <span className="magazine-cover__title">
                        <span>{title[0]}</span>
                        <span>{title[1]}</span>
                      </span>
                      <span className="magazine-cover__subtitle">
                        {subtitle}
                      </span>
                    </span>

                    <span className="magazine-cover__image">
                      <img
                        className="magazine-cover__photo"
                        src={project.featureImage}
                        alt={project.featureImageAlt}
                      />
                    </span>
                  </span>
                </button>
              </article>
            )
          })}
        </div>

        <div
          className="cover-browser__navigation"
          aria-label="Carousel controls"
        >
          <button
            onClick={() => rotate(-1)}
            disabled={openingCover !== null}
            aria-label="Show previous magazine"
          >
            <span aria-hidden="true">←</span>
            <span>Previous</span>
          </button>
          <div className="cover-browser__index">
            {projects.map((project, index) => (
              <button
                className={index === activeCover ? "is-active" : ""}
                key={project.slug}
                onClick={() => selectCover(index)}
                disabled={openingCover !== null}
                aria-label={`Feature ${project.title}`}
                aria-pressed={index === activeCover}
              >
                <span>0{index + 1}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => rotate(1)}
            disabled={openingCover !== null}
            aria-label="Show next magazine"
          >
            <span>Next</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

function MagazineCaseStudy({
  project,
  onBack,
}: {
  project: Project
  onBack: () => void
}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [project])

  useEffect(() => {
    if (project.tone !== "data") return
    if (document.getElementById("flourish-embed-script")) return

    const script = document.createElement("script")
    script.id = "flourish-embed-script"
    script.src = "https://public.flourish.studio/resources/embed.js"
    script.async = true
    document.body.appendChild(script)
  }, [project.tone])

  return (
    <main className={`case-study case-study--${project.tone}`}>
      <nav className="case-study__nav" aria-label="Case study navigation">
        <button onClick={onBack}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M19 12H5M10 7l-5 5 5 5" />
          </svg>
          <span>Back to Selected Work</span>
        </button>
        <span>Case Study / {project.number}</span>
      </nav>

      <header className="article-hero">
        <div className="article-hero__copy">
          <p>{project.eyebrow}</p>
          <h1>{project.caseHeadline}</h1>
          <p className="article-hero__intro">{project.caseIntroduction}</p>
        </div>
        <div className="article-hero__visual" aria-label="Project visual">
          <img src={project.featureImage} alt={project.featureImageAlt} />
          <span>Selected Work / {project.number}</span>
        </div>
      </header>

      <section
        className="article-contributions article-contributions--editorial"
        aria-labelledby="contributions-title"
      >
        <header>
          <p>Selected contributions</p>
          <h2 id="contributions-title">Four areas of contribution</h2>
        </header>
        <div className="article-contributions__list">
          {project.contributions.map((contribution) => (
            <article key={contribution.number}>
              <span>{contribution.number}</span>
              <h3>{contribution.title}</h3>
              <div className="article-contributions__copy">
                {contribution.highlight && (
                  <strong>{contribution.highlight}</strong>
                )}
                <p>{contribution.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {project.tone === "mineral" && (
        <section
          className="article-reading article-reading--minerals"
          aria-labelledby="critical-reading-title"
        >
          <header>
            <p>Further reading</p>
            <h2 id="critical-reading-title">Independent coverage and context</h2>
          </header>
          <div className="article-reading__links">
            <a
              className="article-reading__featured"
              href="https://www.reuters.com/business/canada-accelerate-critical-mineral-projects-worth-46-billion-energy-minister-2025-10-31/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Featured article · In the News</span>
              <small>Reuters | October 31, 2025</small>
              <strong>
                Canada to accelerate critical mineral projects worth $4.6
                billion
              </strong>
              <p>
                Reuters coverage of Canada’s Critical Minerals Production
                Alliance, including the Rio Tinto and Nouveau Monde Graphite
                offtake agreements.
              </p>
              <em>Subscription may be required.</em>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              className="article-reading__secondary"
              href="https://www.canada.ca/en/campaign/critical-minerals-in-canada/canadian-critical-minerals-strategy.html"
              target="_blank"
              rel="noreferrer"
            >
              <span>Secondary resource · Policy Context</span>
              <strong>The Canadian Critical Minerals Strategy</strong>
              <p>
                Canada’s national strategy for developing critical minerals
                value chains and supporting investment in domestic production
                and processing.
              </p>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>
      )}

      {project.tone === "data" && (
        <>
          <section className="article-data" aria-labelledby="visuals-title">
            <header>
              <p>Published visual investigation</p>
              <h2 id="visuals-title">Explore the Data</h2>
            </header>
            <div className="article-data__visuals">
              <article className="flourish-visual">
                <header>
                  <div>
                    <span>01 · Packed bubble chart</span>
                    <h3>
                      Pacific Energy Systems Are Transitioning to Renewables
                    </h3>
                  </div>
                  <a
                    href="https://public.flourish.studio/visualisation/30103551/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Flourish <span aria-hidden="true">↗</span>
                  </a>
                </header>
                <iframe
                  title="Pacific Energy Systems Are Transitioning to Renewables"
                  src="https://flo.uri.sh/visualisation/30103551/embed"
                  loading="lazy"
                  allowFullScreen
                >
                  <a href="https://public.flourish.studio/visualisation/30103551/">
                    <img
                      src="https://public.flourish.studio/visualisation/30103551/thumbnail"
                      alt="Open Pacific Energy Systems Are Transitioning to Renewables in Flourish"
                    />
                  </a>
                </iframe>
              </article>

              <article className="flourish-visual">
                <header>
                  <div>
                    <span>02 · Animated scatterplot</span>
                    <h3>
                      The Pacific’s Power Generation: A Transition Away from Oil
                    </h3>
                  </div>
                  <a
                    href="https://public.flourish.studio/visualisation/30064554/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Flourish <span aria-hidden="true">↗</span>
                  </a>
                </header>
                <iframe
                  title="The Pacific’s Power Generation: A Transition Away from Oil"
                  src="https://flo.uri.sh/visualisation/30064554/embed"
                  loading="lazy"
                  allowFullScreen
                >
                  <a href="https://public.flourish.studio/visualisation/30064554/">
                    <img
                      src="https://public.flourish.studio/visualisation/30064554/thumbnail"
                      alt="Open The Pacific’s Power Generation: A Transition Away from Oil in Flourish"
                    />
                  </a>
                </iframe>
              </article>

              <article className="flourish-visual">
                <header>
                  <div>
                    <span>03 · Interactive radial chart</span>
                    <h3>
                      Pacific Renewable Electricity in 2025: On-Grid or
                      Off-Grid?
                    </h3>
                  </div>
                  <a
                    href="https://public.flourish.studio/visualisation/30103365/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Flourish <span aria-hidden="true">↗</span>
                  </a>
                </header>
                <iframe
                  title="Pacific Renewable Electricity in 2025: On-Grid or Off-Grid?"
                  src="https://flo.uri.sh/visualisation/30103365/embed"
                  loading="lazy"
                  allowFullScreen
                >
                  <a href="https://public.flourish.studio/visualisation/30103365/">
                    <img
                      src="https://public.flourish.studio/visualisation/30103365/thumbnail"
                      alt="Open Pacific Renewable Electricity in 2025: On-Grid or Off-Grid? in Flourish"
                    />
                  </a>
                </iframe>
              </article>
            </div>
          </section>
          <section className="article-links" aria-labelledby="links-title">
            <p>View the project</p>
            <h2 id="links-title">Pacific Energy Data Visualization</h2>
            <a
              href="https://sites.google.com/view/sabrinabedjerapacificdataviz/pacific-data-visualization"
              target="_blank"
              rel="noreferrer"
            >
              Visit published project <span aria-hidden="true">↗</span>
            </a>
          </section>
        </>
      )}

      {project.tone === "energy" && (
        <section
          className="article-reading"
          aria-labelledby="further-reading-title"
        >
          <header>
            <p>Further reading</p>
            <h2 id="further-reading-title">Public context for the work</h2>
          </header>
          <div className="article-reading__links">
            <a
              href="https://natural-resources.canada.ca/energy-sources/carbon-management/canada-carbon-management-strategy"
              target="_blank"
              rel="noreferrer"
            >
              <span>Government of Canada</span>
              <strong>Canada’s Carbon Management Strategy</strong>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              href="https://www.iea.org/reports/legal-and-regulatory-frameworks-for-ccus"
              target="_blank"
              rel="noreferrer"
            >
              <span>International Energy Agency</span>
              <strong>Legal and Regulatory Frameworks for CCUS</strong>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>
      )}

      <footer className="case-study__footer">
        <p>End of case study / {project.number}</p>
        <button onClick={onBack}>
          <span>Back to Selected Work</span>
          <Arrow />
        </button>
      </footer>
    </main>
  )
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  return (
    <div
      className="detail"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
    >
      <div className="detail__bar">
        <span>Selected Work / {project.number}</span>
        <button ref={closeRef} className="close-button" onClick={onClose}>
          <span>Close</span>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>

      <div className={`detail__hero detail__hero--${project.tone}`}>
        {project.tone === "data" ? (
          <EnergyGraphic large />
        ) : (
          <img src={project.image} alt={project.imageAlt} />
        )}
        <span className="placeholder-tag">Placeholder visual</span>
      </div>

      <main className="detail__content">
        <div className="detail__intro">
          <p className="eyebrow">{project.eyebrow}</p>
          <h2 id="detail-title">{project.title}</h2>
        </div>
        <div className="detail__copy">
          <p className="detail__lede">{project.description}</p>
          <div className="detail__facts">
            <div>
              <span>Role</span>
              <p>To be added</p>
            </div>
            <div>
              <span>Contributions</span>
              <p>To be added</p>
            </div>
            <div>
              <span>Links</span>
              <p>Coming with full case study</p>
            </div>
          </div>
          <div className="detail__placeholder">
            <span>Case study content</span>
            <p>
              This space is reserved for the project narrative, process,
              supporting visuals and outcomes.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(
    () => {
      const slug = window.location.hash.replace("#case-study/", "")
      return projects.find((project) => project.slug === slug) ?? null
    },
  )

  useEffect(() => {
    const handleHashChange = () => {
      const slug = window.location.hash.replace("#case-study/", "")
      setCaseStudyProject(
        projects.find((project) => project.slug === slug) ?? null,
      )
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const openCaseStudy = (project: Project) => {
    window.location.hash = `case-study/${project.slug}`
    setCaseStudyProject(project)
  }

  const closeCaseStudy = () => {
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}${window.location.search}#selected-work`,
    )
    setCaseStudyProject(null)
    requestAnimationFrame(() =>
      document.getElementById("selected-work")?.scrollIntoView(),
    )
  }

  if (caseStudyProject) {
    return (
      <MagazineCaseStudy project={caseStudyProject} onBack={closeCaseStudy} />
    )
  }

  return (
    <>
      <CuriosityHomepage />
      <MagazineExperiment onExplore={openCaseStudy} />
      <PlaceholderSections />
      <PaletteStudy />
      <main className="portfolio">
        <header className="intro">
          <div className="intro__marker">
            <span>Selected work</span>
            <span>01—03</span>
          </div>
          <h1>
            Selected <em>Work</em>
          </h1>
          <p>
            A selection of work across critical minerals, energy systems and
            technology—where complex questions become clear decisions.
          </p>
          <div className="scroll-note" aria-hidden="true">
            <span>Scroll to explore</span>
            <i />
          </div>
        </header>

        <section className="projects" aria-label="Selected projects">
          <article className="project project--mineral">
            <button
              className="project__link"
              onClick={() => setActiveProject(projects[0])}
              aria-label={`View project: ${projects[0].title}`}
            >
              <div className="project__image-wrap">
                <img
                  className="project__image"
                  src={projects[0].image}
                  alt={projects[0].imageAlt}
                />
                <span className="image-credit">
                  Placeholder image · Unsplash
                </span>
                <span className="explore-pill">
                  Explore <Arrow diagonal />
                </span>
              </div>
              <div className="project__caption">
                <span className="project__number">{projects[0].number}</span>
                <div>
                  <p className="eyebrow">{projects[0].eyebrow}</p>
                  <h2>{projects[0].title}</h2>
                  <p className="summary">{projects[0].summary}</p>
                </div>
                <Arrow />
              </div>
            </button>
          </article>

          <article className="project project--data">
            <button
              className="project__link"
              onClick={() => setActiveProject(projects[1])}
              aria-label={`View project: ${projects[1].title}`}
            >
              <div className="project__caption">
                <span className="project__number">{projects[1].number}</span>
                <div>
                  <p className="eyebrow">{projects[1].eyebrow}</p>
                  <h2>{projects[1].title}</h2>
                  <p className="summary">{projects[1].summary}</p>
                </div>
                <Arrow />
              </div>
              <div className="data-stage">
                <div className="data-stage__label">
                  <span>Pacific energy transition</span>
                  <span>Prototype view</span>
                </div>
                <EnergyGraphic />
                <div className="data-stage__index">PNG / TON</div>
              </div>
            </button>
          </article>

          <article className="project project--energy">
            <button
              className="project__link"
              onClick={() => setActiveProject(projects[2])}
              aria-label={`View project: ${projects[2].title}`}
            >
              <div className="project__image-wrap">
                <img
                  className="project__image"
                  src={projects[2].image}
                  alt={projects[2].imageAlt}
                />
                <span className="image-credit">
                  Placeholder image · Unsplash
                </span>
                <span className="explore-pill">
                  Explore <Arrow diagonal />
                </span>
              </div>
              <div className="project__caption">
                <span className="project__number">{projects[2].number}</span>
                <div>
                  <p className="eyebrow">{projects[2].eyebrow}</p>
                  <h2>{projects[2].title}</h2>
                  <p className="summary">{projects[2].summary}</p>
                </div>
                <Arrow />
              </div>
            </button>
          </article>
        </section>

        <footer>
          <span>Selected Work</span>
          <span>Scroll onward</span>
        </footer>
      </main>

      {activeProject && (
        <ProjectDetail
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  )
}
