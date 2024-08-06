import * as lineIcons from '../line/src/index';
import * as plainIcons from '../plain/src/index';
import * as originalIcons from '../original/src/index';

describe('Devicon Icons', () => {
  it('should ensure the export names have not changed unexpectedly', () => {
    expect(Object.keys(lineIcons)).toMatchSnapshot();
    expect(Object.keys(plainIcons)).toMatchSnapshot();
    expect(Object.keys(originalIcons)).toMatchSnapshot();
  });
});
