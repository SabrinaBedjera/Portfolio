/* ------------------------------------------------------------------
   The Lab: short articles about things I make and experiment with.
   Each post appears on the Lab index (PortfolioSections) and opens at
   #lab/<slug> (LabArticle). Add a post by adding an entry here.
   Paragraph text may contain [link text](https://…) and `code`.
   `draft: true` shows a "Draft" label on the card and the article and
   keeps the article out of search results; remove it once approved.
------------------------------------------------------------------- */

export type LabBlock =
  | { type: "p"; text: string }
  /** The post's image (see `image`), shown at this point in the article. */
  | { type: "image" }
  /** A photograph still to be supplied: shown as a labelled placeholder. */
  | { type: "photo"; label: string }

export type LabPost = {
  slug: string
  title: string
  subtitle: string
  draft?: boolean
  /** The index thumbnail; also placed in the article by an "image" block. */
  image?: { src: string; alt: string; width: number; height: number }
  sections: { heading: string; blocks: LabBlock[] }[]
}

export const labPosts: LabPost[] = [
  {
    slug: "beyond-the-business-card",
    title: "Beyond the Business Card",
    subtitle: "An experiment with NFC, QR codes and making networking a little more interesting.",
    image: {
      src: "/lab/beyond-the-business-card.webp",
      alt: "A hand holding a clear NFC business card printed with Sabrina Bedjera’s photo and a LinkedIn QR code, in front of a brown leather notebook with a matching QR code sticker and a round NFC tag, beside an NFC symbol and a QR code",
      width: 1376,
      height: 1320,
    },
    sections: [
      {
        heading: "Why I wanted to try it",
        blocks: [
          {
            type: "p",
            text: "Every time I go to a conference, I find myself buried in my bag trying to find my business cards, which inevitably get mixed up with the cards I've collected from other people. And I always seem to run out...",
          },
          {
            type: "p",
            text: "I wanted to try a more environmentally friendly and interactive way to share my information at conferences and business events. Something that might even serve as an icebreaker, because sometimes it can be awkward to strike up a natural conversation with people at conferences.",
          },
        ],
      },
      {
        heading: "Building and testing the prototype",
        blocks: [
          {
            type: "p",
            text: "I've seen people using NFC tags to make everyday tasks a little easier, from sharing contact information to tapping a phone to open a website. I recently learned that it's the same technology used for contactless payments, and I desperately wanted an excuse to incorporate it into my life. Business cards seemed like the perfect opportunity to experiment.",
          },
          {
            type: "p",
            text: "I discovered that you can buy small programmable [NFC stickers](https://www.amazon.ca/dp/B0GQ321GWS), as well as reusable [plastic business cards with NFC tags](https://www.amazon.ca/dp/B09WHTCW89) already embedded. I decided to try both. The stickers offered more flexibility because I could put them on different objects, while the card gave me something familiar to hand to people. Using the NFC Tools app on my iPhone, I programmed the tags to open my LinkedIn profile. It was pretty easy to write a link to a tag and test it immediately.",
          },
          {
            type: "p",
            text: "I was also concerned that not everyone would be familiar or comfortable with NFC, so I created QR codes in Canva that also linked to my LinkedIn profile, and had printed versions made at Staples. A little tip if you're trying this yourself, give the printed stickers a day to set, otherwise they might rip when you peel them off!",
          },
          {
            type: "p",
            text: "Then I had to decide where the NFC tags and QR codes should go so I would actually use them. I kept the NFC business card in my card holder and added an NFC sticker and QR code to my notebook.",
          },
          { type: "image" },
        ],
      },
      {
        heading: "Taking it to a conference",
        blocks: [
          {
            type: "p",
            text: "I decided to test the setup at my next conference, and this genuinely got me even more excited to go! When someone wanted to connect, they could scan a QR code or tap their phone on one of the NFC tags.",
          },
          {
            type: "p",
            text: "What surprised me was that I used my notebook far more than my NFC business card. Which makes a lot of sense. My notebook was constantly out because I was taking notes, while my business card was tucked away in its holder.",
          },
          {
            type: "p",
            text: "QR codes were also much more popular than NFC. I think their visibility and familiarity made a difference. People immediately recognized a QR code and knew what to do with it, while an NFC sticker on a notebook was less obvious. People were a little hesitant to tap their phones on my notebook, and those who did thought it was like magic, which was pretty fun! NFC turned out to be a great conversation starter, and people were curious about how it worked.",
          },
          {
            type: "p",
            text: "After all of this, my paper business cards actually came in handy! I met someone who preferred not to use digital tools, so they were the only person I gave a paper card to. Another person I met didn't use LinkedIn, which highlighted a different limitation. Even if someone can easily scan or tap an NFC tag or QR code, the destination still needs to be useful to them.",
          },
          {
            type: "p",
            text: "The biggest lesson? Giving people options works better than expecting everyone to connect the same way.",
          },
        ],
      },
      {
        heading: "The next iteration",
        blocks: [
          {
            type: "p",
            text: "For the next version, I'd like the NFC tags and QR codes to point to a `/connect` page on this website, where people can choose LinkedIn, email or a closer look at my work.",
          },
          {
            type: "p",
            text: "It's a small change, but it addresses one of the biggest limitations I found. And if I want to change what people see, I can update the page without reprogramming every tag.",
          },
          {
            type: "p",
            text: "Even though QR codes emerged as the winner, I still want to see what other projects I can come up with using NFC!",
          },
        ],
      },
    ],
  },
]
