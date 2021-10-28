import React from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Authors.module.css";
import { Parallax } from "react-parallax";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Book from "../../models/book-model"
import Publisher from "../../models/publisher-model"

type props = {
    author_id : number
    author_name : string
    author_tour : string
    author_summary? : string
    author_image? : string
    year_born? : string
    nationality : string
    genre : string
    noteable_works : string
    book_connections : number[]
    publisher_connections : number[]
};

type state = {
  bookCon : Book[]
  pubCon : Publisher[]
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
  constructor(props: props){
      super(props)

      this.state = {
        bookCon:[],
        pubCon: []
      }
  }

  async getPublisherConnections() {
    let tempData: Publisher[] = []
    this.props.publisher_connections.forEach(async (idNum) =>{(
      tempData.push(await fetch('https://api.prideinwriting.me/api/publishers/id=' + idNum)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      }))
    )})
    return tempData
  }

  async getBookConnections() {
    let tempData: Book[] = []
    this.props.book_connections.forEach(async (idNum) =>{(
      tempData.push(await fetch('https://api.prideinwriting.me/api/books/id=' + idNum)
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      }))
    )})
    return tempData
  }

  async componentDidMount() {
    this.setState({bookCon: await this.getBookConnections(), pubCon: await this.getPublisherConnections()}) 
  }

  render() {
    return (
      <div>
        <Header />
        <div className={css.background}>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{}}>
              <div className={css.titleText}> {this.props.author_name} </div>
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
                          alt={"Picture of " + this.props.author_name}
                          image={this.props.author_image}
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>
                        Born: {this.props.year_born}
                      </p>
                    </CardContent>
                  </Grid>
                </Grid>
                <div style={{ textAlign: "center" }}>
                  { this.props.author_summary && <div>
                      <h2>
                        Biography <br />
                      </h2>
                      <p>
                        {this.props.author_summary}
                      </p>
                    </div>}

                  <h2>Books</h2>
                  <p>
                    {this.state.bookCon.map(function(book) {
                      return <Button component={Link} to={"/book-" + book.book_id}>
                                  {book.name}
                            </Button>
                    })}
                  </p>

                  <h2>Publishers</h2>
                  <p>
                    {this.state.pubCon.map(function(publisher) {
                      return <Button component={Link} to={"/publisher-" + publisher.publisher_id}>
                                  {publisher.name}
                            </Button>
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

export default AuthorsInstance;

