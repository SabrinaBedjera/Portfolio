/* Google Analytics 4, loaded only after the visitor opts in.

   Nothing from Google loads until "Accept" is chosen in the consent
   banner (Consent Mode "basic"): no gtag.js, no cookies, no cookieless
   pings. The choice is kept in localStorage, which is strictly necessary
   to remember it and so needs no consent of its own.

   Keep this the only Google tag on the site: leave
   `analytics.googleAnalyticsId` unset in .figma/make/site.json, because
   the Figma Make plugin would add a second, consent-less tag. */

export const MEASUREMENT_ID = "G-941S7NY2SD"

const STORAGE_KEY = "sb-analytics-consent"
// bump to ask everyone again, e.g. if what is collected changes
const CONSENT_VERSION = 1
// ask again after 13 months, the longest a choice should be relied on
const CONSENT_MAX_AGE_MS = 395 * 24 * 60 * 60 * 1000

export const OPEN_CONSENT_EVENT = "sb:open-consent-settings"

export type ConsentChoice = "granted" | "denied"

type StoredConsent = { choice: ConsentChoice; version: number; at: number }

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
  interface Navigator {
    globalPrivacyControl?: boolean
  }
}

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw) as StoredConsent
    if (stored.version !== CONSENT_VERSION) return null
    if (Date.now() - stored.at > CONSENT_MAX_AGE_MS) return null
    return stored.choice === "granted" || stored.choice === "denied" ? stored.choice : null
  } catch {
    return null
  }
}

function storeConsent(choice: ConsentChoice) {
  try {
    const stored: StoredConsent = { choice, version: CONSENT_VERSION, at: Date.now() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    // storage blocked: the choice holds for this visit only
  }
}

/* Global Privacy Control is a browser-level opt-out; with no choice made
   on this site it counts as "Decline" and the banner is not shown. */
export const hasGlobalPrivacyControl = () => navigator.globalPrivacyControl === true

// set once gtag.js has been added; it cannot be unloaded without a reload
let tagAdded = false

const setGaDisabled = (disabled: boolean) => {
  // Google's documented switch that stops gtag.js sending anything
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${MEASUREMENT_ID}`] = disabled
}

function startGoogleTag() {
  setGaDisabled(false)
  if (tagAdded) {
    // accepted again after declining in the same visit
    window.gtag?.("consent", "update", { analytics_storage: "granted" })
    return
  }
  tagAdded = true
  // never add a second copy of the tag
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }

  // advertising stays off for everyone; only analytics is granted
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  })
  window.gtag("consent", "update", { analytics_storage: "granted" })
  window.gtag("js", new Date())
  window.gtag("config", MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    // cookies last 13 months instead of GA's default 2 years
    cookie_expires: 395 * 24 * 60 * 60,
  })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)
}

function stopGoogleTag() {
  if (tagAdded) {
    window.gtag?.("consent", "update", { analytics_storage: "denied" })
    setGaDisabled(true)
  }
  deleteAnalyticsCookies()
}

function deleteAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
  const host = window.location.hostname
  // GA sets its cookies on the top-level domain, e.g. .sabrinabedjera.com
  const domains = ["", host, `.${host.replace(/^www\./, "")}`]
  for (const name of names) {
    for (const domain of domains) {
      document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` + (domain ? `; domain=${domain}` : "")
    }
  }
}

export function setConsent(choice: ConsentChoice) {
  storeConsent(choice)
  if (choice === "granted") startGoogleTag()
  else stopGoogleTag()
}

/** Starts analytics on page load when the visitor accepted earlier. */
export function applyStoredConsent() {
  if (readConsent() === "granted") startGoogleTag()
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
