import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthorsInstance from "../components/Authors/AuthorsInstance";
import Author from "../models/author-model";
import stringToIntegerList from "../common";

require('jest-fetch-mock').enableMocks()

const a: Author = {
  author_id: 0,
  author_name: "test",
  author_tour: "false",
  author_summary: "",
  author_image:
    "https://api.penguinrandomhouse.com/title/client/Public/domains/PRH.US/authors/72509",
  year_born: "2022",
  nationality: "None",
  genre: "testGenre",
  noteable_works: "testNw",
  book_connections: "20,25",
  publisher_connections: "30,35",
};

test("renders author instance", () => {
  render(
    <BrowserRouter>
      <AuthorsInstance
        author_id={a.author_id}
        author_name={a.author_name}
        author_tour={a.author_tour}
        author_summary={a.author_summary}
        author_image={a.author_image}
        year_born={a.year_born}
        nationality={a.nationality}
        genre={a.genre}
        noteable_works={a.noteable_works}
        book_connections={stringToIntegerList(a.book_connections)}
        publisher_connections={stringToIntegerList(a.publisher_connections)}
      />
    </BrowserRouter>
  );
  const linkElement =  screen.getByTestId("4");
  expect(linkElement).toBeInTheDocument();
});
