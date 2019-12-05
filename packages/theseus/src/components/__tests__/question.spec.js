import React from 'react';
import renderer from 'react-test-renderer';
import Question from '../Question';

describe('Test <Question>', () => {
  it('should render correctly', () => {
    const question = {
      description: 'description...',
      heroImage: 'http://url-of-hero.image',
    };
    const tree = renderer.create(<Question question={question} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
