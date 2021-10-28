import React from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Publishers.module.css";
import michael from "../../Assets/michael-cunningham.jpg";
import { Parallax } from "react-parallax";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

type props = {
    id: number
    name: string
    image: string
    origin: string
    publication_types: string
    founded:  string
    parent_comp: string
    headquarters: string
    website: string
    author_connections: number[]
    book_connections: number[]
};

type state = {};

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
                          Parent Company: {this.props.parent_comp} <br />
                          Headquarters: {this.props.headquarters} <br />
                          Website:{" "}
                          <a href={" " + this.props.website}>
                            {this.props.name} Website
                          </a>
                        </p>
                      </CardContent>
                    </Grid>
                  </Grid>
                  <div style={{ textAlign: "center" }}>
                    <h2>
                      Origin <br />
                    </h2>
                    <p>
                      {this.props.origin}
                    </p>

                    <h2>
                      Publication Types <br />
                    </h2>
                    <p>
                      {this.props.publication_types}
                    </p>
  
                    <h2 id="authorsTest">Authors</h2>
                    <p>
                      <Button component={Link} to={"/" + this.props.author_connections}>
                        {this.props.author_connections}
                      </Button>
                    </p>
  
                    <h2>Books</h2>
                    <p>
                      <Button component={Link} to={"/" + this.props.book_connections}>
                        {this.props.book_connections}
                      </Button>
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
