import React from "react";
import Books from "../components/Books/Books";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

require('jest-fetch-mock').enableMocks()

test("Checks that Books renders without crashing",  () => {
  render(
    <BrowserRouter>
      {" "}
      <Books />{" "}
    </BrowserRouter>
  );
  const screenText =  screen.getByTestId("books44");
  expect(screenText).toBeInTheDocument();
});
