import React from 'react';
import renderer from "react-test-renderer";
import Movie from "../Movie.jsx";
import { mockStore } from "../../../utils/movieListFixture";
import { Provider } from "react-redux";

it("Movie component snapshot", () => {
  const tree = renderer.create(<Provider store={mockStore}><Movie id={425909} /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
