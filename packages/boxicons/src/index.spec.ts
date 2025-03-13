import * as logos from '../logos/src/index';
import * as icons from '../regular/src/index';
import * as solid from '../solid/src/index';

describe('Boxicons Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(icons)).toMatchSnapshot();
    expect(Object.keys(solid)).toMatchSnapshot();
    expect(Object.keys(logos)).toMatchSnapshot();
  });
});
