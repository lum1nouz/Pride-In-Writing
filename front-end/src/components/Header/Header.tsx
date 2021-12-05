import React from "react";
import { AppBar, Toolbar, List, ListItem, Button } from "@material-ui/core";
import css from "./Header.module.css";
import { Link } from "react-router-dom";

// list: {
//   ...defaultFont,
//   fontSize: "14px",
//   margin: 0,
//   paddingLeft: "0",
//   listStyle: "none",
//   paddingTop: "0",
//   paddingBottom: "0",
//   color: "inherit",
// },
// listItem: {
//   float: "left",
//   color: "inherit",
//   position: "relative",
//   display: "block",
//   width: "auto",
//   margin: "0",
//   padding: "0",
//   [theme.breakpoints.down("sm")]: {
//     width: "100%",
//     "&:after": {
//       width: "calc(100% - 30px)",
//       content: '""',
//       display: "block",
//       height: "1px",
//       marginLeft: "15px",
//       backgroundColor: "#e5e5e5",
//     },
//   },
// },
// listItemText: {
//   padding: "0 !important",
// },

type props = {};

type state = {};

class Header extends React.Component<props, state> {
  state: state = {};

  render() {
    return (
      <AppBar
        className={css.appbar}
        style={{ backgroundColor: "black", position: "relative" }}
      >
        <Toolbar>
          <List className={css.headingLeft}>
            <ListItem>
              <Button component={Link} to="/">
                <div style={{ fontWeight: "bold" }}>
                  <p>
                    <span style={{ color: "#FF555E" }}>P</span>
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
                  </p>
                </div>
              </Button>
            </ListItem>
          </List>
          <List className={css.heading}>
            <ListItem>
              <Button id="authors-button" component={Link} to="/Authors">
                <div style={{ fontWeight: "bold", color: "white" }}>
                  <p>Authors</p>
                </div>
              </Button>
            </ListItem>
            <ListItem>
              <Button id="books-button" component={Link} to="/Books">
                <div style={{ fontWeight: "bold", color: "white" }}>
                  <p>Books</p>
                </div>
              </Button>
            </ListItem>
            <ListItem>
              <Button id="publishers-button" component={Link} to="/Publishers">
                <div style={{ fontWeight: "bold", color: "white" }}>
                  <p>Publishers</p>
                </div>
              </Button>
            </ListItem>
            <ListItem>
              <Button
                id="aboutus-button"
                component={Link}
                to="/AboutUs"
                style={{ width: 140 }}
              >
                <div style={{ fontWeight: "bold", color: "white" }}>
                  <p>About Us</p>
                </div>
              </Button>
              <Button
                id="OurVisualization-button"
                component={Link}
                to="/OurVisualization"
                style={{ width: 200 }}
              >
                <div style={{ fontWeight: "bold", color: "white" }}>
                  <p>Our Visualization</p>
                </div>
              </Button>
              <Button
                id="TheirVisualization-button"
                component={Link}
                to="/TheirVisualization"
                style={{ width: 200 }}
              >
                <div style={{ fontWeight: "bold", color: "white" }}>
                  <p>Their Visualization</p>
                </div>
              </Button>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
