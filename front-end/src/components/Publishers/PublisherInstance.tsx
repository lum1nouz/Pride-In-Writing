import React from "react";
import { Paper } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Publishers.module.css";
import { Parallax } from "react-parallax";
import { CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Author from "../../models/author-model";
import Book from "../../models/book-model";
import Button from "@mui/material/Button";

type props = {
  id: number;
  name: string;
  summary: string;
  image: string;
  origin: string;
  publication_types: string;
  founded: string;
  parent_comp: string;
  headquarters: string;
  website: string;
  author_connections: number[];
  book_connections: number[];
};

type state = {
  bookCon: Book[];
  autCon: Author[];
};

class PublisherInstance extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      bookCon: [],
      autCon: [],
    };
  }

  async componentDidMount() {
    await this.setState({
      autCon: await this.getAuthorConnections(),
      bookCon: await this.getBookConnections(),
    });
  }

  async getBookConnections() {
    let tempData: Book[] = [];
    let param = this.props.book_connections.toString();
    if (param === "NaN") {
      param = "-1";
    }
    tempData = await fetch(
      "https://api.prideinwriting.me/api/books/ids=" + param
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return tempData.filter((item) => Object.keys(item).length);
  }

  async getAuthorConnections() {
    let tempData: Author[] = [];
    let param = this.props.author_connections.toString();
    if (param === "NaN") {
      param = "-1";
    }
    tempData = await fetch(
      "https://api.prideinwriting.me/api/authors/ids=" + param
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
    return tempData.filter((item) => Object.keys(item).length);
  }

  render() {
    return (
      <div>
        <Header />
        <div className={css.background}>
          <Parallax
            data-testid="444"
            strength={500}
            className={css.parrallaxCont}
          >
            <div style={{}}>
              <div
                className={css.titleText}
                style={{ textShadow: "4px 4px rgba(0, 0, 255, .2)" }}
              >
                {" "}
                {this.props.name}{" "}
              </div>
              <Paper elevation={4} className={css.paperCont}>
                <Grid container spacing={2} style={{ position: "relative" }}>
                  <Grid item xs={6}>
                    <CardContent style={{ width: "fit-content" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <img
                          alt="N/A"
                          src={this.props.image}
                          style={{
                            height: 200,
                            width: 250,
                            marginLeft: 50,
                            marginTop: 10,
                          }}
                        />
                        {/* <CardMedia
                            style={styles.media}
                            component="img"
                            alt={"Picture of " + this.props.name}
                            image={this.props.image}
                          /> */}
                      </div>
                      <p style={{ textAlign: "center" }}>
                        Parent Company: {this.props.parent_comp} <br />
                        Headquarters: {this.props.headquarters} <br />
                      </p>
                    </CardContent>
                  </Grid>

                  <Grid item xs={6}>
                    <div style={{ textAlign: "center" }}>
                      <h2>Bio</h2>
                      <p>{this.props.summary}</p>
                      <h2>Website</h2>
                      <p>
                        <a href={this.props.website}>
                          {this.props.name} Website
                        </a>
                      </p>

                      <h2>
                        Origin <br />
                      </h2>
                      <p>{this.props.origin}</p>

                      <h2>
                        Publication Types <br />
                      </h2>
                      <p>{this.props.publication_types}</p>

                      <h2>Book Connections</h2>

                      <p>
                        {/* {console.log(this.state.bookCon)} */}

                        {this.state.bookCon.length < 1 ? (
                          <div> None found </div>
                        ) : (
                          <div></div>
                        )}

                        {this.state.bookCon
                          .filter((item) => Object.keys(item).length)
                          .map(function (book) {
                            return (
                              <Button href={"/book-" + book.book_id}>
                                {book.name}
                              </Button>
                            );
                          })}
                      </p>

                      <h2>
                        Author Connections <br />
                      </h2>
                      <p>
                        {this.state.autCon.length < 1 ? (
                          <div> None found </div>
                        ) : (
                          <div></div>
                        )}

                        {this.state.autCon.map(function (author) {
                          return (
                            <Button href={"/author-" + author.author_id}>
                              {author.author_name}
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

export default PublisherInstance;
