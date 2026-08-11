import { injectContentFiles } from '@analogjs/content';
import type { DocAttributes, DocPage } from './doc-page';

export { toSections } from './doc-page';
export type { DocAttributes, DocPage, DocSection } from './doc-page';

/**
 * Every docs page in reading order, from the markdown frontmatter.
 *
 * The slug is the markdown filename. Avoid naming a file `content-*.md`:
 * @analogjs/content normalises its file keys with a greedy match on `/content`,
 * so such a page resolves to nothing and renders blank. `docs-nav.spec.ts`
 * guards against it.
 */
export function injectDocs(): DocPage[] {
  return injectContentFiles<DocAttributes>(file =>
    file.filename.includes('/content/reference/'),
  )
    .map(file => ({ ...file.attributes, slug: file.slug }))
    .sort((a, b) => a.order - b.order);
}
