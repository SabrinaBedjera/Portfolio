import { useEffect, useRef, useState } from "react"
import {
  OPEN_CONSENT_EVENT,
  applyStoredConsent,
  hasGlobalPrivacyControl,
  readConsent,
  setConsent,
  type ConsentChoice,
} from "./analytics"
import "./consent-banner.css"

/* Asks once before any analytics load. Shown again from "Cookie settings"
   in the footer, or by linking to /#cookie-settings (the privacy notice
   does). Decline and Accept carry equal weight, and the page stays usable
   while the banner is open. */
export default function ConsentBanner() {
  const [open, setOpen] = useState(
    () =>
      readConsent() === null &&
      (!hasGlobalPrivacyControl() || window.location.hash === "#cookie-settings"),
  )
  const panelRef = useRef<HTMLElement>(null)
  const focusOnOpen = useRef(false)

  useEffect(() => {
    applyStoredConsent()

    const show = () => {
      focusOnOpen.current = true
      setOpen(true)
    }
    const showFromHash = () => {
      if (window.location.hash !== "#cookie-settings") return
      // drop the hash so it is not left in the address or the analytics
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
      show()
    }
    showFromHash()
    window.addEventListener(OPEN_CONSENT_EVENT, show)
    window.addEventListener("hashchange", showFromHash)
    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, show)
      window.removeEventListener("hashchange", showFromHash)
    }
  }, [])

  useEffect(() => {
    if (open && focusOnOpen.current) panelRef.current?.focus()
    focusOnOpen.current = false
  }, [open])

  if (!open) return null

  const choose = (choice: ConsentChoice) => {
    setConsent(choice)
    setOpen(false)
  }
  const current = readConsent()

  return (
    <section
      ref={panelRef}
      className="consent-banner"
      role="region"
      aria-labelledby="consent-banner-title"
      tabIndex={-1}
    >
      <h2 id="consent-banner-title">May I count your visit?</h2>
      <p>
        With your permission, I use Google Analytics to see which pages are read, how far, and
        which links are followed. It sets cookies and shares this usage data with Google. Nothing
        loads unless you accept, and you can change your mind any time.{" "}
        <a href="/privacy.html">Privacy notice</a>
      </p>
      {current && (
        <p className="consent-banner__current">
          Currently: {current === "granted" ? "accepted" : "declined"}.
        </p>
      )}
      <div className="consent-banner__actions">
        <button type="button" onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </section>
  )
}
