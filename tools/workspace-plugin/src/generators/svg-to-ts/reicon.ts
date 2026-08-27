/**
 * Reicon publishes no SVG files: its icons are path fragments in two JSON files,
 * which have to be wrapped in an svg before the generator can optimize them.
 */
const REF = '974cf2445404d6d59531336c9c8e74f74c0701aa';

type Weight = 'Outline' | 'Filled';

interface IconData {
  categories: Record<
    string,
    { icons: Record<string, { weights: Partial<Record<Weight, Icon>> }> }
  >;
}

interface DuotoneData {
  icons: Record<string, Icon>;
}

interface Icon {
  code: string;
}

// icon-data.json is 9MB and holds both weights, so fetch it once for the two.
const files = new Map<string, Promise<unknown>>();

function data<T>(file: string): Promise<T> {
  if (!files.has(file)) {
    files.set(
      file,
      fetch(
        `https://raw.githubusercontent.com/dqev/reicon/${REF}/data/${file}`,
      ).then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch reicon ${file}: ${response.status}`);
        }
        return response.json();
      }),
    );
  }

  return files.get(file) as Promise<T>;
}

function toSvg(code: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${code}</svg>`;
}

export async function reiconIcons(
  weight: Weight,
): Promise<Record<string, string>> {
  const { categories } = await data<IconData>('icon-data.json');
  const icons: Record<string, string> = {};

  for (const category of Object.values(categories)) {
    for (const [name, icon] of Object.entries(category.icons)) {
      // Not every icon is drawn in every weight.
      const code = icon.weights[weight]?.code;

      if (code) {
        icons[name] = toSvg(code);
      }
    }
  }

  return icons;
}

export async function reiconDuotoneIcons(): Promise<Record<string, string>> {
  const { icons } = await data<DuotoneData>('icon-duotone.json');

  return Object.fromEntries(
    Object.entries(icons).map(([name, { code }]) => [name, toSvg(code)]),
  );
}
