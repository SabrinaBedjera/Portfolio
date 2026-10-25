import { useEffect, type CSSProperties, type ReactNode } from "react"
import "./case-study.css"
import "./lab.css"
import type { LabPost } from "./lab"

/** Paragraph text with [links](https://…) and `code` turned into elements. */
function richText(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link)
      return (
        <a href={link[2]} target="_blank" rel="noreferrer" key={i}>
          {link[1]}
        </a>
      )
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>
    return part
  })
}

/**
 * A Lab article: the case studies' top bar, type scale and reading column,
 * in the homepage's plum, with photo placeholders until images are added.
 */
export default function LabArticle({ post, onBack }: { post: LabPost; onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post])

  // keep draft articles out of search results until they are approved
  useEffect(() => {
    if (!post.draft) return
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex"
    document.head.appendChild(meta)
    return () => meta.remove()
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
                <p key={i}>{richText(block.text)}</p>
              ) : block.type === "image" ? (
                post.image && (
                  <figure className="lab-article__image" key={i}>
                    <img src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} />
                  </figure>
                )
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
