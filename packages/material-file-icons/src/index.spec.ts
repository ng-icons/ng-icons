import * as uncolored from '../uncolored/src';
import * as colored from '../colored/src';

describe('Material File Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(uncolored)).toMatchSnapshot();
    expect(Object.keys(colored)).toMatchSnapshot();
  });
});
