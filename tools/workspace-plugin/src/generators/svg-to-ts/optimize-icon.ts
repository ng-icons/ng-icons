/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CustomPlugin, optimize, PluginConfig } from 'svgo';
import { XastElement, XastParent } from 'svgo/lib/types';
import { SvgOptions } from './iconsets';

export async function optimizeIcon(
  svg: string,
  options: SvgOptions = {},
  customPlugins: CustomPlugin[] = [],
): Promise<string> {
  const plugins: PluginConfig[] = [
    {
      name: 'removeComments',
      params: {
        preservePatterns: false,
      },
    },
    {
      name: 'inlineStyles',
      params: {
        onlyMatchedOnce: false,
      },
    },
    {
      name: 'idPlaceholder',
      type: 'visitor',
      description: 'Replace id with placeholder',
      params: {},
      fn: function () {
        const idMap = new Map<string, string>();

        return {
          element: {
            enter: node => {
              if (node.name !== 'svg') {
                return;
              }

              function replaceIds(node: XastElement) {
                // if there is an id attribute replace it with a placeholder
                if (node.attributes.id) {
                  const id = node.attributes.id;
                  const placeholder = `ID_PLACEHOLDER_${idMap.size}`;
                  idMap.set(id, placeholder);
                  node.attributes.id = placeholder;
                }

                // if there are any children visit them
                if (node.children) {
                  node.children.forEach(child => {
                    if (child.type === 'element') {
                      replaceIds(child);
                    }
                  });
                }
              }

              replaceIds(node);

              // if there are no ids return
              if (idMap.size === 0) {
                return;
              }

              function replaceUsages(node: XastElement) {
                // if there is any attribute that references an id replace it with the placeholder
                Object.keys(node.attributes).forEach(attr => {
                  const value = node.attributes[attr];

                  // if this is a url reference replace the id with the placeholder
                  if (value.includes('url(#')) {
                    const id = value.replace('url(#', '').replace(')', '');
                    if (idMap.has(id)) {
                      node.attributes[attr] = value.replace(id, idMap.get(id)!);
                    }
                  }
                });

                // if there are any children visit them
                if (node.children) {
                  node.children.forEach(child => {
                    if (child.type === 'element') {
                      replaceUsages(child);
                    }
                  });
                }
              }

              replaceUsages(node);
            },
          },
        };
      },
    } as CustomPlugin,
    {
      name: 'insertCssVariables',
      type: 'visitor',
      description: 'Insert CSS variables',
      params: {},
      fn: function () {
        return {
          element: {
            enter: node => {
              if (node.name === 'svg') {
                delete node.attributes['width'];
                delete node.attributes['height'];
              } else {
                // if this is not the svg element remove the stroke property
                if (options?.removeStroke && node.attributes['stroke-width']) {
                  delete node.attributes['stroke'];
                }
              }

              if (options?.strokeCurrentColor) {
                if (node.attributes['stroke']) {
                  node.attributes['stroke'] = 'currentColor';
                }
              }

              if (options?.fillCurrentColor) {
                // if the node is an svg element or has a fill attribute set it to none, skip
                if (node.name === 'svg' || node.attributes['fill'] === 'none') {
                  return;
                }

                if (node.attributes['fill']) {
                  node.attributes['fill'] = 'currentColor';
                }
              }

              if (options?.removeColor) {
                if (node.name === 'svg') {
                  node.attributes['fill'] = 'currentColor';
                } else if (node.attributes['fill']) {
                  delete node.attributes['fill'];
                }

                if (node.attributes['color']) {
                  delete node.attributes['color'];
                }

                if (node.attributes['stroke']) {
                  node.attributes['stroke'] = 'currentColor';
                }

                if (node.attributes['style']) {
                  const style = node.attributes['style']
                    .replace(/fill\s*:.*?(?:;|$)/g, '')
                    .replace(/stroke\s*:.*?(?:;|$)/g, 'stroke:currentColor;')
                    .replace(/color\s*:.*?(?:;|$)/g, '')
                    .trim();
                  if (style.length === 0) {
                    delete node.attributes['style'];
                  } else {
                    node.attributes['style'] = style;
                  }
                }
              }

              if (node.attributes['stroke-width']) {
                const styles = node.attributes['style']
                  ? [node.attributes['style']]
                  : [];

                styles.push(
                  `stroke-width:var(--ng-icon__stroke-width, ${node.attributes['stroke-width']})`,
                );

                node.attributes['style'] = styles.join(';');

                delete node.attributes['stroke-width'];
              }

              // remove any classes
              if (node.attributes['class']) {
                delete node.attributes['class'];
              }

              // tdesign icons have a view-box attribute, which should be viewBox, we should rename it
              if (node.attributes['view-box']) {
                node.attributes['viewBox'] = node.attributes['view-box'];
                delete node.attributes['view-box'];
              }
            },
          },
        };
      },
    } as CustomPlugin,
  ];

  if (options?.colorAttr) {
    plugins.push({
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          {
            [options!.colorAttr]: 'currentColor',
          },
        ],
      },
    });
  }

  if (options?.removeBackground) {
    plugins.push({
      name: 'removeBackground',
      type: 'visitor',
      description: 'Remove faulty material paths',
      params: {},
      fn: function () {
        return {
          element: {
            enter: (node, parentNode) => {
              if (
                (node.name === 'path' &&
                  node.attributes.d === 'M0 0h24v24H0V0z') ||
                node.attributes.d === 'M0 0h512v512H0z'
              ) {
                detachNodeFromParent(node, parentNode);
              }
            },
          },
        };
      },
    } as CustomPlugin);
  }

  const result = optimize(svg, {
    plugins: [...plugins, ...customPlugins],
    // we don't use self closing tags because in the browser they are rendered with closing tags
    // and we perform an optimization where we check if the svg content matched the dom in ssr
    // and if we don't have a match we can't optimize
    js2svg: { useShortTags: false },
  });

  return result.data;
}

export const detachNodeFromParent = (
  node: XastElement,
  parentNode: XastParent,
) => {
  // avoid splice to not break for loops
  parentNode.children = parentNode.children.filter(child => child !== node);
};
