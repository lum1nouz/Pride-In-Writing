import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

test("renders app", async () => {
  render(<BrowserRouter>
            <App />
        </BrowserRouter>);
  const linkElement = screen.getByText("Our mission is to spotlight book authors in the LGBTQ Community");
  expect(linkElement).toBeInTheDocument();
});


