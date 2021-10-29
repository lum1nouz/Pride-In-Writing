import React from "react";
import Publishers from "../components/Publishers/Publishers";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

require('jest-fetch-mock').enableMocks()

test("Checks that Authors renders without crashing", () => {
  render(
    <BrowserRouter>
      {" "}
      <Publishers />{" "}
    </BrowserRouter>
  );
  const screenText = screen.findByTestId("publishers");
  expect(screenText).toBeInTheDocument();
});
