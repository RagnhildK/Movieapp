import React from "react";
import renderer from "react-test-renderer";
import DetailedMovieCard from "../DetailedMovieCard";
import { Provider } from "react-redux";
import { mockStore } from "../../../utils/movieListFixture";

it("DetailedMovieCard component snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={mockStore}>
        <DetailedMovieCard id={425909} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
