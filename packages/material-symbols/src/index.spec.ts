import * as icons from './index';

describe('Material Symbols', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(icons)).toMatchSnapshot();
  });
});
