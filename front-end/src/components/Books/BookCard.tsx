import React from "react";
import { Card } from "antd";
import css from "./Books.module.css";
import Book from "../../models/book-model";

function BookCard({ book }: { book: Book }) {
  return (
    <a id={"linkButton-" + book.book_id} href={"/book-" + book.book_id}>
      <Card
        className={css.bookCardStyle}
        hoverable
        cover={
          <img
            alt="N/A"
            src={book.image}
            style={{
              height: 200,
              width: 250,
              marginLeft: 50,
              marginTop: 10,
            }}
          />
        }
      >
        <Card.Meta title={book.name} />
        <div className="cardStatsSection">
          <div>Genre: {book.genre}</div>
          <div>Year Published: {book.year}</div>
          <div>Rating: {book.avg_rating}</div>
          <div>Price: {book.price}</div>
          <div>Page Count: {book.page_count}</div>
        </div>
      </Card>
    </a>
  );
}

export default BookCard;
