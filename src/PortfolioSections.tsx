import { useEffect, useLayoutEffect, useRef, useState } from "react"
import "./portfolio-sections.css"
import { section, type SectionId } from "./sections"

/* ------------------------------------------------------------------
   Portfolio sections after Selected Work: Experience, Education, Lab,
   About, Associations and Contact (the order in sections.ts). Content restored from experiment/photo-desk.
   Section ids match the homepage hotspots and navigation.
------------------------------------------------------------------- */

type Role = {
  id: string
  when: string
  organization: string
  unit: string
  /** Theme of the work, shown as the entry's headline. */
  theme: string
  text: string
  /** Selected skills, project themes or contributions. */
  highlights: string[]
  /** A small linked credit beneath the role, e.g. a presentation. */
  credit?: { kicker: string; title: string; href: string }
  /** A related piece of work shown inside the entry. */
  feature?: {
    kicker: string
    title: string
    text: string
    recognition: string
    links: { label: string; href?: string }[]
  }
}

/* The written proposal is not yet published online; add its URL here and
   the "Read the proposal" link appears. */
const POLICY_PROPOSAL_URL: string | undefined = undefined

/* Most recent first. */
const roles: Role[] = [
  {
    id: "role-critical-minerals",
    when: "Nov 2022 – Present",
    organization: "Natural Resources Canada",
    unit: "Critical Minerals Centre of Excellence",
    theme: "Critical Minerals & Clean Energy",
    text: "Lead technical, financial and commercial assessments of critical minerals projects, coordinating multidisciplinary teams to evaluate project viability and inform investment decisions. Support investment strategy and negotiate commercial agreements, including offtake and equity arrangements, to advance strategic supply chains and project commercialization.",
    highlights: [
      "Project Due Diligence",
      "Investment Strategy",
      "Commercial Negotiations",
      "Cross-Functional Project Leadership",
    ],
  },
  {
    id: "role-carbon-capture",
    when: "Jan 2022 – Nov 2022",
    organization: "Natural Resources Canada",
    unit: "Carbon Capture Division",
    theme: "Carbon Management",
    text: "Contributed to the development of Canada’s Carbon Management Strategy and international technical publications through the International Energy Agency (IEA). Assessed carbon capture, utilization and storage (CCUS) technologies, connecting technical developments with Canadian industry and policy considerations.",
    highlights: [
      "Carbon Capture, Utilization & Storage (CCUS)",
      "Energy Technology Assessment",
      "International Technical Collaboration",
    ],
  },
  {
    id: "role-intellectual-property",
    when: "Oct 2020 – Jan 2022",
    organization: "Natural Resources Canada",
    unit: "Intellectual Property Division",
    theme: "Intellectual Property, AI & Emerging Technologies",
    text: "Led technical and policy analysis on intellectual property, artificial intelligence and climate-related technologies, collaborating with external think tanks on AI research. Spearheaded the development of performance indicators to evaluate the Intellectual Property Division’s impact and inform improvements to program design.",
    highlights: ["Artificial Intelligence", "Intellectual Property", "Performance Measurement"],
  },
  {
    id: "role-forwater",
    when: "Feb 2019 – Jul 2020",
    organization: "University of Waterloo",
    unit: "forWater Network",
    theme: "Water Security & Climate Adaptation",
    text: "Conducted engineering and policy research on water security, collaborating with economists to develop a climate adaptation assessment framework.",
    highlights: ["Water Security", "Climate Adaptation", "Engineering Research", "Interdisciplinary Collaboration"],
    feature: {
      kicker: "Policy proposal · 2019",
      title: "A Holistic Approach to Measuring Drinking Water Success in Indigenous Communities",
      text: "Developed in connection with this water security work: a policy proposal arguing that boil water advisories alone do not capture the state of drinking water in Indigenous communities, and recommending new measures of drinking water success created in collaboration with Indigenous communities — from water quality to residents’ satisfaction with their tap water and health outcomes.",
      recognition: "Runner-up, Canadian Science Policy Centre, 5th Annual Science Policy Awards of Excellence — Youth Category (2019)",
      links: [
        { label: "Read the proposal", href: POLICY_PROPOSAL_URL },
        { label: "Watch the policy interview", href: "https://www.youtube.com/watch?v=ECDsMIN_8EY" },
      ],
    },
  },
  {
    id: "role-ontario-tech",
    when: "Sep 2015 – Feb 2019",
    organization: "Ontario Tech University",
    unit: "Data Management Lead",
    theme: "Research Data & Visualization",
    text: "Led research data management and qualitative analysis using NVivo, including developing data organization and analysis approaches for a research project.",
    highlights: ["Research data management", "Qualitative analysis", "Structured research datasets"],
    credit: {
      kicker: "Co-authored Conference Presentation · 2016",
      title: "Video diaries of the (un)made",
      href: "https://www.researchgate.net/publication/322444850_Video_diaries_of_the_unmade",
    },
  },
]

/* Career overview above the roles, oldest first; each milestone links to its role. */
const careerMilestones = [
  { year: "2015", label: "Research & Data", role: "role-ontario-tech" },
  { year: "2019", label: "Water Security", role: "role-forwater" },
  { year: "2020", label: "IP & Emerging Technology", role: "role-intellectual-property" },
  { year: "2022", label: "Carbon Management", role: "role-carbon-capture" },
  { year: "2022–Present", label: "Critical Minerals & Clean Energy", role: "role-critical-minerals" },
]

const education: { degree: string; detail: string; award?: string }[] = [
  {
    degree: "Master of Applied Science (MASc) in Civil and Environmental Engineering",
    detail: "Water specialization · University of Waterloo",
    award: "First place, American Water Works Association (AWWA) Master’s Academic Achievement Award",
  },
  { degree: "BSc, Minor in Mathematics", detail: "Ontario Tech University" },
  { degree: "BEd", detail: "Ontario Tech University" },
]

/* Skills grouped so the list is easier to scan; Projects & Investment leads. */
const skillGroups = [
  {
    heading: "Projects & Investment",
    skills: ["Project Due Diligence", "Investment Strategy", "Project Evaluation", "Commercial Negotiations", "Agreement Structuring"],
  },
  {
    heading: "Technical & Analytical",
    skills: ["Techno-Economic Assessment", "Energy & Emerging Technologies", "Data Analysis & Visualization", "Technical Research"],
  },
  { heading: "Strategy & Policy", skills: ["Strategic Analysis", "Technology Policy", "Program Evaluation"] },
  {
    heading: "Leadership & Collaboration",
    skills: ["Cross-Functional Project Leadership", "Multidisciplinary Coordination", "Stakeholder Engagement"],
  },
]

const tools = ["Power BI", "Excel", "R", "Flourish", "Tableau", "NVivo"]

/* Dates and fuller descriptions to be added once confirmed. */
const associations = [
  {
    role: "Mentor",
    organization: "Clean Technology Open",
    text: "Mentor within the Clean Technology Open community, contributing to the clean technology entrepreneurship ecosystem.",
    tags: ["Mentorship", "Clean technology", "Entrepreneurship"],
  },
  {
    role: "Volunteer",
    organization: "Women in Clean Technology",
    text: "Volunteer with Women in Clean Technology, taking part in the community of women working across the clean technology sector.",
    tags: ["Volunteering", "Community", "Clean technology"],
  },
]

/**
 * Professional Experience: a horizontal overview whose milestones select a
 * role, and the roles as a vertical timeline. The selected role stays
 * highlighted, and a small convertible drives along the rail to it.
 */
function Experience() {
  const [active, setActive] = useState(roles[0].id)
  const [drive, setDrive] = useState<{ top: number; heading: "down" | "up" | null }>({ top: 0, heading: null })
  const list = useRef<HTMLOListElement>(null)
  const arrived = useRef<number | null>(null)

  // where the car parks: just above the selected role's marker on the rail
  const parkingSpot = (roleId: string) => {
    const entry = document.getElementById(roleId)
    const marker = entry?.querySelector<HTMLElement>(".ps-role__when")
    if (!list.current || !entry || !marker) return 0
    return marker.getBoundingClientRect().top - list.current.getBoundingClientRect().top
  }

  useLayoutEffect(() => {
    const place = () => setDrive((d) => ({ ...d, top: parkingSpot(active) }))
    place()
    window.addEventListener("resize", place)
    return () => window.removeEventListener("resize", place)
  }, [active])

  useEffect(() => () => {
    if (arrived.current) window.clearTimeout(arrived.current)
  }, [])

  const select = (roleId: string) => {
    const from = parkingSpot(active)
    const to = parkingSpot(roleId)
    setActive(roleId)
    setDrive({ top: to, heading: to === from ? null : to > from ? "down" : "up" })
    if (arrived.current) window.clearTimeout(arrived.current)
    arrived.current = window.setTimeout(() => setDrive((d) => ({ ...d, heading: null })), 950)
    const entry = document.getElementById(roleId)
    if (!entry) return
    // restart the arrival highlight even when the same milestone is chosen again
    entry.classList.remove("is-arrived")
    void entry.offsetWidth
    entry.classList.add("is-arrived")
    window.setTimeout(() => entry.classList.remove("is-arrived"), 3200)
  }

  return (
    <>
      <nav className="ps-overview" aria-label="Career overview, 2015 to present">
        <p className="ps-overview__label">Career at a glance</p>
        <ol className="ps-career">
          {careerMilestones.map((milestone, i) => {
            const role = roles.find((r) => r.id === milestone.role)!
            const classes = [
              i === careerMilestones.length - 1 ? "is-current" : "",
              active === milestone.role ? "is-selected" : "",
            ].join(" ").trim()
            return (
              <li className={classes || undefined} key={milestone.label}>
                <a
                  href={`#${milestone.role}`}
                  aria-label={`${milestone.year}, ${milestone.label}: go to ${role.organization}, ${role.unit}`}
                  aria-current={active === milestone.role ? "true" : undefined}
                  onClick={() => select(milestone.role)}
                >
                  <span className="ps-career__year">{milestone.year}</span>
                  <span className="ps-career__label">{milestone.label}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      <ol className="ps-roles" ref={list}>
        <li
          className={`ps-car${drive.heading ? ` ps-car--${drive.heading}` : ""}`}
          style={{ top: drive.top }}
          aria-hidden="true"
        >
          <img src="/home-objects/timeline-convertible.webp" alt="" draggable={false} />
        </li>
        {roles.map((role, i) => (
          <li
            className={`ps-role${i === 0 ? " ps-role--current" : ""}${active === role.id ? " is-active" : ""}`}
            id={role.id}
            key={role.id}
          >
            <div className="ps-role__meta">
              <p className="ps-role__when">{role.when}</p>
              <p className="ps-role__org">{role.organization}</p>
              <p className="ps-role__unit">{role.unit}</p>
            </div>
            <div className="ps-role__body">
              <h3>{role.theme}</h3>
              <p className="ps-role__text">{role.text}</p>
              <ul className="ps-pills" aria-label="Focus areas">
                {role.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {role.credit && (
                <p className="ps-credit">
                  <span className="ps-credit__kicker">{role.credit.kicker}</span>
                  <a href={role.credit.href} target="_blank" rel="noreferrer">
                    {role.credit.title} <span aria-hidden="true">↗</span>
                  </a>
                </p>
              )}
              {role.feature && (
                <aside className="ps-feature" aria-label={role.feature.title}>
                  <p className="ps-feature__kicker">{role.feature.kicker}</p>
                  <h4>{role.feature.title}</h4>
                  <p>{role.feature.text}</p>
                  <p className="ps-feature__award">{role.feature.recognition}</p>
                  <p className="ps-feature__links">
                    {role.feature.links
                      .filter((link) => link.href)
                      .map((link) => (
                        <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                  </p>
                </aside>
              )}
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

/** Number and heading come from sections.ts, shared with the navigation. */
function SectionHead({ id, lede }: { id: SectionId; lede?: string }) {
  const { number, label } = section(id)
  return (
    <header className="ps-head">
      <p className="ps-number">{number ?? "\u00a0"}</p>
      <h2 id={`${id}-title`}>{label}</h2>
      {lede && <p className="ps-lede">{lede}</p>}
    </header>
  )
}

export default function PortfolioSections() {
  return (
    <div className="ps">
      <section id="experience" className="ps-section" aria-labelledby="experience-title">
        <div className="ps-wrap">
          <SectionHead id="experience" />
          <Experience />
        </div>
      </section>

      <section id="education" className="ps-section ps-section--tint" aria-labelledby="education-title">
        <div className="ps-wrap">
          <SectionHead id="education" />
          <div className="ps-two">
          <div>
            <ul className="ps-education">
              {education.map((item) => (
                <li key={item.degree}>
                  <h3>{item.degree}</h3>
                  <p>{item.detail}</p>
                  {item.award && (
                    <p className="ps-education__award">
                      <span>Award</span> {item.award}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="ps-skills">
            <h2 id="skills-title">Skills</h2>
            <div className="ps-skills__groups">
            {skillGroups.map((group, i) => (
              <div className={`ps-skills__group${i === 0 ? " ps-skills__group--lead" : ""}`} key={group.heading}>
                <h3>{group.heading}</h3>
                <ul className="ps-pills">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
            <p className="ps-tools">
              <span className="ps-tools__label">Tools</span> {tools.join(" · ")}
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Lab projects to be added. */}
      <section id="lab" className="ps-section" aria-labelledby="lab-title">
        <div className="ps-wrap">
          <SectionHead id="lab" lede="Technical and creative projects" />
        </div>
      </section>

      <section id="about" className="ps-section ps-section--tint" aria-labelledby="about-title">
        <div className="ps-wrap ps-about">
          {/* Temporary photo from the earlier portfolio version. */}
          <figure className="ps-about__photo">
            <img src="/about-portrait.jpg" alt="Sabrina Bedjera" width="800" height="800" />
          </figure>
          <div>
            <SectionHead id="about" />
            <p className="ps-about__lead">
              My background is in science, mathematics and engineering, but my interests have always
              extended beyond any one discipline. I enjoy understanding how things work, exploring new
              ideas and finding ways to turn them into something useful.
            </p>
            <p>
              Professionally, I’ve worked across clean energy, critical minerals, emerging technologies
              and investment strategy. What I enjoy most is working on complex problems that bring
              together different perspectives, whether that’s understanding a technology, evaluating a
              project or figuring out how to move an idea forward.
            </p>
            <p>
              Outside of work, I have a lot of creative interests. I enjoy writing fiction,
              experimenting with data visualization, building websites and tinkering with technology.
              I’m often working on a new project or learning something simply because I find it
              interesting. I also enjoy running, playing pickleball, art and exploring new places.
            </p>
          </div>
        </div>
      </section>

      <section id="associations" className="ps-section" aria-labelledby="associations-title">
        <div className="ps-wrap">
          <SectionHead id="associations" />
          <div className="ps-associations">
            {associations.map((item) => (
              <article className="ps-association" key={item.organization}>
                <p className="ps-association__role">{item.role}</p>
                <h3>{item.organization}</h3>
                <p className="ps-association__text">{item.text}</p>
                <ul className="ps-pills" aria-label="Focus areas">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Résumé download to be added once the PDF is available. */}
      <section id="contact" className="ps-section ps-section--dark" aria-labelledby="contact-title">
        <div className="ps-wrap">
          <SectionHead
            id="contact"
            lede="Interested in working together or talking about energy, technology and investment? I’d be glad to hear from you."
          />
          <div className="ps-actions">
            <a className="ps-button" href="https://www.linkedin.com/in/sabrinabedjera/" target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a className="ps-button" href="mailto:sabrinabedjera@gmail.com">
              Email: sabrinabedjera@gmail.com
            </a>
          </div>
          <div className="ps-footer">
            <p>© 2026 Sabrina Bedjera</p>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </section>
    </div>
  )
}
