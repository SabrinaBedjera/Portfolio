import { useEffect, type CSSProperties } from "react"
import "./case-study.css"
import "./lab.css"
import type { LabPost } from "./lab"

/**
 * A Lab article: the case studies' top bar, type scale and reading column,
 * in the homepage's plum, with photo placeholders until images are added.
 */
export default function LabArticle({ post, onBack }: { post: LabPost; onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post])

  return (
    <main className="cs lab-article" style={{ "--cs-accent": "#5b2d48" } as CSSProperties}>
      <nav className="cs-nav" aria-label="Article navigation">
        <button onClick={onBack}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M19 12H5M10 7l-5 5 5 5" />
          </svg>
          <span>Back to the Lab</span>
        </button>
        <span>The Lab</span>
      </nav>

      <article className="lab-article__body">
        <header className="lab-article__head">
          <p className="cs-kicker">
            The Lab{post.draft && <span className="lab-draft">Draft</span>}
          </p>
          <h1>{post.title}</h1>
          <p className="lab-article__subtitle">{post.subtitle}</p>
        </header>

        {post.sections.map((section) => (
          <section className="lab-article__section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.blocks.map((block, i) =>
              block.type === "p" ? (
                <p key={i}>{block.text}</p>
              ) : (
                <figure className="lab-photo" key={i}>
                  <div className="lab-photo__placeholder" role="img" aria-label={block.label}>
                    <span>Photo placeholder</span>
                  </div>
                  <figcaption>{block.label}</figcaption>
                </figure>
              ),
            )}
          </section>
        ))}
      </article>

      <footer className="cs-footer">
        <p>The Lab</p>
        <button onClick={onBack}>
          <span>Back to the Lab</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow">
            <path d="M5 12h14M14 7l5 5-5 5" />
          </svg>
        </button>
      </footer>
    </main>
  )
}
