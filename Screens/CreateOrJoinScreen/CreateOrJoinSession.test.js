import React from "react";
import renderer from "react-test-renderer";
import CreateOrJoinScreen from "./CreateOrJoinScreen";
import { Provider } from "react-redux";
import { mockStore } from "../../utils/movieListFixture";

jest.useFakeTimers()

it("CreateOrJoinScreen snapshot", () => {
  const tree = renderer
    .create(
      <Provider store={mockStore}>
        <CreateOrJoinScreen/>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
