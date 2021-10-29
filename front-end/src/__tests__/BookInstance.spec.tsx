import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookInstance from "../components/Books/BookInstance";
import Book from "../models/book-model";
import stringToIntegerList from "../common";

const a: Book = {
  book_id: 0,
  name: "Killer Bee",
  genre: "Books",
  publisher: "Publishing Co",
  year: "1995",
  page_count: 1432,
  price: 6.99,
  avg_rating: 4.5,
  maturity_rating: "MATURE",
  description: "This is a fantastic book",
  image:
    "http://books.google.com/books/content?id=PN5hAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api,%5B",
  authors: ["Margaret"],
  author_connections: "10,15",
  publisher_connections: "15,20",
};

test("renders book instance", async () => {
  render(
    <BrowserRouter>
      <BookInstance
        id={a.book_id}
        name={a.name}
        genre={a.genre}
        publisher={a.publisher}
        year={a.year}
        page_count={a.page_count}
        price={a.price}
        avg_rating={a.avg_rating}
        maturity_rating={a.maturity_rating}
        description={a.description}
        image={a.image}
        authors={a.authors}
        author_connections={stringToIntegerList(a.author_connections)}
        publisher_connections={stringToIntegerList(a.publisher_connections)}
      />
    </BrowserRouter>
  );
  const linkElement = screen.getByText("Killer Bee");
  expect(linkElement).toBeInTheDocument();
});
