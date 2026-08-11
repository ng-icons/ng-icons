/**
 * The shape of a documentation page and the grouping the sidebar needs.
 *
 * Kept free of Angular and Analog imports so it can be unit tested directly;
 * `docs-nav.ts` adds the injection wrapper that reads the markdown files.
 */

export interface DocAttributes {
  title: string;
  section: string;
  lead: string;
  /** Position in the reading order, which also drives prev/next. */
  order: number;
}

export interface DocPage extends DocAttributes {
  slug: string;
}

export interface DocSection {
  label: string;
  pages: DocPage[];
}

/** Group pages into the sidebar's sections, preserving reading order. */
export function toSections(pages: DocPage[]): DocSection[] {
  const sections: DocSection[] = [];
  for (const page of pages) {
    let section = sections.find(candidate => candidate.label === page.section);
    if (!section) {
      section = { label: page.section, pages: [] };
      sections.push(section);
    }
    section.pages.push(page);
  }
  return sections;
}
