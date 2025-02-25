import React from "react";
import { Paper } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Books.module.css";
import { Parallax } from "react-parallax";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Author from "../../models/author-model";
import Publisher from "../../models/publisher-model";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

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
    let param = this.props.publisher_connections.toString();
    if (param === "NaN") {
      param = "-1";
    }
    tempData = await fetch(
      "https://api.prideinwriting.me/api/publishers/ids=" + param
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
      <div data-testid="44">
        <Header />
        <div className={css.background}>
          <Parallax strength={500} className={css.parrallaxCont}>
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
                        <CardMedia
                          style={styles.media}
                          component="img"
                          alt={"Picture of " + this.props.name}
                          image={this.props.image}
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>
                        Rating:{" "}
                        <Rating
                          name="read-only"
                          value={this.props.avg_rating}
                          readOnly
                        />
                        <br />
                        Pages: {this.props.page_count} <br />
                        Price: {this.props.price}
                      </p>
                    </CardContent>
                  </Grid>

                  <Grid item xs={6}>
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

                      <h2 id="publisherTest">Publisher Connections</h2>
                      <p>
                        {this.state.pubCon.length < 1 ? (
                          <div> None found </div>
                        ) : (
                          <div></div>
                        )}

                        {this.state.pubCon.map(function (publisher) {
                          return (
                            <Button
                              href={"/publisher-" + publisher.publisher_id}
                            >
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

export default BookInstance;
