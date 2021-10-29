import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

require('jest-fetch-mock').enableMocks()

test("renders app", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.findByTestId("4444");
  expect(linkElement).toBeInTheDocument();
});
