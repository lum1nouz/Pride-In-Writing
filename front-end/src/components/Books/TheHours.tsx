import React from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Books.module.css";
import thehours from "../../Assets/the-hours.jpg";
import { Parallax } from "react-parallax";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

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
              <div className={css.titleText}> The Hours </div>
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
                          src={thehours}
                          component="img"
                          alt="The Hours Book"
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>
                        Rating: 4.4 <br />
                        Pages: 230 <br />
                        Price: $11.79
                      </p>
                    </CardContent>
                  </Grid>
                </Grid>
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Author <br />
                  </h2>
                  <Button component={Link} to="/michael-cunningham">
                    Michael Cunningham
                  </Button>

                  <h2>Genre</h2>
                  <p>Fiction</p>

                  <h2>Publisher</h2>
                  <Button component={Link} to="/farrar">
                    Farrar
                  </Button>
                  <h2>Year Published</h2>
                  <p>1988</p>
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
