import { joinPathFragments, names, Tree } from '@nrwl/devkit';
import { Schema } from '../schema';

export function generateIconTest(tree: Tree, schema: Schema) {
  // get the path to the index.spec.ts file
  const indexSpecPath = joinPathFragments('packages', schema.name, 'src', 'index.spec.ts');

  tree.write(indexSpecPath, `
  import * as icons from './index';

  describe('${names(schema.name).className} Icons', () => {
    it('should ensure the export names have not changed unexpectedly', () => {
      expect(Object.keys(icons)).toMatchSnapshot();
    })
  });`);

}
