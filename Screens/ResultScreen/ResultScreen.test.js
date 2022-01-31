import React from "react";
import renderer from "react-test-renderer";
import ResultScreen from "./ResultsScreen";
import { Provider } from "react-redux";
import { mockStore } from "../../utils/movieListFixture";

jest.useFakeTimers()

it("ResultScreen snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={mockStore}>
        <ResultScreen/>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
