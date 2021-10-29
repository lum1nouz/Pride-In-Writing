import React from "react";
import Header from "../components/Header/Header";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Checks that Header renders without crashing", () => {
  render(
    <BrowserRouter>
      {" "}
      <Header />{" "}
    </BrowserRouter>
  );
  const screenText = screen.getByText("Books");
  expect(screenText).toBeInTheDocument();
});
