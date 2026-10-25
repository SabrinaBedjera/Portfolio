# Launching sabrinabedjera.com on GitHub Pages

Status: **prepared, not launched.** Nothing below runs until it is approved.

## How the site is built and served

- The site is a Vite + React app. It needs a build (`npm run build`, Node 22),
  which writes the static site to `dist/`.
- `.github/workflows/deploy-pages.yml` builds and publishes `dist/` with
  GitHub Pages. It runs only on pushes to `main` or when started by hand.
- Routing uses `#` addresses (`#experience`, `#case-study/…`, `#lab/…`), so
  every page works from the domain root with no server rules or 404 page.
- Assets use root paths (`/home-objects/…`), which suits a custom domain at
  the root. (The raw.githack preview is built separately with relative paths.)

## Before launch (code)

1. Allow search engines: in `.figma/make/site.json`, set
   `"robots": { "index": true }` (it is `false` while the site is a preview).
2. Remove `draft: true` from Lab posts that are approved (`src/lab.ts`).
3. Bring the work into `main`. `main` currently holds only the earlier static
   site (`sabrina-portfolio-v1/`) and shares no history with this branch, so:
   - create a `launch` branch from `feature/curiosity-homepage`;
   - merge `main` into it with `--allow-unrelated-histories` (keeps the old
     folder in the repository, unused by the build; it can be deleted later);
   - open a pull request `launch` → `main` and merge it. The merge triggers
     the deployment workflow.
   (A full backup of the old `main` also exists at `backup/2026-10-21/main`.)

## GitHub settings (once)

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Optional but recommended: verify the domain for your account, so no one
   else can claim it: profile Settings → Pages → Add a domain →
   `sabrinabedjera.com`. GitHub shows a TXT record to add at Porkbun.
3. After DNS is in place: Settings → Pages → Custom domain →
   `sabrinabedjera.com` → Save. Wait for the DNS check, then tick
   **Enforce HTTPS** (the certificate can take up to about an hour).

## Porkbun DNS for sabrinabedjera.com

First delete Porkbun's default records for the domain (the parking ALIAS on
the root and the `*` CNAME), since extra records on the root block the HTTPS
certificate.

| Type  | Host (Porkbun "Host") | Answer / value            | TTL |
|-------|-----------------------|---------------------------|-----|
| A     | *(blank = root)*      | `185.199.108.153`         | 600 |
| A     | *(blank)*             | `185.199.109.153`         | 600 |
| A     | *(blank)*             | `185.199.110.153`         | 600 |
| A     | *(blank)*             | `185.199.111.153`         | 600 |
| AAAA  | *(blank)*             | `2606:50c0:8000::153`     | 600 |
| AAAA  | *(blank)*             | `2606:50c0:8001::153`     | 600 |
| AAAA  | *(blank)*             | `2606:50c0:8002::153`     | 600 |
| AAAA  | *(blank)*             | `2606:50c0:8003::153`     | 600 |
| CNAME | `www`                 | `sabrinabedjera.github.io`| 600 |
| TXT   | *(as shown by GitHub)*| *(verification value)*    | 600 |

With the root and `www` both set, GitHub redirects `www.sabrinabedjera.com`
to `https://sabrinabedjera.com`. The `www` CNAME points to
`sabrinabedjera.github.io` only, without the repository name.

## sabrinabedjera.ca → sabrinabedjera.com

GitHub Pages serves one domain per site, so the redirect is done at Porkbun
with URL Forwarding (free; supports HTTPS):

1. Domain Management → sabrinabedjera.ca → Details → URL Forwarding → Edit.
2. Delete Porkbun's default DNS records for the .ca first if the screen
   reports a conflict.
3. Hostname: *blank*; forward to `https://sabrinabedjera.com`.
4. Toggle advanced settings → choose **Permanent (301)** (the default is a
   temporary redirect); enable "include the requested path"; tick
   **wildcard** so `www.sabrinabedjera.ca` is forwarded too.
5. Test `http://` and `https://`, with and without `www`, once the .com is
   confirmed working.

## Search engines

- `public/robots.txt` allows all crawlers and is copied to the site root.
  If `.figma/make/site.json` is set back to `"robots": { "index": false }`,
  the build replaces it with a blocking robots.txt and adds a noindex tag.
- Draft Lab articles add their own noindex tag while they are open.
- Google caches robots.txt for up to 24 hours. After changing it, open
  Search Console → Settings → robots.txt → Request a recrawl, then run the
  URL Inspection live test again.

## Launch checks

- `https://sabrinabedjera.com` and `https://www.sabrinabedjera.com` load
  (www redirects to the root) with a valid certificate.
- `sabrinabedjera.ca` and `www.sabrinabedjera.ca` redirect with a 301.
- Every navigation link, homepage object, case study, Lab article, image
  and download loads; test on desktop and a phone.
