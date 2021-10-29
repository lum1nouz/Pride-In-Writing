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

type props = {};

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

class Page extends React.Component<props, state> {
  state: state = {};

  render() {
    return (
      <div>
        <Header />
        <div className={css.background}>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{}}>
              <div className={css.titleText}> Fingersmith </div>
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
                          src={fingersmith}
                          component="img"
                          alt="Fingersmith"
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>
                        Rating: 4 <br />
                        Pages: 596 <br />
                        Price: $16.89
                      </p>
                    </CardContent>
                  </Grid>
                </Grid>
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Author <br />
                  </h2>
                  <Button component={Link} to="/sarah-waters">
                    Sarah Waters
                  </Button>

                  <h2>Genre</h2>
                  <p>Fiction</p>

                  <h2>Publisher</h2>
                  <Button component={Link} to="/virago-press">
                    Virago Press
                  </Button>
                  <h2>Year Published</h2>
                  <p>2002</p>
                </div>
              </Paper>
            </div>
          </Parallax>
        </div>
      </div>
    );
  }
}

export default Page;
