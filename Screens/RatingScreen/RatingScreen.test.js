import React from "react";
import renderer from "react-test-renderer";
import RatingScreen from "./RatingScreen";
import { Provider } from "react-redux";
import { mockStore } from "../../utils/movieListFixture";

jest.useFakeTimers();

it("RatingScreen snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={mockStore}>
        <RatingScreen />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
