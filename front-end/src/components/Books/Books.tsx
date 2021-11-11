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

function Books() {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [page, setPage] = useState(1);

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

              {/* <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a id="linkButton-0" href="/books-0">The Hours</a></h2>
                        <p>Author: Michael Cunningham</p>
                        <p>Genre: Fiction</p>
                        <p>Publisher: Farrar</p>
                        <p>Year Published: 1988</p>
                        <p>Rating: 4.4</p>
                        <p>Pages: 230</p>
                        <p>Price: 11.79</p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="/fingersmith">Fingersmith</a></h2>
                        <p>Author: Sarah Waters</p>
                        <p>Genre: Fiction</p>
                        <p>Publisher: Virago Press</p>
                        <p>Year Published: 2002</p>
                        <p>Rating: 4</p>
                        <p>Pages: 596</p>
                        <p>Price: 16.89</p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="/the-price-of-salt">The Price of Salt</a></h2>
                        <p>Author: Patricia Highsmith</p>
                        <p>Genre: Fiction</p>
                        <p>Publisher: G. P. Putnam's Sons</p>
                        <p>Year Published: 1952</p>
                        <p>Rating: 4.5</p>
                        <p>Pages: 304</p>
                        <p>Price: 13.69</p>
                      </CardContent>
                    </Card>
                  </Grid>

              </Grid>  */}
            </Paper>
          </div>
        </Parallax>
      </div>
    </div>
  );
}

export default Books;
