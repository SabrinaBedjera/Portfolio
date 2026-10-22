import "./portfolio-sections.css"

/* ------------------------------------------------------------------
   Portfolio sections after Selected Work: Additional Work, Lab,
   Experience, Education, About and Contact. Content restored from experiment/photo-desk.
   Section ids match the homepage hotspots and navigation.
------------------------------------------------------------------- */

const additionalWork = [
  {
    title: "Water Treatment & Environmental Research",
    text: "Master’s research modelling micropollutant degradation during drinking water ozonation. Awarded the American Water Works Association first-place Master’s Academic Achievement Award.",
  },
  {
    title: "Water Security & Climate Adaptation",
    text: "Engineering and policy research with the University of Waterloo’s forWater Network, including a climate adaptation assessment framework.",
  },
  {
    title: "Intellectual Property, AI & Emerging Technology",
    text: "Technical and policy analysis on intellectual property, artificial intelligence and climate-related technologies, including development of performance indicators and organization of NRCan’s inaugural IP conference.",
  },
  {
    title: "Research Data & Visualization",
    text: "Led data management and qualitative analysis work at Ontario Tech University using NVivo and structured research datasets.",
  },
]

/* Career overview shown above the roles: one milestone per role, oldest first. */
const careerMilestones = [
  { year: "2015", label: "Research & Data" },
  { year: "2019", label: "Water Security" },
  { year: "2020", label: "IP & Emerging Technology" },
  { year: "2022", label: "Carbon Management" },
  { year: "2022–Present", label: "Critical Minerals & Clean Energy" },
]

type Role = { when: string; organization: string; unit: string; text: string }

const currentRole: Role = {
  when: "Nov 2022 – Present",
  organization: "Natural Resources Canada",
  unit: "Critical Minerals Centre of Excellence",
  text: "Lead the assessment and advancement of critical minerals and clean energy projects, including technical and commercial due diligence, funding negotiations, and agreement development. Work across engineering, financial, economic and legal teams to evaluate project viability and support commercialization.",
}

const earlierNrcanRoles: Role[] = [
  {
    when: "Jan 2022 – Nov 2022",
    organization: "Natural Resources Canada",
    unit: "Carbon Capture Division",
    text: "Advanced carbon management policy and strategy, including Canada’s Carbon Management Strategy and International Energy Agency CCUS publications.",
  },
  {
    when: "Oct 2020 – Jan 2022",
    organization: "Natural Resources Canada",
    unit: "Intellectual Property Division",
    text: "Analyzed intellectual property, AI and emerging technologies, and developed performance indicators.",
  },
]

const researchRoles: Role[] = [
  {
    when: "Feb 2019 – Jul 2020",
    organization: "University of Waterloo",
    unit: "forWater Network",
    text: "Conducted engineering and policy research on water security, including development of a climate adaptation assessment framework.",
  },
  {
    when: "Sep 2015 – Feb 2019",
    organization: "Ontario Tech University",
    unit: "Data Management Lead",
    text: "Led research data management and qualitative analysis using NVivo.",
  },
]

const education = [
  { degree: "MASc, Civil and Environmental Engineering", detail: "Water specialization · University of Waterloo" },
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

function SectionHead({ id, number, title, lede }: { id: string; number?: string; title: string; lede?: string }) {
  return (
    <header className="ps-head">
      <p className="ps-number">{number ?? "\u00a0"}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      {lede && <p className="ps-lede">{lede}</p>}
    </header>
  )
}

export default function PortfolioSections() {
  return (
    <div className="ps">
      <section id="additional-work" className="ps-section" aria-labelledby="additional-work-title">
        <div className="ps-wrap">
          {/* Unnumbered: the numbers match the six exhibits on the homepage. */}
          <SectionHead id="additional-work" title="Additional Work" />
          <div className="ps-cards">
            {additionalWork.map((project) => (
              <article className="ps-card" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lab projects to be added. */}
      <section id="lab" className="ps-section ps-section--tint" aria-labelledby="lab-title">
        <div className="ps-wrap">
          <SectionHead id="lab" number="02" title="Lab" lede="Technical and creative projects" />
        </div>
      </section>

      <section id="experience" className="ps-section" aria-labelledby="experience-title">
        <div className="ps-wrap">
          <SectionHead id="experience" number="03" title="Professional experience" />
          <ol className="ps-career" aria-label="Career overview, 2015 to present">
            {careerMilestones.map((milestone, i) => (
              <li className={i === careerMilestones.length - 1 ? "is-current" : undefined} key={milestone.label}>
                <span className="ps-career__year">{milestone.year}</span>
                <span className="ps-career__label">{milestone.label}</span>
              </li>
            ))}
          </ol>

          <article className="ps-role ps-role--current">
            <div>
              <p className="ps-when">{currentRole.when}</p>
              <p className="ps-role__org">{currentRole.organization}</p>
            </div>
            <div>
              <h3>{currentRole.unit}</h3>
              <p>{currentRole.text}</p>
            </div>
          </article>

          {[earlierNrcanRoles, researchRoles].map((roles, i) => (
            <div className={`ps-roles${i === 1 ? " ps-roles--compact" : ""}`} key={i}>
              {roles.map((role) => (
                <article className="ps-role" key={role.when}>
                  <p className="ps-when">{role.when}</p>
                  <h3>{role.organization}</h3>
                  <p className="ps-where">{role.unit}</p>
                  <p>{role.text}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="ps-section ps-section--tint" aria-labelledby="education-title">
        <div className="ps-wrap ps-two">
          <div>
            <SectionHead id="education" number="04" title="Education" />
            <ul className="ps-education">
              {education.map((item) => (
                <li key={item.degree}>
                  <h3>{item.degree}</h3>
                  <p>{item.detail}</p>
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

      <section id="about" className="ps-section" aria-labelledby="about-title">
        <div className="ps-wrap ps-about">
          {/* Temporary photo from the earlier portfolio version. */}
          <figure className="ps-about__photo">
            <img src="/about-portrait.jpg" alt="Sabrina Bedjera" width="800" height="800" />
          </figure>
          <div>
            <SectionHead id="about" number="05" title="About" />
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

      {/* Résumé download to be added once the PDF is available. */}
      <section id="contact" className="ps-section ps-section--dark" aria-labelledby="contact-title">
        <div className="ps-wrap">
          <SectionHead
            id="contact"
            number="06"
            title="Contact"
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
