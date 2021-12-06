import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PublisherInstance from "../components/Publishers/PublisherInstance";
import Publisher from "../models/publisher-model";
import stringToIntegerList from "../common";

require("jest-fetch-mock").enableMocks();

const a: Publisher = {
  publisher_id: 0,
  name: "123Books!!!",
  summary: "",
  image: "https://upload.wikimedia.org/wikipedia/en/3/32/Atria_logo.png",
  origin: "texas",
  publication_types: "Books",
  founded: "1993",
  parent_comp: "ABC",
  headquarters: "DEF",
  website: "http://www.simonandschusterpublishing.com/atria/index.html",
  author_connections: "15,20",
  book_connections: "25, 30",
};

test("renders publisher instance", () => {
  render(
    <BrowserRouter>
      <PublisherInstance
        id={a.publisher_id}
        name={a.name}
        summary={a.summary}
        image={a.image}
        origin={a.origin}
        publication_types={a.publication_types}
        founded={a.founded}
        parent_comp={a.parent_comp}
        headquarters={a.headquarters}
        website={a.website}
        author_connections={stringToIntegerList(a.author_connections)}
        book_connections={stringToIntegerList(a.book_connections)}
      />
    </BrowserRouter>
  );
  const linkElement = screen.getByTestId("444");
  expect(linkElement).toBeInTheDocument();
});
