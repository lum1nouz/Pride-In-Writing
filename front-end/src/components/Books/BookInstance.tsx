import React from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Books.module.css";
import { Parallax } from "react-parallax";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Book from "../../models/book-model";
import Author from "../../models/author-model";
import Publisher from "../../models/publisher-model";
import stringToIntegerList from "../../common";

// function arrayToString(arr: String[]) {
//   let tempData: string = "";
//   if(!arr){
//     return ""
//   }

//   arr.forEach((s) => {
//     tempData = tempData + " " + s;
//   });
//   return tempData;
// }

type props = {
  id: number;
  name: string;
  genre: string;
  publisher?: string;
  year: string;
  page_count: number;
  price?: number;
  avg_rating?: number;
  maturity_rating: string;
  description?: string;
  image?: string;
  authors: string[];
  author_connections: number[];
  publisher_connections: number[];
};

type state = {
  autCon: Author[];
  pubCon: Publisher[];
};

const styles = {
  media: {
    width: 300,
    height: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

class BookInstance extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      autCon: [],
      pubCon: [],
    };
  }

  async componentDidMount() {
    await this.setState({
      autCon: await this.getAuthorConnections(),
      pubCon: await this.getPublisherConnections(),
    });
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
      <div data-testid="44">
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
                        <CardMedia
                          style={styles.media}
                          component="img"
                          alt={"Picture of " + this.props.name}
                          image={this.props.image}
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>
                        Rating: {this.props.avg_rating} <br />
                        Pages: {this.props.page_count} <br />
                        Price: {this.props.price}
                      </p>
                    </CardContent>
                  </Grid>
                </Grid>
                <div style={{ textAlign: "center" }}>
                  {this.props.description && (
                    <div>
                      <h2>
                        Description <br />
                      </h2>
                      <p>{this.props.description}</p>
                    </div>
                  )}

                  <h2>Genre</h2>
                  <p>{this.props.genre}</p>

                  <h2>Maturity Rating</h2>
                  <p>{this.props.maturity_rating}</p>

                  <h2>Year Published</h2>
                  <p>{this.props.year}</p>

                  <h2>Writen By</h2>
                  <p>{this.props.authors.toString()}</p>

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

                  <h2 id="publisherTest">Publisher Connections</h2>
                  <p>
                    {this.state.pubCon.map(function (publisher) {
                      return (
                        <Button
                          component={Link}
                          to={"/publisher-" + publisher.publisher_id}
                        >
                          {publisher.name}
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

export default BookInstance;
