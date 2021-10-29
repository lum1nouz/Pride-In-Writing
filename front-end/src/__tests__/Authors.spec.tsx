import React from "react";
import Authors from "../components/Authors/Authors";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Checks that Authors renders without crashing", async () => {
  render(
    <BrowserRouter>
      {" "}
      <Authors />{" "}
    </BrowserRouter>
  );
  const screenText = screen.getByTestId("authors");
  expect(screenText).toBeInTheDocument();
});
