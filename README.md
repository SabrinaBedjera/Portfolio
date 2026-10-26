# Sabrina Bedjera — Portfolio

The source for my personal website, **[sabrinabedjera.com](https://sabrinabedjera.com)**.

The site is an interactive portfolio about my work across technology, strategy and investment. The homepage is laid out like a desk of objects, each one leading to a part of my story: my experience, case studies from past projects, and short articles in the Lab.

## Built with

- [React](https://react.dev) and [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for local development and builds
- Custom CSS for the layout and styling
- [Figma Make](https://www.figma.com/make/), used to design and generate the first version of the site
- GitHub Actions and GitHub Pages for deployment

## Running it locally

You'll need Node.js 22.

```bash
npm install
npm run dev      # start a local dev server
npm run build    # build the site into dist/
```

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages (see `.github/workflows/deploy-pages.yml`). More detail is in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

The `sabrina-portfolio-v1/` folder holds an earlier static version of the site. It is kept for reference and isn't part of the current build.
