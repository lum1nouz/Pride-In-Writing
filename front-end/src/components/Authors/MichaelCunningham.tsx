import React from "react";
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Authors.module.css";
import michael from "../../Assets/michael-cunningham.jpg";
import { Parallax } from "react-parallax";
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

type props = {};

type state = {};

const styles = {
  media: {
    width: 400,
    height: 500,
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
              <div className={css.titleText}> Michael Cunningham </div>
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
                          src={michael}
                          component="img"
                          alt="Picture of Michael Cunningham"
                        />
                      </div>
                      <p style={{ textAlign: "center" }}>
                        Born: November 6, 1952
                      </p>
                    </CardContent>
                  </Grid>
                </Grid>
                <div style={{ textAlign: "center" }}>
                  <h2>
                    Biography <br />
                  </h2>
                  <p>
                    Born in Cincinnati, Ohio, Michael Cunningham grew up in
                    Pasadena, California. He is an American novelist that
                    studied English literature at Stanford University.
                  </p>

                  <h2>Books</h2>
                  <p>
                    <Button component={Link} to="/the-hours">
                      The Hours (1998)
                    </Button>
                  </p>

                  <h2>Publishers</h2>
                  <p>
                    <Button component={Link} to="/farrar">
                      Farrar, Straus and Giroux
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

export default Page;
