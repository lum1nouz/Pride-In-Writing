import React from "react";
import HomePage from "../components/HomePage/HomePage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Checks that the Home page renders without crashing", async () => {
  render(
    <BrowserRouter>
      {" "}
      <HomePage />{" "}
    </BrowserRouter>
  );
  const screenText = screen.getByTestId("pride");
  expect(screenText).toBeInTheDocument();
});
