import React from "react";
import renderer from "react-test-renderer";
import JoinSessionScreen from "./JoinSessionScreen";
import { Provider } from "react-redux";
import { mockStore } from ".././../utils/movieListFixture";

jest.useFakeTimers();

it("JoinSessionScreen snapshot", async () => {
  const tree = renderer
    .create(
      <Provider store={mockStore}>
        <JoinSessionScreen />
      </Provider>
    )
    .toJSON();
  await expect(tree).toMatchSnapshot();
});

// test("Press the button to start rating", () => {
//   const mockCallback = jest.fn((x) => 42 + x);
//   enterSession([0, 1], mockCallback);
// 
//   // The mock function is called twice
//   expect(mockCallback.mock.calls.length).toBe(2);
// });