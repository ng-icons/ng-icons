import * as icons from './index';

describe('CSS.gg Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(icons)).toMatchSnapshot();
  });
});
