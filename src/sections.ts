/* ------------------------------------------------------------------
   The page's sections, in reading order. The top navigation, the section
   headings and the homepage object captions all read their labels from
   here, so renaming a section updates every place it appears.
   `number` matches the six objects on the homepage; Associations &
   Volunteering has no object and no number.
------------------------------------------------------------------- */

export type SectionId =
  | "selected-work"
  | "experience"
  | "education"
  | "associations"
  | "lab"
  | "about"
  | "contact"

export type Section = {
  id: SectionId
  /** Used for the navigation link and the section heading. */
  label: string
  number?: string
  /** Shorter caption for the homepage object, where space is tight. */
  caption?: string
}

export const sections: Section[] = [
  { id: "selected-work", label: "Selected Work", number: "01" },
  { id: "experience", label: "Professional Experience", number: "02", caption: "Experience" },
  { id: "education", label: "Education", number: "03" },
  { id: "associations", label: "Associations & Volunteering" },
  { id: "lab", label: "Lab", number: "04" },
  { id: "about", label: "About", number: "05" },
  { id: "contact", label: "Contact", number: "06" },
]

export const section = (id: SectionId) => sections.find((s) => s.id === id)!
