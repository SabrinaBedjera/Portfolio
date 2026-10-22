import { useEffect, useRef, useState, type CSSProperties } from "react"
import "./curiosity-home.css"
import "./selected-work.css"
import PortfolioSections from "./PortfolioSections"

type Project = {
  slug: string
  number: string
  title: string
  eyebrow: string
  summary: string
  description: string
  caseHeadline: string
  caseIntroduction: string
  /** Two-word magazine cover title and the small subtitle under it. */
  coverTitle: [string, string]
  coverSubtitle: string
  /** Case-study section heading; defaults to "Selected contributions / Four areas of contribution". */
  contributionsLabel?: string
  contributionsHeading?: string
  contributions: Array<{
    number: string
    title: string
    body: string
    highlight?: string
    points?: string[]
  }>
  /** Research details shown after the contributions (thesis case study). */
  research?: {
    details: Array<[string, string]>
    skills: string[]
  }
  image?: string
  imageAlt?: string
  featureImage: string
  featureImageAlt: string
  tone: "mineral" | "data" | "energy" | "water"
}

/* The water case study reuses the Clean Energy cover and article layout;
   its own colours are set in selected-work.css. */
const layoutTone = (tone: Project["tone"]) =>
  tone === "water" ? "energy water" : tone


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
    coverTitle: ["Critical", "Minerals"],
    coverSubtitle: "Investment & Commercialization",
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
    coverTitle: ["Pacific", "Energy"],
    coverSubtitle: "Data Visualization",
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
    coverTitle: ["Clean", "Energy"],
    coverSubtitle: "Technology, Innovation & Decarbonization",
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
  {
    slug: "drinking-water-micropollutants",
    number: "04",
    title: "Predicting Micropollutant Removal in Drinking Water",
    eyebrow: "Environmental Engineering · Water Treatment · Scientific Modelling",
    summary:
      "Modelling how ozonation removes micropollutants at three Ontario drinking water treatment plants.",
    description:
      "Master’s research on predicting the removal of micropollutants by ozonation in water drawn from Lake Ontario and the Grand River.",
    coverTitle: ["Drinking", "Water"],
    coverSubtitle: "Micropollutant Removal & Ozonation Modelling",
    caseHeadline: "Predicting Micropollutant Removal in Drinking Water",
    caseIntroduction:
      "Master of Applied Science research at the University of Waterloo (2019) on predicting the removal of micropollutants by ozonation at three Ontario drinking water treatment plants.",
    contributionsLabel: "Master’s research",
    contributionsHeading: "The research",
    contributions: [
      {
        number: "01",
        title: "The Challenge",
        body: "Drinking water utilities must effectively remove micropollutants, including pesticides and other emerging contaminants. Treatment performance can vary depending on water chemistry, seasonal conditions, and ozone dose.",
      },
      {
        number: "02",
        title: "My Approach",
        highlight: "Three Ontario treatment plants · Lake Ontario & Grand River",
        body: "Conducted experimental and quantitative research involving three Ontario drinking water treatment plants drawing water from Lake Ontario and the Grand River.",
        points: [
          "Characterized ozone and hydroxyl radical exposure and investigated seasonal changes in treatment conditions.",
          "Analyzed water quality characteristics and their relationships with ozonation performance.",
          "Used laboratory analytical techniques, statistical analysis, and regression modelling.",
          "Validated a micropollutant degradation model using experimental atrazine results.",
          "Simulated the degradation of selected micropollutants under varying water quality and seasonal conditions.",
        ],
      },
      {
        number: "03",
        title: "Results & Impact",
        body: "Developed and validated modelling approaches to assess the effectiveness of ozonation for micropollutant removal across three drinking water treatment plants, providing information to help utilities evaluate treatment performance and plan proactively.",
      },
      {
        number: "04",
        title: "Recognition",
        highlight: "First Place — AWWA Master’s Academic Achievement Award",
        body: "Awarded first place in the American Water Works Association Master’s Academic Achievement Award.",
      },
    ],
    // Thesis figures and further technical detail can be added here later.
    research: {
      details: [
        ["Thesis", "Predicting the Removal of Micropollutants in Lake Ontario and Grand River using Ozonation (2019)"],
        ["Institution", "University of Waterloo"],
        ["Degree", "Master of Applied Science, Civil Engineering"],
        ["Recognition", "First Place — American Water Works Association (AWWA) Master’s Academic Achievement Award"],
      ],
      skills: [
        "Environmental Engineering",
        "Water Treatment",
        "Laboratory Research",
        "Quantitative Analysis",
        "Statistical Modelling",
        "Model Validation",
        "Water Quality Analysis",
      ],
    },
    featureImage: "/drinking-water.svg",
    featureImageAlt:
      "Illustration of bubbles rising through clear water beneath a rippled surface",
    tone: "water",
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
   Cabinet-of-curiosities homepage (desktop)
   The approved composition is a single photograph, public/home-hero.jpg
   (1672 × 941), which already contains the navigation, headline, six
   exhibits and their labels. Transparent links sit over the photographed
   navigation and exhibits. Regions are in pixels of that image and placed
   as percentages, so they stay aligned as the window is resized.
------------------------------------------------------------------- */

type Rect = { x: number; y: number; w: number; h: number }

const HERO_W = 1672
const HERO_H = 941

/** Position a rect given in hero-image pixels, relative to the hero. */
const at = (r: Rect): CSSProperties => ({
  left: `${(r.x / HERO_W) * 100}%`,
  top: `${(r.y / HERO_H) * 100}%`,
  width: `${(r.w / HERO_W) * 100}%`,
  height: `${(r.h / HERO_H) * 100}%`,
})

/* Photographed navigation words (Education is not in the photograph). */
const heroNavigation: { label: string; href: string; area: Rect }[] = [
  { label: "Home", href: "#home", area: { x: 852, y: 20, w: 68, h: 34 } },
  { label: "Selected Work", href: "#selected-work", area: { x: 950, y: 20, w: 150, h: 34 } },
  { label: "Lab", href: "#lab", area: { x: 1129, y: 20, w: 52, h: 34 } },
  { label: "Experience", href: "#experience", area: { x: 1214, y: 20, w: 121, h: 34 } },
  { label: "About", href: "#about", area: { x: 1368, y: 20, w: 76, h: 34 } },
  { label: "Contact", href: "#contact", area: { x: 1475, y: 20, w: 97, h: 34 } },
]

/* Each exhibit: its photographed label first (it carries the focus ring), then the object. */
const heroExhibits: { label: string; href: string; areas: Rect[] }[] = [
  {
    label: "01 Selected Work: Case studies and featured projects", href: "#selected-work",
    areas: [
      { x: 372, y: 785, w: 400, h: 122 },
      { x: 225, y: 500, w: 390, h: 285 },
      { x: 65, y: 560, w: 160, h: 225 },
      { x: 615, y: 612, w: 180, h: 173 },
      { x: 65, y: 785, w: 307, h: 95 },
    ],
  },
  {
    label: "02 Lab: Technical and creative projects", href: "#lab",
    areas: [{ x: 615, y: 505, w: 262, h: 105 }, { x: 590, y: 185, w: 262, h: 320 }],
  },
  {
    label: "03 Experience: Professional background", href: "#experience",
    areas: [{ x: 877, y: 505, w: 318, h: 95 }, { x: 900, y: 315, w: 252, h: 190 }],
  },
  {
    label: "04 Education: Academic background", href: "#education",
    areas: [{ x: 1295, y: 523, w: 325, h: 105 }, { x: 1243, y: 318, w: 357, h: 205 }],
  },
  {
    label: "05 About: My approach and interests", href: "#about",
    areas: [{ x: 1018, y: 790, w: 302, h: 118 }, { x: 988, y: 600, w: 285, h: 190 }, { x: 935, y: 745, w: 83, h: 155 }],
  },
  {
    label: "06 Contact: Let’s connect", href: "#contact",
    areas: [{ x: 1455, y: 765, w: 182, h: 100 }, { x: 1448, y: 628, w: 165, h: 137 }],
  },
]

function CuriosityHomepage() {
  return (
    <main id="home" className="ch-home">
      <div className="ch-hero">
        <img className="ch-hero__image" src="/home-hero.jpg" alt="" draggable={false} />

        {/* The headline is part of the photograph; this copy is for assistive technology. */}
        <div className="ch-sr-only">
          <p>Science × Technology × Strategy</p>
          <h1>Making complex ideas move forward.</h1>
          <p>Engineering, energy, investment and creative technology for a more sustainable and connected world.</p>
        </div>

        <nav className="ch-hero__nav" aria-label="Primary navigation">
          <a className="ch-hit" href="#home" style={at({ x: 58, y: 20, w: 222, h: 34 })}>
            <span className="ch-sr-only">Sabrina Bedjera, home</span>
          </a>
          {heroNavigation.map((item) => (
            <a className="ch-hit" href={item.href} style={at(item.area)} key={item.label}>
              <span className="ch-sr-only">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="ch-hero__exhibits" role="list" aria-label="Explore portfolio sections">
          {heroExhibits.map((ex) => (
            <a className="ch-exhibit" href={ex.href} role="listitem" key={ex.href}>
              <span className="ch-sr-only">{ex.label}</span>
              {ex.areas.map((area, i) => (
                <span className={`ch-hit${i === 0 ? " ch-hit--label" : ""}`} style={at(area)} key={i} aria-hidden="true" />
              ))}
            </a>
          ))}
        </div>
      </div>
    </main>
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
    const offset = (index - activeCover + projects.length) % projects.length
    if (offset === 1) return "next"
    if (offset === projects.length - 1) return "previous"
    return "back"
  }

  return (
    <section
      id="selected-work"
      className="magazine-experiment ps-section ps-section--tint"
      aria-labelledby="covers-title"
      onKeyDown={(event) => {
        if (openingCover !== null) return
        if (event.key === "ArrowLeft") rotate(-1)
        if (event.key === "ArrowRight") rotate(1)
      }}
    >
      {/* Heading styled like the sections that follow (portfolio-sections.css). */}
      <header className="ps-head selected-work__head">
        <p className="ps-number">01</p>
        <h2 id="covers-title">
          Selected <em>Work</em>
        </h2>
        <p className="ps-lede">
          Please explore my experience across critical minerals, Pacific energy
          systems, clean technology, and drinking water research.
        </p>
      </header>

      <div className="cover-browser">
        <div className="cover-browser__stage" aria-live="polite">
          {projects.map((project, index) => {
            const position = getPosition(index)
            const title = project.coverTitle
            const subtitle = project.coverSubtitle

            return (
              <article
                className={`magazine-cover ${layoutTone(project.tone)
                  .split(" ")
                  .map((tone) => `magazine-cover--${tone}`)
                  .join(" ")} magazine-cover--${position} ${
                  openingCover === index ? "magazine-cover--opening" : ""
                }`}
                key={project.title}
                aria-current={position === "active" ? "true" : undefined}
                aria-hidden={position === "back" ? true : undefined}
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
                  tabIndex={position === "back" ? -1 : undefined}
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
    <main
      className={`case-study ${layoutTone(project.tone)
        .split(" ")
        .map((tone) => `case-study--${tone}`)
        .join(" ")}`}
    >
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
          <p>{project.contributionsLabel ?? "Selected contributions"}</p>
          <h2 id="contributions-title">
            {project.contributionsHeading ?? "Four areas of contribution"}
          </h2>
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
                {contribution.points && (
                  <ul>
                    {contribution.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {project.research && (
        <section className="article-reading article-research" aria-labelledby="research-title">
          <header>
            <p>Research details</p>
            <h2 id="research-title">Thesis and technical skills</h2>
          </header>
          <dl>
            {project.research.details.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <ul aria-label="Technical skills">
            {project.research.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

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

export default function App() {
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
      <PortfolioSections />
    </>
  )
}
