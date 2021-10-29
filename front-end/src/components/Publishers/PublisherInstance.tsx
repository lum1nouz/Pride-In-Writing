import React from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Publishers.module.css";
import { Parallax } from "react-parallax";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Author from "../../models/author-model";
import Book from "../../models/book-model";

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

const styles = {
  media: {
    width: 600,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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

  async getAuthorConnections() {
    let tempData: Author[] = [];
    for (let num of this.props.author_connections) {
      tempData.push(
        await fetch("https://api.prideinwriting.me/api/authors/id=" + num)
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

  render() {
    return (
      <div>
        <Header />
        <div className={css.background}>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{}}>
              <div className={css.titleText}> {this.props.name} </div>
              <Paper elevation={4} className={css.paperCont}>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <CardContent
                      style={{ backgroundColor: "pink", width: "fit-content" }}
                    >
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
                </Grid>
                <div style={{ textAlign: "center" }}>
                  <h2>Bio</h2>
                  <p>{this.props.summary}</p>
                  <h2>Website</h2>
                  <p>
                    <a href={this.props.website}>{this.props.name} Website</a>
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
                    {this.state.bookCon.map(function (book) {
                      return (
                        <Button component={Link} to={"/book-" + book.book_id}>
                          {book.name}
                        </Button>
                      );
                    })}
                  </p>

                  <h2>
                    Author Connections <br />
                  </h2>
                  <p>
                    {this.state.autCon.map(function (author) {
                      return (
                        <Button
                          component={Link}
                          to={"/author-" + author.author_id}
                        >
                          {author.author_name}
                        </Button>
                      );
                    })}
                  </p>
                </div>
              </Paper>
            </div>
          </Parallax>
        </div>
      </div>
    );
  }
}

export default PublisherInstance;
