import React from "react";
import renderer from "react-test-renderer";
import ResultMovie from "../ResultMovie";
import { Provider } from "react-redux";
import { mockStore } from "../../../utils/movieListFixture";

it("ResultMovie component snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={mockStore}>
        <ResultMovie id={425909} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
