import React from "react";
import Header from "../Header/Header";
import booksPics from "../../Assets/booksPic.png";
import Grid from "@material-ui/core/Grid";

const styles = {
  parrallaxCont: {
    margintop: 100,
    height: 1000,
  },
  paperCont: {
    marginTop: 200,
    marginLeft: 80,
    marginRight: 80,
    height: 1200,
  },

  pride: {
    fontSize: "50px",
  },

  mission: {
    fontSize: "30px",
  },
};

type props = {};

type state = {};

class HomePage extends React.Component<props, state> {
  state: state = {};

  render() {
    return (
      <div>
        <div>
          <Header></Header>
        </div>

        <div>
          <Grid container spacing={2} style={{ position: "relative" }}>
            <Grid
              item
              xs={7}
              style={{
                backgroundColor: "white",
                height: "600px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div className="pride" data-testid="pride">
                <h1>
                  <span id="homePageP" style={{ color: "#FF555E" }}>
                    P
                  </span>
                  <span style={{ color: "#FF8650" }}>r</span>
                  <span style={{ color: "#F6BE00" }}>i</span>
                  <span style={{ color: "#77C66E" }}>d</span>
                  <span style={{ color: "#83B2FF" }}>e </span>
                  <span style={{ color: "#9B6EF3" }}>I</span>
                  <span style={{ color: "#FC6C85" }}>n </span>
                  <span style={{ color: "#1167b1" }}>W</span>
                  <span style={{ color: "#FF555E" }}>r</span>
                  <span style={{ color: "#77C66E" }}>i</span>
                  <span style={{ color: "#F6BE00" }}>t</span>
                  <span style={{ color: "#77C66E" }}>i</span>
                  <span style={{ color: "#83B2FF" }}>n</span>
                  <span style={{ color: "#9B6EF3" }}>g</span>
                </h1>
                <div className="mission">
                  <p>
                    Our mission is to spotlight book authors in the LGBTQ
                    Community
                  </p>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={5}
              style={{
                backgroundColor: "white",
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img src={booksPics} style={{ objectFit: "cover" }}></img>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default HomePage;
