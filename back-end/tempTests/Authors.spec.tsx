import React from "react";
import Authors from "../components/Authors/Authors";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

require("jest-fetch-mock").enableMocks();

test("Checks that Authors renders without crashing", () => {
  render(
    <BrowserRouter>
      {" "}
      <Authors />{" "}
    </BrowserRouter>
  );
  const screenText = screen.getByTestId("authors");
  expect(screenText).toBeInTheDocument();
});
