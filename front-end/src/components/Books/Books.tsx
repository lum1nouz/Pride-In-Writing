// https://gitlab.com/mehuldar/aroundtheworld/-/blob/main/front-end/src/screens/Demographics/DemographicsAll.js
// Around the World

import { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Books.module.css";
import { Pagination } from "@mui/material";
import { Parallax } from "react-parallax";
import Book from "../../models/book-model";
import BookCard from "./BookCard";

type props = {
  dataLen: number
};

function Books(props: props) {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 9

  async function getData() {
    const authors = await fetch(`https://api.prideinwriting.me/api/books`)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return authors as Book[];
  }

  useEffect(() => {
    const getBooks = async () => {
      setBookData(await getData());
    };
    getBooks();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Parallax strength={500} className={css.parrallaxCont}>
          <div style={{ fontWeight: "bold" }}>
            <div className={css.titleText}>
              <span style={{ color: "#FF555E" }}>B</span>
              <span style={{ color: "#FF8650" }}>o</span>
              <span style={{ color: "#F6BE00" }}>o</span>
              <span style={{ color: "#77C66E" }}>k</span>
              <span style={{ color: "#83B2FF" }}>s</span>
            </div>
            <Paper elevation={4} className={css.paperCont} data-testid="book44">
              <div>
                <div className={css.cardGrid}>
                  {bookData.slice((page - 1) * 9, page * 9).map((book) => (
                    <BookCard book={book} />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 100,
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  Displaying {(page - 1) * 9 + 1}-
                  {Math.min(page * 9, bookData.length)} of {bookData.length}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 30,
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <Pagination
                      defaultPage={1}
                      page={page}
                      onChange={(event, value) => setPage(value)}
                      count={Math.ceil(bookData.length / 9)}
                      variant="outlined"
                      color="primary"
                      style={{ alignSelf: "center" }}
                    />
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </Parallax>
      </div>
    </div>
  );
}

export default Books;
