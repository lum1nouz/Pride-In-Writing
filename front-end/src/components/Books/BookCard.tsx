import React from "react";
import { Card } from "antd";
import css from "./Books.module.css";
import Book from "../../models/book-model";
import Highlighter from "react-highlight-words";
import 'antd/dist/antd.css';
import Rating from '@mui/material/Rating';

function BookCard({ book, search }: { book: Book, search: string }) {
  return (
    <a href={"/book-" + book.book_id}>
      <Card
        className={css.bookCardStyle}
        bordered={true}
        hoverable
        cover={
          <img
            alt="N/A"
            src={book.image}
            style={{
              height: 200,
              width: 200,
              marginLeft: 50,
              marginTop: 10,
            }}
          />
        }
      >
        <Card.Meta title={book.name} />
        <div className="cardStatsSection">
          <div>{<Highlighter
								// highlightClassName={styles.searchHighlight}
								searchWords={search.split(" ")}
								textToHighlight={"Genre:" +book.genre}
							/>
          } </div>
          <div>{<Highlighter
								// highlightClassName={styles.searchHighlight}
								searchWords={search.split(" ")}
								textToHighlight={"Year Published: " + book.year}
							/> }
          </div>
          <div>Rating: <Rating name="read-only" value={book.avg_rating} readOnly /> </div>
          <div>Price: {<Highlighter
								// highlightClassName={styles.searchHighlight}
								searchWords={search.split(" ")}
								textToHighlight={book.price + ""}
							/> } 
          </div>
          <div>Page Count: {<Highlighter
								// highlightClassName={styles.searchHighlight}
								searchWords={search.split(" ")}
								textToHighlight={book.page_count + ""}
							/> } </div>
        </div>
      </Card>
    </a>
  );
}

export default BookCard;
