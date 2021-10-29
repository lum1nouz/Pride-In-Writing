import React from "react";
import Publishers from "../components/Publishers/Publishers";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Checks that Authors renders without crashing", async () => {
  render(
    <BrowserRouter>
      {" "}
      <Publishers />{" "}
    </BrowserRouter>
  );
  const screenText = screen.getByTestId("publishers");
  expect(screenText).toBeInTheDocument();
});
