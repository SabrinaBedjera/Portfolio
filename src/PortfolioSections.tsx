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
    text: "Lead the assessment and advancement of critical minerals and clean energy projects, including technical and commercial due diligence, funding negotiations, and agreement development. Work across engineering, financial, economic, and legal teams to evaluate project viability and support commercialization.",
    highlights: [
      "Project ownership",
      "Technical & commercial due diligence",
      "Funding negotiations",
      "Agreement development",
      "Cross-functional project assessment",
      "Commercialization",
    ],
  },
  {
    id: "role-carbon-capture",
    when: "Jan 2022 – Nov 2022",
    organization: "Natural Resources Canada",
    unit: "Carbon Capture Division",
    theme: "Carbon Management",
    text: "Advanced carbon management policy and strategy, including Canada’s Carbon Management Strategy and International Energy Agency CCUS publications.",
    highlights: ["Canada’s Carbon Management Strategy", "IEA CCUS publications", "Carbon capture, utilization & storage"],
  },
  {
    id: "role-intellectual-property",
    when: "Oct 2020 – Jan 2022",
    organization: "Natural Resources Canada",
    unit: "Intellectual Property Division",
    theme: "Intellectual Property, AI & Emerging Technology",
    text: "Analyzed intellectual property, AI, and emerging technologies, and developed performance indicators to assess program effectiveness.",
    highlights: [
      "Climate-related technologies",
      "Performance indicators",
      "Organized NRCan’s inaugural IP conference",
    ],
  },
  {
    id: "role-forwater",
    when: "Feb 2019 – Jul 2020",
    organization: "University of Waterloo",
    unit: "forWater Network",
    theme: "Water Security & Climate Adaptation",
    text: "Conducted engineering and policy research on water security, including the development of a climate adaptation assessment framework.",
    highlights: ["Engineering & policy research", "Climate adaptation assessment framework"],
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
    highlights: ["Research data management", "Qualitative analysis (NVivo)", "Structured research datasets"],
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

const skills = [
  "Technology assessment",
  "Project evaluation",
  "Funding assessment & agreement development",
  "Stakeholder engagement",
  "Strategic analysis",
  "Technical research",
  "Policy analysis",
  "Data analysis & visualization",
  "Qualitative analysis (NVivo)",
]

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
      <nav aria-label="Career overview, 2015 to present">
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
            <p className="ps-role__when">{role.when}</p>
            <div className="ps-role__body">
              <p className="ps-role__org">
                {role.organization} <span aria-hidden="true">·</span> <span className="ps-role__unit">{role.unit}</span>
              </p>
              <h3>{role.theme}</h3>
              <p className="ps-role__text">{role.text}</p>
              <ul className="ps-role__highlights" aria-label="Selected skills and contributions">
                {role.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
        <div className="ps-wrap ps-two">
          <div>
            <SectionHead id="education" />
            <ul className="ps-education">
              {education.map((item) => (
                <li key={item.degree}>
                  <h3>{item.degree}</h3>
                  <p>{item.detail}</p>
                  {item.award && <p className="ps-education__award">{item.award}</p>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <header className="ps-head">
              <p className="ps-number">&nbsp;</p>
              <h2 id="skills-title">Skills</h2>
            </header>
            <ul className="ps-skills" aria-labelledby="skills-title">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
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
              I started in science and mathematics, trained as a teacher, and went on to engineering
              research on drinking water treatment.
            </p>
            <p>
              That path taught me to look closely at how things actually work: the chemistry, the
              data, the people who will use the result. It is also what I bring to my work at Natural
              Resources Canada, where I have moved from intellectual property and emerging technology
              to carbon capture and, now, critical minerals and clean energy investment.
            </p>
            <p>
              The questions I enjoy most sit between disciplines. Is a technology ready? Is the
              market? Does a project fit the bigger strategy, and what would it take to move it
              forward? I like turning complex technical and economic information into something clear
              enough to act on.
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
                <ul className="ps-role__highlights" aria-label="Areas">
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
