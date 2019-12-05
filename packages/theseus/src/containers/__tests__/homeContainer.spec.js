import React from 'react';
import renderer from 'react-test-renderer';
import { HomeContainer } from '../HomeContainer';
import Auth from '../../auth/Auth';

jest.mock('../../auth/Auth');

describe('Test <Header>', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders correctly - not logged in', () => {
    const auth = new Auth();
    const tree = renderer.create(<HomeContainer auth={auth} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly - logged in', () => {
    const auth = new Auth();
    auth.isAuthenticated = jest.fn().mockImplementation(() => true);
    const tree = renderer.create(<HomeContainer auth={auth} history={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
