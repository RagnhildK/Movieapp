import React from "react";
import renderer from "react-test-renderer";
import RatingButtons from "./RatingButtons";
import { Provider } from "react-redux";
import { mockStore } from "../../utils/movieListFixture";

it("RatingButtons component snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={mockStore}>
        <RatingButtons id={425909} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
