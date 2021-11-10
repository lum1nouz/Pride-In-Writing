import React from "react";
import { Paper } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Authors.module.css";
import { Parallax } from "react-parallax";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Book from "../../models/book-model";
import Publisher from "../../models/publisher-model";
import Button from '@mui/material/Button';

type props = {
  author_id: number;
  author_name: string;
  author_tour: string;
  author_summary?: string;
  author_image?: string;
  year_born?: string;
  nationality: string;
  genre: string;
  noteable_works: string;
  book_connections: number[];
  publisher_connections: number[];
};

type state = {
  bookCon: Book[];
  pubCon: Publisher[];
};

const styles = {
  media: {
    width: 400,
    height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

class AuthorsInstance extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      bookCon: [],
      pubCon: [],
    };
  }

  async getPublisherConnections() {
    let tempData: Publisher[] = [];
    for (let num of this.props.publisher_connections) {
      tempData.push(
        await fetch("https://api.prideinwriting.me/api/publishers/id=" + num)
          .then((response) => {
            return response.json();
          })
          .catch((err) => {
            console.log(err);
            return {};
          })
      );
    }
    return tempData;
  }

  async getBookConnections() {
    let tempData: Book[] = [];
    for (let num of this.props.book_connections) {
      tempData.push(
        await fetch("https://api.prideinwriting.me/api/books/id=" + num)
          .then((response) => {
            return response.json();
          })
          .catch((err) => {
            console.log(err);
            return {};
          })
      );
    }
    return tempData;
  }

  async componentDidMount() {
    await this.setState({
      bookCon: await this.getBookConnections(),
      pubCon: await this.getPublisherConnections(),
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div data-testid="4" className={css.background}>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{}}>
              <div className={css.titleText} style={{textShadow: "4px 4px rgba(0, 0, 255, .2)"}}> {this.props.author_name} </div>
              <Paper elevation={4} className={css.paperCont}>
                <Grid
                  container
                  spacing={2}
                  style= {{position: "relative"}}
                >
                  <Grid item xs={6}>
                    <CardContent
                      style={{width: "fit-content" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <CardMedia
                          style={styles.media}
                          component="img"
                          alt={"Picture of " + this.props.author_name}
                          image={this.props.author_image}
                        />
                      </div>
                      <p style={{ textAlign: "center", fontWeight: "bold" }}>
                        Born: {this.props.year_born}
                      </p>
                    </CardContent>
                  </Grid>

                  <Grid item xs= {6}>
                  <div style={{ textAlign: "center" }}>
                  {this.props.author_summary && (
                    <div>
                      <h2>
                        Biography <br />
                      </h2>
                      <p>{this.props.author_summary}</p>
                    </div>
                  )}

                  <h2>Year Born</h2>
                  <p>{this.props.year_born}</p>
                  <h2>On-Tour Soon</h2>
                  <p>{this.props.author_tour}</p>
                  <h2>Nationality</h2>
                  <p>{this.props.nationality}</p>
                  <h2>Genre</h2>
                  <p>{this.props.genre}</p>
                  <h2>Notable Works</h2>
                  <p>{this.props.genre}</p>

                  <h2>Book Connections</h2>
                  <p>
                    {this.state.bookCon.map(function (book) {
                      return (
                        <Button href={"/book-" + book.book_id}>
                         {book.name}
                      </Button>
                      );
                    })}
                  </p>

                  <h2>Publisher Connections</h2>
                  <p>
                    {this.state.pubCon.map(function (publisher) {
                      return (
                      <Button href={"/publisher-" + publisher.publisher_id}>
                      {publisher.name}
                   </Button>
                      );
                    })}
                  </p>
                </div>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Parallax>
        </div>
      </div>
    );
  }
}

export default AuthorsInstance;
