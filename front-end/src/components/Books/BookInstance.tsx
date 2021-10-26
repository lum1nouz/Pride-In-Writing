import React from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Books.module.css";
import fingersmith from "../../Assets/fingersmith.jpg";
import { Parallax } from "react-parallax";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Book from "../../models/book-model";
import { JsxEmit } from "typescript";

type props = {
    id: number
    name: string
    genre: string
    publisher?: string
    year:  string
    page_count: number
    price?: number
    avg_rating?: number
    maturity_rating: string
    description?: string
    image?: string
    authors: string[]
    author_connections?: string
    publisher_connections?: string

};

type state = {};

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
    constructor(props: props){
         super(props)
        this.state = {}
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
                  <h2>
                    Author <br />
                  </h2>
                  <Button component={Link} to={"/" + this.props.author_connections}>
                    {this.props.author_connections}
                  </Button>

                  <h2>Genre</h2>
                  <p>{this.props.genre}</p>

                  <h2>Publisher</h2>
                  <Button component={Link} to={"/" + this.props.publisher_connections}>
                    {this.props.publisher_connections}
                  </Button>
                  <h2>Year Published</h2>
                  <p>{this.props.year}</p>
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