import React from "react";
import renderer from "react-test-renderer";
import CreateSessionScreen from "./CreateSessionScreen"
import { Provider } from "react-redux";
import { mockStore } from "../../utils/movieListFixture";

jest.useFakeTimers()

it("CreateSessionScreen snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={mockStore}>
        <CreateSessionScreen/>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
