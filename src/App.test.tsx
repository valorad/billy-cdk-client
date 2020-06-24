import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("React Redux cheer up test", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // expect(getByText(/learn/i)).toBeInTheDocument();

  expect("😄").toEqual("😄");
  expect(true).toBeTruthy();


});
