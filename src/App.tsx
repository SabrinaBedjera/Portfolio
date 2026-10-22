import { useEffect, useRef, useState, type CSSProperties } from "react"
import "./curiosity-home.css"
import "./selected-work.css"
import PortfolioSections from "./PortfolioSections"
import { section, sections, type SectionId } from "./sections"

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
  image?: string
  imageAlt?: string
  featureImage: string
  featureImageAlt: string
  /** Case-study hero, when it differs from the magazine cover image. */
  heroImage?: { src: string; alt: string }
  tone: "mineral" | "data" | "energy" | "water" | "policy"
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
  /** Opens full size in a dialog when clicked. */
  enlarge?: boolean
}

/* The water and policy case studies reuse the Clean Energy cover and article layout;
   its own colours are set in selected-work.css. */
const layoutTone = (tone: Project["tone"]) =>
  tone === "water" || tone === "policy" ? `energy ${tone}` : tone


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
      "Master of Applied Science (MASc) in Civil and Environmental Engineering | University of Waterloo | 2019",
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
          { label: "Model validation", text: "Compared predicted atrazine degradation against laboratory results to evaluate model accuracy." },
          { label: "Predictive simulations", text: "Modelled the removal of different contaminants under varying seasonal conditions and ozone doses, including estimating reaction rates for compounds with limited published data." },
        ],
        figure: {
          src: "/case-studies/thesis-figure-3-2-ozonation-setup.jpg",
          alt: "Laboratory bench with three tall glass columns connected by clear gas tubing; one column stands in a bucket of ice",
          caption: "Figure 3.2 — Bench-scale ozonation setup: glass columns connected by ozone gas lines, with one column chilled in an ice bath.",
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
          src: "/case-studies/thesis-figure-4-10-btex-simulations.png",
          alt: "Four line charts of simulated BTEX compound concentrations over 1,500 seconds in Lake Ontario water, at ozone doses of 1 and 4 mg/L and temperatures of 20 °C and 5 °C",
          caption: "Figure 4.10 — Simulated degradation of individual BTEX compounds in Lake Ontario water, comparing applied ozone doses of 1 mg/L and 4 mg/L at 20 °C (September 2016) and 5 °C (December 2016).",
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
    // confirmed. Until then the hero uses the cover image (Figure 4.10 panels).
    // heroImage: {
    //   src: "/case-studies/thesis-hero-treatment-plant.jpg",
    //   alt: "Water flowing over the weir of a large circular treatment tank, with trees and blue sky behind",
    // },
    // Cover: panels A and B of thesis Figure 4.10 (the full figure appears in the case study).
    featureImage: "/case-studies/thesis-cover-btex-panels.png",
    featureImageAlt:
      "Two simulated degradation curves from the thesis: BTEX compound concentrations falling over 1,500 seconds at an ozone dose of 1 mg/L, at 20 °C and 5 °C",
    tone: "water",
  },
  {
    slug: "indigenous-drinking-water-policy",
    number: "05",
    title: "A Holistic Approach to Measuring Drinking Water Success in Indigenous Communities",
    eyebrow: "Science Policy · Drinking Water · Indigenous Communities",
    summary:
      "A policy proposal for measures of drinking water success that go beyond boil water advisories.",
    description:
      "Policy proposal recognized as a runner-up in the Canadian Science Policy Centre’s 2019 Science Policy Awards of Excellence – Youth Category.",
    coverTitle: ["Water", "Policy"],
    coverSubtitle: "Measuring Drinking Water Success in Indigenous Communities",
    caseHeadline: "Measuring Drinking Water Success in Indigenous Communities",
    caseIntroduction:
      "Policy proposal | Canadian Science Policy Centre, Science Policy Awards of Excellence – Youth Category | 2019",
    contributionsLabel: "Policy proposal",
    contributionsHeading: "The proposal",
    contributionsLayout: "chapters",
    // Content summarized from the proposal as published by CSPC (2019).
    contributions: [
      {
        number: "01",
        title: "The Challenge",
        body: [
          "Indigenous communities in Canada are disproportionately affected by poor drinking water quality, linked to factors including colonization, governance, water infrastructure and operator training.",
          "In 2015, the federal government pledged to end long-term boil water advisories in Indigenous communities. But focusing only on advisories can leave communities behind. Many households without running water rely on cisterns filled by water trucks, where water can become contaminated during delivery; because the treatment plant itself produces safe water, no advisory is issued — and in one community the proposal describes, that meant no eligibility for additional funding. Even after an advisory is lifted, residents may remain unsatisfied with, and distrustful of, their water.",
          "The proposal argued for new measures of drinking water success, developed in collaboration with Indigenous people, that reflect the full state of drinking water in their communities.",
        ],
      },
      {
        number: "02",
        title: "My Approach",
        body: "Drawing on published research on drinking water, health and governance in Indigenous communities, I proposed a four-step policy approach:",
        points: [
          { label: "A dedicated committee", text: "Create a committee with meaningful Indigenous representation, drinking water experts, federal and provincial officials and researchers, to develop measures of drinking water success founded in Indigenous knowledge and values." },
          { label: "Broader measures of success", text: "Alongside standard water quality measures, consider factors such as residents’ satisfaction with their tap water, how often they drink it, and health outcomes such as gastrointestinal illness, waterborne disease and skin problems." },
          { label: "Community-based research", text: "Determine where new research is needed and carry it out through community-based participatory methods, including communities that rely on cisterns rather than running water." },
          { label: "Drinking water goals", text: "Set drinking water goals against the new measures — federally, provincially or by community — with the appropriate agencies allocating resources to meet them." },
        ],
        video: {
          id: "ECDsMIN_8EY",
          title: "Watch the Policy Interview",
          description: "My 2019 video interview discussing this policy proposal.",
        },
      },
      {
        number: "03",
        title: "Results & Recognition",
        highlight: "Runner-up — Canadian Science Policy Centre, 5th Annual Science Policy Awards of Excellence – Youth Category (2019)",
        body: [
          "The proposal was one of two runners-up in the Youth Category, which recognizes people under 35 who develop innovative, evidence-based policy proposals that would make a positive difference to Canadians. The 2019 awards were presented at the 11th Canadian Science Policy Conference in Ottawa in November 2019.",
          "The work connects engineering knowledge of drinking water treatment with policy design: how success is measured shapes which communities receive attention and resources.",
        ],
        quote: {
          text: "Through the collaborative water program at the University of Waterloo I learned about drinking water treatment issues in Indigenous communities. I had the opportunity to learn from Indigenous communities themselves and even had the honor of attending a water ceremony.",
          source: "From my award profile, CSPC 2019",
        },
      },
    ],
    featureImage: "/case-studies/policy-cover-quote.svg",
    featureImageAlt:
      "Quotation from the proposal: “Boil water advisories on their own do not provide enough information on the state of drinking water in Indigenous communities.”",
    tone: "policy",
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
   Background: public/home-background.jpg (1672 × 941, empty wall and table).
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
  /** Caption offset: dx from the object's left edge, dy from its ground line. */
  caption: { dx: number; dy: number }
  layers: { src: string; className?: string }[]
  /** Faint animated steam above the object (drawn in SVG, shown on hover). */
  steam?: boolean
}

/* Back row rests on the far part of the table, front row nearer the viewer. */
const BACK = 652
const homeObjects: HomeObject[] = [
  {
    id: "selected-work", description: "Case studies and featured projects",
    x: 60, w: 540, ground: 892, aspect: 430 / 653, base: 0.951, caption: { dx: 330, dy: -40 },
    layers: [{ src: "/home-objects/01_selected_work_magazines.webp" }],
  },
  {
    id: "experience", description: "Professional background",
    x: 650, w: 200, ground: BACK, aspect: 478 / 359, base: 0.956, caption: { dx: 10, dy: 12 },
    layers: [{ src: "/home-objects/02_experience_mineral.webp" }],
  },
  {
    // The stack and the standing Technology book are laid out together in
    // curiosity-home.css; the standing book tips onto the stack on hover.
    id: "education", description: "Academic background",
    x: 884, w: 432, ground: BACK, aspect: 0.53, base: 0.995, caption: { dx: 170, dy: 12 },
    layers: [
      { src: "/home-objects/04_education_books_stack.webp", className: "ch-books-stack" },
      { src: "/home-objects/04_education_technology_book.webp", className: "ch-books-tech" },
    ],
  },
  {
    id: "lab", description: "Technical and creative projects",
    x: 1330, w: 256, ground: BACK, aspect: 517 / 419, base: 0.977, caption: { dx: 80, dy: 12 },
    layers: [{ src: "/home-objects/03_lab_cloche.webp" }],
  },
  {
    id: "about", description: "My approach and interests",
    x: 650, w: 200, ground: 924, aspect: 487 / 390, base: 0.912, caption: { dx: 204, dy: -28 },
    layers: [{ src: "/home-objects/05_about_frame.webp" }],
  },
  {
    id: "associations", description: "Professional associations and volunteering",
    x: 990, w: 196, ground: 880, aspect: 516 / 735, base: 0.99, caption: { dx: 26, dy: 14 },
    layers: [{ src: "/home-objects/06_associations_espresso_cup.webp" }],
    steam: true,
  },
  {
    // Back of the holder, then the pen, then the holder again clipped to its
    // front wall: the pen's lower end disappears inside the cup.
    id: "contact", description: "Let’s connect",
    x: 1232, w: 150, ground: 905, aspect: 457 / 303, base: 0.932, caption: { dx: 160, dy: -22 },
    layers: [
      { src: "/home-objects/06_contact_pen_holder.webp", className: "ch-holder" },
      { src: "/home-objects/07_contact_animated_pen.webp", className: "ch-pen" },
      { src: "/home-objects/06_contact_pen_holder.webp", className: "ch-holder-front" },
    ],
  },
]

/** Top of the object's box, so that its base lands on its ground line. */
const objectTop = (o: HomeObject) => o.ground - o.base * o.w * o.aspect

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
          <p className="ch-eyebrow">Science <span>×</span> Technology <span>×</span> Strategy</p>
          <h1 id="home-title">Making complex<br />ideas move forward.</h1>
          <p className="ch-lede">
            Engineering, energy, investment and creative technology for a more sustainable and
            connected world.
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
                    "--dy": object.ground + object.caption.dy - objectTop(object),
                  } as CSSProperties
                }
              >
                <a href={`#${object.id}`} aria-label={`${number} ${label}: ${object.description}`}>
                  <span className="ch-object__shadow" aria-hidden="true" />
                  <span className="ch-object__art" aria-hidden="true">
                    {object.layers.map((layer, i) => (
                      <img className={layer.className} src={layer.src} alt="" draggable={false} key={i} />
                    ))}
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
                  <span className="ch-caption" aria-hidden="true">
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
          Please explore my experience across critical minerals, Pacific energy
          systems, clean technology, drinking water research and water policy.
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
          aria-label={`Enlarge ${figure.caption.split(" — ")[0]}`}
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
          aria-label={figure.caption.split(" — ")[0]}
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

      <header
        className={`article-hero${project.heroImage ? " article-hero--photo" : ""}`}
      >
        <div className="article-hero__copy">
          <p>{project.eyebrow}</p>
          <h1>{project.caseHeadline}</h1>
          <p className="article-hero__intro">{project.caseIntroduction}</p>
        </div>
        <div className="article-hero__visual" aria-label="Project visual">
          <img
            src={project.heroImage?.src ?? project.featureImage}
            alt={project.heroImage?.alt ?? project.featureImageAlt}
          />
          <span>Selected Work / {project.number}</span>
        </div>
      </header>

      <section
        className={`article-contributions article-contributions--editorial${
          project.contributionsLayout === "chapters"
            ? " article-contributions--chapters"
            : ""
        }`}
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
                {(Array.isArray(contribution.body)
                  ? contribution.body
                  : [contribution.body]
                ).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {contribution.pointsLead && (
                  <p className="article-contributions__lead">
                    {contribution.pointsLead}
                  </p>
                )}
                {contribution.points && (
                  <ul>
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
                    className="article-contributions__link"
                    href={contribution.link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contribution.link.label} <span aria-hidden="true">↗</span>
                  </a>
                )}
                {contribution.quote && (
                  <blockquote className="article-contributions__quote">
                    <p>“{contribution.quote.text}”</p>
                    <cite>{contribution.quote.source}</cite>
                  </blockquote>
                )}
              </div>
              {(contribution.figure || contribution.video) && (
                <div className="article-chapter__media">
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
