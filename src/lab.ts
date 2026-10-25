/* ------------------------------------------------------------------
   The Lab: short articles about things I make and experiment with.
   Each post appears on the Lab index (PortfolioSections) and opens at
   #lab/<slug> (LabArticle). Add a post by adding an entry here.
   `draft: true` shows a "Draft" label on the card and the article;
   remove it once the post is approved for launch.
------------------------------------------------------------------- */

export type LabBlock =
  | { type: "p"; text: string }
  /** A photograph still to be supplied: shown as a labelled placeholder. */
  | { type: "photo"; label: string }

export type LabPost = {
  slug: string
  title: string
  subtitle: string
  draft?: boolean
  sections: { heading: string; blocks: LabBlock[] }[]
}

export const labPosts: LabPost[] = [
  {
    slug: "beyond-the-business-card",
    title: "Beyond the Business Card",
    subtitle: "An experiment with NFC, QR codes and making networking a little more interesting.",
    draft: true,
    sections: [
      {
        heading: "Why I wanted to try it",
        blocks: [
          {
            type: "p",
            text: "Before a recent conference, I started thinking about how I’d share my contact information. Paper business cards work, but they’re easy to lose and rarely lead anywhere. I wanted something more convenient, and honestly, a bit more interesting.",
          },
          {
            type: "p",
            text: "I’d been curious about NFC, the same technology that lets you tap your phone to pay. It turns out you can buy small programmable tags and set them up yourself, so I decided to try making my own.",
          },
        ],
      },
      {
        heading: "Building and testing the prototype",
        blocks: [
          {
            type: "p",
            text: "I tried a few formats: NTAG213 stickers and NTAG215 cards. To program them, I used the NFC Tools app on my iPhone, which made it easy to write a link to a tag and test it straight away.",
          },
          {
            type: "p",
            text: "Not everyone knows to tap their phone on something, so I also made QR codes in Canva and had printed versions produced at Staples. That way there was always a second option.",
          },
          { type: "photo", label: "Photo to add: the NFC stickers, NFC cards and printed QR codes" },
          {
            type: "p",
            text: "Then came the fun part: deciding where the tags should go. I tried a sticker on my phone and another on my notebook. The phone worked well. The notebook was less cooperative. Its cover was thick enough that the tag didn’t always read, so I adjusted the placement and added another sticker.",
          },
          { type: "photo", label: "Photo to add: the tags on the phone and the notebook" },
        ],
      },
      {
        heading: "Taking it to a conference",
        blocks: [
          {
            type: "p",
            text: "I brought the finished setup to the conference and actually used it. When someone wanted to connect, they could scan a QR code or tap their phone on one of the tags.",
          },
          { type: "photo", label: "Photo to add: the setup at the conference" },
        ],
      },
      {
        heading: "What worked (and what didn’t)",
        blocks: [
          {
            type: "p",
            text: "The QR codes were used far more often than NFC. I think that’s because people immediately understood what to do with them. Scanning a QR code is second nature now; tapping a notebook with your phone is not.",
          },
          {
            type: "p",
            text: "NFC still earned its place. It was a fun conversation starter, and people were curious about how it worked. I also received positive feedback on the setup as a whole.",
          },
          {
            type: "p",
            text: "One conversation stuck with me: someone I met didn’t use LinkedIn. It was a good reminder that one link doesn’t suit everyone, and that it helps to offer a few different ways to connect.",
          },
        ],
      },
      {
        heading: "The next iteration",
        blocks: [
          {
            type: "p",
            text: "For the next version, the tags and QR codes will point to a /connect page on this website, where people can choose LinkedIn, email, or a closer look at my work.",
          },
          {
            type: "p",
            text: "It’s a small change, but it solves the biggest gap I found. And if I want to change what people see, I can update the page instead of reprogramming the tags.",
          },
        ],
      },
    ],
  },
]
