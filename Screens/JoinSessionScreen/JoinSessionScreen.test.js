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

// jest.mock("react", () => {
//   const paramArray = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];
//   let callCount = 0;
//   return {
//     useState: (initial) => {
//       const res = paramArray[callCount % 4];
//       callCount += 1;
//       return [initial, res];
//     },
//   };
// });

// test("Checks if enterSession sets usernameError and sessionError when directly clicks with no input", () => {
//   const paramArray = [null, null, null, null].map(useState);
//   const setusernameErrorMock = paramArray[2];
//   const setSessionErrorMock = paramArray[3];
//   render(
//     <JoinSessionScreen
//       navigation={{
//         navigate: jest.fn(),
//       }}
//     />
//   );
//   fireEvent.click(screen.getByID("enterJoinedSession"));
//   expect(setusernameErrorMock.mock.calls[0][0]).toBe(true);
//   expect(setSessionErrorMock.mock.calls[0][0]).toBe(true);
// });
//
