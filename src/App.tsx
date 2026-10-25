import { useEffect, useRef, useState, type CSSProperties } from "react"
import "./curiosity-home.css"
import "./selected-work.css"
import "./case-study.css"
import PortfolioSections from "./PortfolioSections"
import { section, sections, type SectionId } from "./sections"
import { objectHulls } from "./objectHulls"
import LabArticle from "./LabArticle"
import { labPosts, type LabPost } from "./lab"

type Project = {
  slug: string
  number: string
  title: string
  eyebrow: string
  summary: string
  description: string
  caseHeadline: string
  caseIntroduction: string
  /** Secondary line beneath the introduction (e.g. a degree). */
  credential?: string
  /** Magazine cover: an oversized title over one central visual (public/covers/). */
  cover: { title: string; image: string; alt: string; color: string }
  /** Case-study section heading; defaults to "Selected Contributions" with no label. */
  contributionsLabel?: string
  contributionsHeading?: string
  /** "chapters" stacks the contributions in one column, with room for figures. */
  contributionsLayout?: "chapters"
  contributions: Array<{
    number: string
    title: string
    /** One paragraph, or several. */
    body: string | string[]
    highlight?: string
    pointsLead?: string
    points?: Array<string | { label: string; text: string }>
    figure?: CaseFigure
    video?: CaseVideo
    link?: { href: string; label: string }
    /** A short passage in the author's own words. */
    quote?: { text: string; source: string }
  }>
  /** Case-study hero, when it differs from the cover visual. */
  heroImage?: { src: string; alt: string }
  /** Where this work appears on the main page (e.g. its role in Professional Experience). */
  related?: { href: string; label: string }
  /** Selects the project-specific sections (reading list, data embeds). */
  tone: "mineral" | "data" | "energy" | "water"
}

type CaseVideo = {
  /** YouTube video id */
  id: string
  title: string
  description: string
}

type CaseFigure = {
  src: string
  alt: string
  caption: string
  /** Short name for the enlarge button and dialog, e.g. "ozonation setup photo". */
  label: string
  /** Opens full size in a dialog when clicked. */
  enlarge?: boolean
}

const projects: Project[] = [
  {
    slug: "critical-minerals",
    number: "01",
    title: "Critical Minerals Investment & Commercialization",
    eyebrow: "Critical Minerals · Investment Strategy",
    summary:
      "Evaluating strategic mineral opportunities from technical promise to commercial reality.",
    description:
      "A future case study exploring the questions, frameworks and decision-making behind strategic critical minerals investments.",
    cover: {
      title: "Critical Minerals",
      image: "/covers/cover-critical-minerals.webp",
      alt: "A metallic mineral specimen with golden cubic crystals",
      color: "#7b1e2e",
    },
    caseHeadline: "Building the Future of Critical Minerals Supply Chains",
    caseIntroduction:
      "Combining technical project assessment, investment strategy, commercial negotiations and data analytics to advance critical minerals projects and strengthen strategic supply chains.",
    contributions: [
      {
        number: "01",
        title: "Assessing Projects",
        highlight: "$3.5B combined investment envelope",
        body: "Coordinated multidisciplinary technical, financial and commercial assessments of critical minerals projects supporting clean energy and advanced technology supply chains, informing investment decisions across federal funding programs with a combined $3.5B investment envelope.",
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
    related: { href: "#role-critical-minerals", label: "See this role in Professional Experience" },
    tone: "mineral",
  },
  {
    slug: "clean-energy-innovation",
    number: "02",
    title: "Clean Energy Technology & Innovation",
    eyebrow: "Clean Energy · Carbon Management",
    summary:
      "Connecting carbon management, emerging technology and international collaboration.",
    description:
      "A future case study bringing together selected work across clean energy technology research, strategy and international collaboration.",
    cover: {
      title: "Energy",
      image: "/covers/cover-clean-energy.webp",
      alt: "An industrial carbon capture installation with banks of large fans and steel pipework",
      color: "#1f4a33",
    },
    caseHeadline: "Advancing Carbon Management and Clean Energy Technologies",
    caseIntroduction:
      "Contributing to Canada’s Carbon Management Strategy, international technical collaboration and research initiatives to support the development and deployment of clean energy technologies.",
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
        highlight: "Carbon Capture, Utilization & Storage",
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
    related: { href: "#role-carbon-capture", label: "See this role in Professional Experience" },
    tone: "energy",
  },
  {
    slug: "pacific-renewable-energy",
    number: "03",
    title: "Pacific Renewable Energy Data Visualization",
    eyebrow: "Energy Transitions · Data Visualization",
    summary:
      "Tracing electricity access and renewable energy transitions across Papua New Guinea and Tonga.",
    description:
      "An interactive visual investigation of energy access and transition pathways. Final charts, methodology and source notes will be added to the complete case study.",
    cover: {
      title: "Pacific",
      image: "/covers/cover-pacific-energy.webp",
      alt: "A white wind turbine against a pale sky",
      color: "#1c3d6e",
    },
    caseHeadline: "Mapping the Pacific Energy Transition",
    caseIntroduction:
      "An independent interactive data visualization exploring electricity access, renewable energy development and energy transitions across Pacific Island countries, with a closer look at Papua New Guinea and Tonga.",
    contributions: [
      {
        number: "01",
        title: "Investigating Pacific Energy Systems",
        highlight: "Energy Research & Analysis",
        body: "Analyzed electricity access, oil dependence and renewable energy development across Pacific Island countries, integrating datasets from Pacific Data Hub, IRENA, the World Bank and Our World in Data to identify regional trends and energy transition challenges.",
      },
      {
        number: "02",
        title: "Building Interactive Visualizations",
        highlight: "Data Visualization",
        body: "Explored and analyzed energy datasets using Excel and Tableau, then developed interactive visualizations in Flourish, including animated scatterplots, packed bubble charts and radial charts to communicate energy trends across Pacific countries.",
      },
      {
        number: "03",
        title: "Identifying Energy Transition Challenges",
        highlight: "Findings & Insights",
        body: "Highlighted contrasting energy transition challenges in Papua New Guinea and Tonga, from expanding electricity access to reducing oil dependence. These differences demonstrate the need for tailored renewable energy pathways, with investment critical to advancing transitions across Pacific Island countries.",
      },
    ],
    tone: "data",
  },
  {
    slug: "drinking-water-micropollutants",
    number: "04",
    title: "Predicting Micropollutant Removal in Drinking Water",
    eyebrow: "Environmental Engineering · Water Treatment",
    summary:
      "Modelling how ozonation removes micropollutants at three Ontario drinking water treatment plants.",
    description:
      "Master’s research on predicting the removal of micropollutants by ozonation in water drawn from Lake Ontario and the Grand River.",
    cover: {
      title: "Drinking Water",
      image: "/covers/cover-drinking-water.webp",
      alt: "A single translucent drop of water with small bubbles inside",
      color: "#0d6870",
    },
    caseHeadline: "Modelling Micropollutant Removal in Drinking Water",
    caseIntroduction:
      "Investigating how ozonation removes trace contaminants from drinking water, combining experimental research and mathematical modelling to better understand and predict treatment performance.",
    credential: "Master of Applied Science · University of Waterloo · 2019",
    contributionsLabel: "Master’s research",
    contributionsHeading: "The research",
    contributionsLayout: "chapters",
    contributions: [
      {
        number: "01",
        title: "The Challenge",
        body: [
          "Trace contaminants from agricultural runoff, wastewater and other sources can enter the rivers and lakes used to produce drinking water.",
          "Ozonation is a treatment process that uses ozone to break down these contaminants. However, its effectiveness depends on factors such as water chemistry, temperature and ozone dose.",
          "My research investigated how drinking water utilities could better predict contaminant removal under changing seasonal and treatment conditions.",
        ],
      },
      {
        number: "02",
        title: "My Approach",
        body: "Working with three Ontario drinking water treatment plants drawing from Lake Ontario and the Grand River, I combined laboratory experiments, water quality analysis and predictive modelling.",
        points: [
          { label: "Experimental research", text: "Measured how ozone and hydroxyl radicals behaved in water samples collected across different seasons." },
          { label: "Data analysis", text: "Used statistical analysis and regression modelling to investigate relationships between water quality, temperature, ozone dose and treatment performance." },
          { label: "Predictive simulations", text: "Modelled the removal of different contaminants under varying seasonal conditions and ozone doses, including estimating reaction rates for compounds with limited published data." },
        ],
        figure: {
          src: "/case-studies/thesis-figure-3-2-ozonation-setup.jpg",
          alt: "Laboratory bench with three tall glass columns connected by clear gas tubing; one column stands in a bucket of ice",
          label: "bench-scale ozonation setup photo",
          caption: "Bench-scale ozonation setup used in drinking water treatment experiments, featuring glass columns connected by ozone gas lines, with one column chilled in an ice bath.",
          enlarge: true,
        },
        video: {
          id: "wCCp21QAsbY",
          title: "Watch My Three Minute Thesis",
          description: "My 2016 Three Minute Thesis presentation, explaining this micropollutant research to a general audience.",
        },
      },
      {
        number: "03",
        title: "Results & Impact",
        body: [
          "The research demonstrated how predictive modelling could help drinking water utilities understand how effectively their treatment processes remove contaminants under different conditions.",
          "In practice, utilities could use this approach to assess seasonal changes in treatment performance, explore different ozone doses, and simulate contamination events, such as chemical spills, to better understand whether existing treatment processes would be effective.",
        ],
        pointsLead: "Key findings included:",
        points: [
          { label: "Water quality matters", text: "Predicted removal of several contaminants was highest in Lake Ontario water, likely due in part to its lower organic carbon content." },
          { label: "Treatment conditions matter", text: "Higher ozone doses generally improved removal of slower-reacting contaminants, including atrazine and BTEX compounds." },
          { label: "Spill scenarios revealed treatment limitations", text: "In a simulated BTEX contamination event, benzene was particularly difficult to remove below Canadian drinking water limits, highlighting the importance of assessing individual contaminants rather than assuming a treatment process will remove them all equally." },
        ],
        figure: {
          src: "/case-studies/btex-simulations.webp",
          alt: "Four line charts of simulated BTEX compound concentrations over 1,500 seconds in Lake Ontario water, at ozone doses of 1 and 4 mg/L and temperatures of 20 °C and 5 °C",
          label: "BTEX simulation charts",
          caption: "Simulated degradation of individual BTEX compounds in Lake Ontario water, comparing applied ozone doses of 1 mg/L and 4 mg/L at 20 °C (September 2016) and 5 °C (December 2016).",
          enlarge: true,
        },
      },
      {
        number: "04",
        title: "Recognition",
        highlight: "First Place — American Water Works Association (AWWA) Master’s Academic Achievement Award",
        body: "Awarded for my master’s research in drinking water treatment.",
        link: {
          href: "https://uwaterloo.ca/nserc-chair-water-treatment/blog/sabrina-bedjera-received-awwa-academic-achievement-award-her",
          label: "View University of Waterloo announcement",
        },
      },
    ],
    // Hero photo: a treatment-plant photograph is planned once its licence is
    // confirmed. Until then the hero uses the cover visual.
    // heroImage: {
    //   src: "/case-studies/thesis-hero-treatment-plant.jpg",
    //   alt: "Water flowing over the weir of a large circular treatment tank, with trees and blue sky behind",
    // },
    related: { href: "#education", label: "See this degree in Education" },
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

/* ------------------------------------------------------------------
   Cabinet-of-curiosities homepage: an interactive still life
   Background: public/home-background.jpg (1672 × 941, empty wall and table;
   the bright window edge at the far right was trimmed and the width restored).
   Objects: cut-out images in public/home-objects/, positioned in pixels of
   the 1672 × 941 photograph and scaled with the scene (curiosity-home.css).
   To swap an object image, replace the file or change its `src` below.
   Text is sized in px so browser zoom enlarges it; the layout adapts.
------------------------------------------------------------------- */

type HomeObject = {
  /** The section this object links to; its number and label come from sections.ts. */
  id: SectionId
  description: string
  /** Left edge and width on the 1672 × 941 stage. */
  x: number
  w: number
  /** Stage y of the table line the object rests on. */
  ground: number
  /** Box height / width, and where the base sits (fraction of box height). */
  aspect: number
  base: number
  /**
   * Caption position: dx from the object's left edge (to the caption's
   * centre when `center` is set); dy from the object's ground line, or, for
   * the front row, on the shared FRONT_LABELS line instead.
   */
  caption: { dx: number; dy?: number; center?: boolean; frontRow?: boolean }
  layers: { src: string; className?: string }[]
  /** Faint animated steam above the object (drawn in SVG, shown on hover). */
  steam?: boolean
  /** The four Selected Work issues as a stack that fans out on hover. */
  magazines?: boolean
}

/* Back row rests on the far part of the table, front row nearer the viewer. */
const BACK = 652
/* The front row's labels (About, Associations, Contact) share one line:
   the stage y their bottoms rest on, just above the bottom of the scene. */
const FRONT_LABELS = 936
const homeObjects: HomeObject[] = [
  {
    id: "selected-work", description: "Case studies and featured projects",
    x: 29, w: 540, ground: 874, aspect: 0.6, base: 0.93, caption: { dx: 330, dy: -40 },
    layers: [],
    magazines: true,
  },
  {
    id: "experience", description: "Professional background",
    // set a little forward of the back row, leaving room for the intro paragraph above
    x: 575, w: 200, ground: BACK, aspect: 478 / 359, base: 0.956, caption: { dx: 108, dy: 12, center: true },
    layers: [{ src: "/home-objects/02_experience_mineral.webp" }],
  },
  {
    // The stack and the standing Technology book are laid out together in
    // curiosity-home.css; the standing book tips onto the stack on hover.
    id: "education", description: "Academic background",
    x: 805, w: 432, ground: BACK, aspect: 0.53, base: 0.995, caption: { dx: 190, dy: 12 },
    layers: [
      { src: "/home-objects/04_education_books_stack.webp", className: "ch-books-stack" },
      { src: "/home-objects/04_education_technology_book.webp", className: "ch-books-tech" },
    ],
  },
  {
    id: "lab", description: "Technical and creative projects",
    x: 1255, w: 256, ground: BACK, aspect: 517 / 419, base: 0.977, caption: { dx: 196, dy: 12 },
    layers: [{ src: "/home-objects/03_lab_cloche.webp" }],
  },
  {
    id: "about", description: "My approach and interests",
    // front row: frame, cup and pen holder, evenly spaced right of the mineral;
    // each rests high enough for its label to sit beneath it on FRONT_LABELS
    x: 784, w: 196, ground: 883, aspect: 487 / 390, base: 0.912, caption: { dx: 98, center: true, frontRow: true },
    layers: [{ src: "/home-objects/05_about_frame.webp" }],
  },
  {
    id: "associations", description: "Professional associations and volunteering",
    x: 1018, w: 172, ground: 880, aspect: 516 / 735, base: 0.99, caption: { dx: 86, center: true, frontRow: true },
    layers: [{ src: "/home-objects/06_associations_espresso_cup.webp" }],
    steam: true,
  },
  {
    // Back of the holder, then the pen, then the holder again clipped to its
    // front wall: the pen's lower end disappears inside the cup.
    id: "contact", description: "Let’s connect",
    x: 1250, w: 150, ground: 883, aspect: 457 / 303, base: 0.932, caption: { dx: 79, center: true, frontRow: true },
    layers: [
      { src: "/home-objects/06_contact_pen_holder.webp", className: "ch-holder" },
      { src: "/home-objects/07_contact_animated_pen.webp", className: "ch-pen" },
      { src: "/home-objects/06_contact_pen_holder.webp", className: "ch-holder-front" },
    ],
  },
]

/** Top of the object's box, so that its base lands on its ground line. */
const objectTop = (o: HomeObject) => o.ground - o.base * o.w * o.aspect

/**
 * A Selected Work cover's artwork: the issue title (text, one word per line,
 * sized to the cover width) over its central visual. Used by the carousel
 * and by the magazine stack on the homepage, so both always match.
 */
function IssueArt({ project, decorative = false }: { project: Project; decorative?: boolean }) {
  return (
    <>
      <span className="issue__title">
        {project.cover.title.split(" ").map((word) => (
          <span key={word}>{word}</span>
        ))}
      </span>
      <span className="issue__visual">
        <img src={project.cover.image} alt={decorative ? "" : project.cover.alt} draggable={false} />
      </span>
    </>
  )
}

/**
 * The homepage's Selected Work object: the four issues lying in a loose
 * stack on the table (CSS 3D), fanning out when the object is hovered or
 * focused. Pointer events go to a fixed hit area, not the moving covers,
 * so the fan never flickers.
 */
function MagazineStack() {
  return (
    <span className="ch-mags">
      <span className="ch-mags__plane">
        {[...projects].reverse().map((project, i) => (
          <span
            className="ch-mag"
            key={project.slug}
            style={{ "--i": projects.length - 1 - i, "--issue-color": project.cover.color } as CSSProperties}
          >
            <IssueArt project={project} decorative />
          </span>
        ))}
      </span>
      <span className="ch-mags__hit" />
    </span>
  )
}

function CuriosityHomepage() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <main id="home" className="ch-home">
      <img className="ch-bg" src="/home-background.jpg" alt="" draggable={false} />
      <div className="ch-stage">
        <nav className="ch-nav" aria-label="Primary navigation">
          <a className="ch-nav__brand" href="#home">Sabrina Bedjera</a>
          <button
            className="ch-nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="ch-nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <ul id="ch-nav-links" className={`ch-nav__links${menuOpen ? " is-open" : ""}`}>
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="ch-copy" aria-labelledby="home-title">
          <h1 id="home-title">Bridging technology, strategy and investment.</h1>
          <p className="ch-lede">
            With a background in science and engineering, I evaluate complex projects, inform
            strategic decisions and negotiate commercial agreements. My experience spans critical
            minerals, clean energy and emerging technologies, with a focus on turning technical
            opportunities into tangible outcomes.
          </p>
        </section>

        <div className="ch-scene">
          {/* the photograph again, shown on its own when the headline sits above the scene */}
          <img className="ch-scene__bg" src="/home-background.jpg" alt="" draggable={false} />
          <ul className="ch-objects" aria-label="Explore portfolio sections">
            {homeObjects.map((object) => {
              const { number, label, caption } = section(object.id)
              return (
              <li
                className={`ch-object ch-object--${object.id}`}
                key={object.id}
                style={
                  {
                    "--x": object.x,
                    "--y": objectTop(object),
                    "--w": object.w,
                    "--base": object.base,
                    "--dx": object.caption.dx,
                    "--dy": object.caption.frontRow
                      ? FRONT_LABELS - objectTop(object)
                      : object.ground + (object.caption.dy ?? 0) - objectTop(object),
                  } as CSSProperties
                }
              >
                <a href={`#${object.id}`} aria-label={`${number} ${label}: ${object.description}`}>
                  <span className="ch-object__shadow" aria-hidden="true" />
                  <span className="ch-object__art" aria-hidden="true">
                    {object.layers.map((layer, i) => (
                      <img
                        className={layer.className}
                        src={layer.src}
                        alt=""
                        draggable={false}
                        key={i}
                        // hover and clicks only register on the visible artwork
                        style={{ clipPath: layer.className === "ch-holder-front" ? undefined : objectHulls[layer.src] }}
                      />
                    ))}
                    {object.magazines && <MagazineStack />}
                    {object.steam && (
                      <svg className="ch-steam" viewBox="0 0 120 200" aria-hidden="true">
                        <defs>
                          <filter id="ch-steam-blur" x="-50%" y="-20%" width="200%" height="140%">
                            <feGaussianBlur stdDeviation="3.2" />
                          </filter>
                        </defs>
                        <path className="ch-steam__wisp" d="M60 196 C 40 166, 78 140, 58 110 S 44 60, 66 26" />
                        <path className="ch-steam__wisp" d="M48 196 C 30 170, 62 150, 46 120 S 36 76, 52 44" />
                        <path className="ch-steam__wisp" d="M72 196 C 92 168, 60 146, 80 118 S 90 74, 74 40" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`ch-caption${object.caption.center ? " ch-caption--center" : ""}${object.caption.frontRow ? " ch-caption--front" : ""}`}
                    aria-hidden="true"
                  >
                    <span className="ch-caption__number">{number}</span>
                    <span className="ch-caption__title">{caption ?? label}</span>
                    <span className="ch-caption__arrow">→</span>
                  </span>
                </a>
              </li>
              )
            })}
          </ul>
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
        <p className="ps-number">{section("selected-work").number}</p>
        <h2 id="covers-title">
          {/* last word in italics, as in the original design */}
          {section("selected-work").label.split(" ").slice(0, -1).join(" ")}{" "}
          <em>{section("selected-work").label.split(" ").at(-1)}</em>
        </h2>
        <p className="ps-lede">
          From advancing critical minerals investments to exploring energy systems and drinking
          water technologies, these projects reflect how I combine technical analysis, strategic
          thinking and project execution to tackle complex challenges.
        </p>
      </header>

      <div className="cover-browser">
        <div className="cover-browser__stage" aria-live="polite">
          {projects.map((project, index) => {
            const position = getPosition(index)
            return (
              <article
                className={`magazine-cover magazine-cover--issue magazine-cover--${position} ${
                  openingCover === index ? "magazine-cover--opening" : ""
                }`}
                style={{ "--issue-color": project.cover.color } as CSSProperties}
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
                      ? `Open the ${project.cover.title} issue: ${project.title}`
                      : `Move the ${project.cover.title} issue to the centre`
                  }
                >
                  <span className="magazine-cover__inside" aria-hidden="true">
                    <img src={project.cover.image} alt="" />
                  </span>
                  <span
                    className="magazine-cover__paper"
                    onAnimationEnd={() => {
                      if (openingCover === index) finishOpening(project)
                    }}
                  >
                    <IssueArt project={project} />
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
                aria-label={`Show the ${project.cover.title} issue`}
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

/**
 * A YouTube video shown as a thumbnail; the player loads only when chosen,
 * so the page doesn't load YouTube until the visitor asks for it.
 */
function CaseStudyVideo({ video }: { video: CaseVideo }) {
  const [playing, setPlaying] = useState(false)
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`
  return (
    <div className="case-video">
      {playing ? (
        <div className="case-video__frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          className="case-video__poster"
          onClick={() => setPlaying(true)}
          aria-label={`${video.title} (plays here)`}
          style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)` }}
        >
          <span className="case-video__play" aria-hidden="true" />
        </button>
      )}
      <p className="case-video__title">{video.title}</p>
      <p className="case-video__description">{video.description}</p>
      <a className="case-video__link" href={watchUrl} target="_blank" rel="noreferrer">
        Open on YouTube <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}

/** A research figure; when `enlarge` is set it opens full size in a dialog. */
function CaseStudyFigure({ figure }: { figure: CaseFigure }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const image = <img src={figure.src} alt={figure.alt} loading="lazy" />
  return (
    <figure className="case-figure">
      {figure.enlarge ? (
        <button
          type="button"
          className="case-figure__open"
          onClick={() => dialog.current?.showModal()}
          aria-label={`Enlarge the ${figure.label}`}
        >
          {image}
          <span className="case-figure__hint" aria-hidden="true">
            Enlarge ⤢
          </span>
        </button>
      ) : (
        image
      )}
      <figcaption>{figure.caption}</figcaption>
      {figure.enlarge && (
        <dialog
          ref={dialog}
          className="case-figure__dialog"
          aria-label={figure.label}
          onClick={(event) => {
            // a click on the backdrop (the dialog itself) closes it
            if (event.target === event.currentTarget) dialog.current?.close()
          }}
        >
          <button
            type="button"
            className="case-figure__close"
            onClick={() => dialog.current?.close()}
          >
            Close ✕
          </button>
          <img src={figure.src} alt={figure.alt} />
          <p>{figure.caption}</p>
        </dialog>
      )}
    </figure>
  )
}

/** External link card used in the reading lists. */
type ReadingLink = {
  href: string
  kicker: string
  title: string
  meta?: string
  text?: string
  note?: string
  featured?: boolean
}

const readingLists: Partial<Record<Project["tone"], { label: string; heading: string; links: ReadingLink[] }>> = {
  mineral: {
    label: "Further reading",
    heading: "Independent coverage and context",
    links: [
      {
        featured: true,
        href: "https://www.reuters.com/business/canada-accelerate-critical-mineral-projects-worth-46-billion-energy-minister-2025-10-31/",
        kicker: "Featured article · In the News",
        meta: "Reuters | October 31, 2025",
        title: "Canada to accelerate critical mineral projects worth $4.6 billion",
        text: "Reuters coverage of Canada’s Critical Minerals Production Alliance, including the Rio Tinto and Nouveau Monde Graphite offtake agreements.",
        note: "Subscription may be required.",
      },
      {
        href: "https://www.canada.ca/en/campaign/critical-minerals-in-canada/canadian-critical-minerals-strategy.html",
        kicker: "Secondary resource · Policy Context",
        title: "The Canadian Critical Minerals Strategy",
        text: "Canada’s national strategy for developing critical minerals value chains and supporting investment in domestic production and processing.",
      },
    ],
  },
  energy: {
    label: "Further reading",
    heading: "Public context for the work",
    links: [
      {
        href: "https://natural-resources.canada.ca/energy-sources/carbon-management/canada-s-carbon-management-strategy",
        kicker: "Government of Canada",
        title: "Canada’s Carbon Management Strategy",
      },
      {
        href: "https://www.iea.org/reports/legal-and-regulatory-frameworks-for-ccus",
        kicker: "International Energy Agency",
        title: "Legal and Regulatory Frameworks for CCUS",
      },
    ],
  },
}

const flourishCharts = [
  { id: "30103551", kind: "01 · Packed bubble chart", title: "Pacific Energy Systems Are Transitioning to Renewables", hint: "Interactive: hover or tap a bubble for details." },
  // Autoplay and looping of the time slider are template settings saved in
  // Flourish, not embed options; the embed only needs room for the controls.
  { id: "30064554", kind: "02 · Animated scatterplot", title: "The Pacific’s Power Generation: A Transition Away from Oil", hint: "Interactive: use the timeline controls to animate the chart, and hover for details.", tall: true },
  { id: "30103365", kind: "03 · Interactive radial chart", title: "Pacific Renewable Electricity in 2025: On-Grid or Off-Grid?", hint: "Interactive: hover or tap a segment for details." },
]

/**
 * A case study laid out as a magazine feature: an opening spread in the
 * cover's colours, the contributions, then project-specific resources.
 */
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

  const chapters = project.contributionsLayout === "chapters"
  const reading = readingLists[project.tone]
  const hero = project.heroImage ?? { src: project.cover.image, alt: project.cover.alt }

  return (
    <main className="cs" style={{ "--cs-accent": project.cover.color } as CSSProperties}>
      <nav className="cs-nav" aria-label="Case study navigation">
        <button onClick={onBack}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M19 12H5M10 7l-5 5 5 5" />
          </svg>
          <span>Back to Selected Work</span>
        </button>
        <span>
          {project.cover.title} · {project.number} of {String(projects.length).padStart(2, "0")}
        </span>
      </nav>

      <header className="cs-hero">
        <div className="cs-hero__copy">
          <p className="cs-kicker">{project.eyebrow}</p>
          <h1>{project.caseHeadline}</h1>
          <p className="cs-hero__intro">{project.caseIntroduction}</p>
          {project.credential && <p className="cs-hero__credential">{project.credential}</p>}
        </div>
        <figure className={`cs-hero__visual${project.heroImage ? " cs-hero__visual--photo" : ""}`}>
          <img src={hero.src} alt={hero.alt} />
        </figure>
      </header>

      <section
        className={`cs-section cs-contrib${chapters ? " cs-contrib--chapters" : ""}`}
        aria-labelledby="contributions-title"
      >
        <header className="cs-section__head">
          {project.contributionsLabel && <p className="cs-kicker">{project.contributionsLabel}</p>}
          <h2 id="contributions-title">
            {project.contributionsHeading ?? "Selected Contributions"}
          </h2>
        </header>
        <div className="cs-contrib__list">
          {project.contributions.map((contribution) => (
            <article className="cs-card" key={contribution.number}>
              <span className="cs-card__number">{contribution.number}</span>
              <h3>{contribution.title}</h3>
              {contribution.highlight && (
                <p className="cs-card__highlight">{contribution.highlight}</p>
              )}
              <div className="cs-card__body">
                {(Array.isArray(contribution.body)
                  ? contribution.body
                  : [contribution.body]
                ).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {contribution.pointsLead && (
                  <p className="cs-card__lead">{contribution.pointsLead}</p>
                )}
              </div>
              {contribution.points && (
                <ul className="cs-points">
                  {contribution.points.map((point) =>
                    typeof point === "string" ? (
                      <li key={point}>{point}</li>
                    ) : (
                      <li key={point.label}>
                        <b>{point.label}</b> {point.text}
                      </li>
                    ),
                  )}
                </ul>
              )}
              {contribution.link && (
                <a
                  className="cs-card__link"
                  href={contribution.link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contribution.link.label} <span aria-hidden="true">↗</span>
                </a>
              )}
              {contribution.quote && (
                <blockquote className="cs-quote">
                  <p>“{contribution.quote.text}”</p>
                  <cite>{contribution.quote.source}</cite>
                </blockquote>
              )}
              {(contribution.figure || contribution.video) && (
                <div className="cs-media">
                  {contribution.figure && (
                    <CaseStudyFigure figure={contribution.figure} />
                  )}
                  {contribution.video && (
                    <CaseStudyVideo video={contribution.video} />
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {project.tone === "data" && (
        <>
          <section className="cs-section cs-data" aria-labelledby="visuals-title">
            <header className="cs-section__head">
              <p className="cs-kicker">Interactive data visualizations</p>
              <h2 id="visuals-title">Explore the Data</h2>
              <p className="cs-section__intro">
                Explore the Pacific’s energy transition through interactive charts. Hover, click and
                animate the visualizations to uncover trends in electricity access, oil dependence and
                renewable energy development.
              </p>
            </header>
            <div className="cs-data__charts">
              {flourishCharts.map((chart) => (
                <article className={`cs-chart${chart.tall ? " cs-chart--tall" : ""}`} key={chart.id}>
                  <header>
                    <div>
                      <span>{chart.kind}</span>
                      <h3>{chart.title}</h3>
                      <p className="cs-chart__hint">{chart.hint}</p>
                    </div>
                    <a
                      href={`https://public.flourish.studio/visualisation/${chart.id}/`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Flourish <span aria-hidden="true">↗</span>
                    </a>
                  </header>
                  <iframe
                    title={chart.title}
                    src={`https://flo.uri.sh/visualisation/${chart.id}/embed`}
                    loading="lazy"
                    allowFullScreen
                  >
                    <a href={`https://public.flourish.studio/visualisation/${chart.id}/`}>
                      <img
                        src={`https://public.flourish.studio/visualisation/${chart.id}/thumbnail`}
                        alt={`Open ${chart.title} in Flourish`}
                      />
                    </a>
                  </iframe>
                </article>
              ))}
            </div>
          </section>
          <section className="cs-cta" aria-labelledby="links-title">
            <p className="cs-kicker">View the project</p>
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

      {reading && (
        <section className="cs-section cs-reading" aria-labelledby="reading-title">
          <header className="cs-section__head">
            <p className="cs-kicker">{reading.label}</p>
            <h2 id="reading-title">{reading.heading}</h2>
          </header>
          <div className="cs-reading__links">
            {reading.links.map((link) => (
              <a
                className={`cs-link${link.featured ? " cs-link--featured" : ""}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.href}
              >
                <span className="cs-link__kicker">{link.kicker}</span>
                {link.meta && <small>{link.meta}</small>}
                <strong>{link.title}</strong>
                {link.text && <p>{link.text}</p>}
                {link.note && <em>{link.note}</em>}
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>
      )}

      <footer className="cs-footer">
        <p>End of case study · {project.number}</p>
        {project.related && (
          <a className="cs-footer__related" href={project.related.href}>
            {project.related.label} <span aria-hidden="true">→</span>
          </a>
        )}
        <button onClick={onBack}>
          <span>Back to Selected Work</span>
          <Arrow />
        </button>
      </footer>
    </main>
  )
}

/* Views reached by hash: #case-study/<slug> and #lab/<slug>; any other
   hash is a place on the main page. */
const projectFromHash = () =>
  projects.find((project) => window.location.hash === `#case-study/${project.slug}`) ?? null
const labPostFromHash = () =>
  labPosts.find((post) => window.location.hash === `#lab/${post.slug}`) ?? null

export default function App() {
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(projectFromHash)
  const [labPost, setLabPost] = useState<LabPost | null>(labPostFromHash)

  useEffect(() => {
    const handleHashChange = () => {
      setCaseStudyProject(projectFromHash())
      setLabPost(labPostFromHash())
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // returning to the main page from a case study or article: the browser
  // looked for the anchor before the page was drawn, so scroll to it now
  useEffect(() => {
    if (caseStudyProject || labPost) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const scroll = () => document.getElementById(id)?.scrollIntoView()
    requestAnimationFrame(scroll)
    // once more after images above it have taken their size
    const settle = window.setTimeout(scroll, 400)
    return () => window.clearTimeout(settle)
  }, [caseStudyProject, labPost])

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

  const closeLabPost = () => {
    window.history.pushState({}, "", `${window.location.pathname}${window.location.search}#lab`)
    setLabPost(null)
  }

  if (labPost) {
    return <LabArticle post={labPost} onBack={closeLabPost} />
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
