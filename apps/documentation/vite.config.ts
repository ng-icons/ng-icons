/// <reference types="vitest" />
import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import tailwind from '@tailwindcss/vite';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vite';
import { iconData } from './tools/icon-data-plugin';
import { postPrerender } from './tools/post-prerender';

const appRoot = __dirname;
const workspaceRoot = join(appRoot, '../..');

/** Where Analog writes the prerendered site, and what the deploy publishes. */
const prerenderDir = join(
  workspaceRoot,
  'dist/apps/documentation/analog/public',
);

/**
 * Every markdown page, so each docs route is prerendered to its own HTML.
 *
 * The markdown lives in `src/content/reference` rather than `src/content/docs`
 * because Analog also generates a bare route per content file from its path,
 * and a `docs` directory would shadow the `/docs/:slug` page and its layout.
 */
const docsRoutes = () =>
  readdirSync(join(appRoot, 'src/content/reference'))
    .filter(file => file.endsWith('.md'))
    .map(file => `/docs/${file.replace(/\.md$/, '')}`);

/**
 * Every page written out as static HTML.
 *
 * `/docs` is listed even though it only redirects to the introduction: the
 * header links to it, and without an index.html of its own GitHub Pages answers
 * that link with its 404 page. `/404` is the catch-all route, copied to
 * `404.html` after the prerender.
 */
const prerenderRoutes = () => [
  '/',
  '/browse',
  '/iconsets',
  '/docs',
  '/404',
  ...docsRoutes(),
];

export default defineConfig(({ command }) => ({
  root: appRoot,
  cacheDir: '../../node_modules/.vite/documentation',
  publicDir: 'src/public',
  // GitHub Pages serves this repo's site from a subdirectory, so a built page
  // asking for `/assets/…` gets the org root and 404s. Everything that needs a
  // URL reads `import.meta.env.BASE_URL` (see `shared/asset-url.ts` and the
  // APP_BASE_HREF provider), which this sets. Left at the root in dev so the
  // dev server stays reachable at `/`.
  base: command === 'build' ? '/ng-icons/' : '/',
  build: {
    outDir: '../../dist/apps/documentation/client',
    emptyOutDir: true,
    target: 'es2022',
  },
  server: {
    // Vite rejects requests with an unrecognised Host header, so allow the
    // random subdomain a Cloudflare quick tunnel hands out when sharing the
    // dev server (`cloudflared tunnel --url http://localhost:4201`).
    allowedHosts: ['.trycloudflare.com'],
  },
  // The icon packages resolve through the workspace's TypeScript paths rather
  // than node_modules, so the prerender build has to bundle them in instead of
  // leaving them as bare imports Node cannot resolve.
  ssr: { noExternal: [/^@ng-icons\//] },
  environments: { ssr: { resolve: { noExternal: [/^@ng-icons\//] } } },
  plugins: [
    iconData(workspaceRoot, appRoot),
    analog({
      static: true,
      content: {
        highlighter: 'shiki',
        shikiOptions: {
          highlighter: { additionalLangs: ['bash'] },
          // Emit both themes as CSS variables so the theme toggle switches
          // highlighting without re-rendering the markdown.
          highlight: {
            themes: { light: 'github-light', dark: 'github-dark' },
            defaultColor: false,
          },
        },
      },
      nitro: {
        hooks: {
          // The first point at which every page has been written. Analog has no
          // hook of its own for this, and a vite `closeBundle` runs before the
          // prerender rather than after it.
          'prerender:done': ({
            failedRoutes,
          }: {
            failedRoutes: Set<string>;
          }) => {
            if (failedRoutes.size > 0) {
              throw new Error(
                `Failed to prerender: ${[...failedRoutes].join(', ')}`,
              );
            }
            postPrerender(prerenderDir, prerenderRoutes());
          },
        },
      },
      prerender: {
        routes: async () => prerenderRoutes(),
        sitemap: { host: 'https://ng-icons.github.io/ng-icons/' },
      },
    }),
    tailwind(),
    nxViteTsPaths(),
  ],
  test: {
    name: 'documentation',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tools}/**/*.spec.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/documentation',
      provider: 'v8' as const,
    },
  },
}));
