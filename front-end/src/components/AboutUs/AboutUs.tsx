import React from "react";
import { CardContent } from "@material-ui/core";
import Header from "../Header/Header";
import { Paper, Button } from "@material-ui/core";
import { Parallax, Background } from "react-parallax";
import bgPhoto from "../../Assets/bgPhoto.jpg";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import pamelaImg from "../../Assets/pamela-pic.jpg";
import rodrigoImg from "../../Assets/rodrigo-pic.jpg";
import cliffImg from "../../Assets/cliff-pic.jpg";
import gregImg from "../../Assets/greg-pic.jpg";
import shyamImg from "../../Assets/shyam-pic.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";

const styles = {
  parrallaxCont: {
    margintop: 100,
    height: 4500,
  },
  paperCont: {
    marginTop: 200,
    marginLeft: 80,
    marginRight: 80,
    height: 1200,
  },
  media: {
    width: 200,
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

type issuesResponse = {
  statistics: {
    counts: {
      all: number;
      closed: number;
      open: number;
    };
  };
};

type commitResponse = {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  author_email: string;
};

type props = {};

type state = {
  totalCommits: number;
  totalIssues: number;
  gregIssues: number;
  pamelaIssues: number;
  rodrigoIssues: number;
  shyamIssues: number;
  cliffIssues: number;
  gregCommits: number;
  pamelaCommits: number;
  rodrigoCommits: number;
  shyamCommits: number;
  cliffCommits: number;
};

class AboutUs extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      totalCommits: 0,
      totalIssues: 0,
      gregIssues: 0,
      pamelaIssues: 0,
      rodrigoIssues: 0,
      shyamIssues: 0,
      cliffIssues: 0,
      gregCommits: 0,
      pamelaCommits: 0,
      rodrigoCommits: 0,
      shyamCommits: 0,
      cliffCommits: 0,
    };
  }

  commitData: number[] = [0, 0, 0, 0, 0];

  async checkCommitAuthor(data: commitResponse, length: number) {
    if (data.author_email === "gjraper@Gregs-1s--0s.attlocal.net") {
      this.commitData[0] += 1;
    } else if (data.author_email === "restrella@outlook.com") {
      this.commitData[1] += 1;
    } else if (data.author_email === "xu.cliffjun@gmail.com") {
      this.commitData[2] += 1;
    } else if (data.author_email === "pamvazquez1@gmail.com") {
      this.commitData[3] += 1;
    } else if (data.author_email === "you@example.com") {
      this.commitData[4] += 1;
    }
  }

  async getCommitInfo(
    data: commitResponse[],
    tIssues: number,
    gIssues: number,
    rIssues: number,
    cIssues: number,
    pIssues: number,
    sIssues: number
  ) {
    let len = data.length;
    data.forEach((element) => this.checkCommitAuthor(element, len));

    this.setState({
      totalCommits: len,
      totalIssues: tIssues,
      gregIssues: gIssues,
      gregCommits: this.commitData[0],
      pamelaCommits: this.commitData[3],
      pamelaIssues: pIssues,
      cliffCommits: this.commitData[2],
      cliffIssues: cIssues,
      rodrigoCommits: this.commitData[1],
      rodrigoIssues: rIssues,
      shyamCommits: this.commitData[4],
      shyamIssues: sIssues,
    });
  }

  //Gitlab project id: 29826417
  async componentDidMount() {
    let tIssues: number = 0;
    let gIssues: number = 0;
    let rIssues: number = 0;
    let cIssues: number = 0;
    let pIssues: number = 0;
    let sIssues: number = 0;

    await axios
      .get(`https://gitlab.com/api/v4/projects/29826417/issues_statistics`)
      .then((res) => {
        tIssues = (res.data as issuesResponse).statistics.counts.closed;
      });

    await axios
      .get(
        `https://gitlab.com/api/v4/projects/29826417/issues_statistics?assignee_username=gjraper`
      )
      .then((res) => {
        gIssues = (res.data as issuesResponse).statistics.counts.closed;
      });
    await axios
      .get(
        `https://gitlab.com/api/v4/projects/29826417/issues_statistics?assignee_username=restrellas`
      )
      .then((res) => {
        rIssues = (res.data as issuesResponse).statistics.counts.closed;
      });
    await axios
      .get(
        `https://gitlab.com/api/v4/projects/29826417/issues_statistics?assignee_username=JunLum`
      )
      .then((res) => {
        cIssues = (res.data as issuesResponse).statistics.counts.closed;
      });
    await axios
      .get(
        `https://gitlab.com/api/v4/projects/29826417/issues_statistics?assignee_username=pamvazquez1`
      )
      .then((res) => {
        pIssues = (res.data as issuesResponse).statistics.counts.closed;
      });
    await axios
      .get(
        `https://gitlab.com/api/v4/projects/29826417/issues_statistics?assignee_username=shyamp12041`
      )
      .then((res) => {
        sIssues = (res.data as issuesResponse).statistics.counts.closed;
      });

    await axios
      .get(
        `https://gitlab.com/api/v4/projects/29826417/repository/commits?type=all&per_page=100&page=1`
      )
      .then((res) => {
        console.log(res.data);
        this.getCommitInfo(
          res.data as commitResponse[],
          tIssues,
          gIssues,
          rIssues,
          cIssues,
          pIssues,
          sIssues
        );
      });
  }

  render() {
    return (
      <>
        <div>
          <Header></Header>
        </div>
        <Parallax bgImage={bgPhoto} strength={500} style={styles.parrallaxCont}>
          <div style={{}}>
            <Paper
              elevation={4}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                marginTop: 100,
                marginLeft: 30,
                marginRight: 30,
                height: 150,
              }}
            >
              <div>
                <h1> About Us </h1>
                <p>
                  Pride in Writing aims to highlight the work of LGBTQ Authors
                  and show the Publishers that support them.
                </p>
                <p>
                  We hope that by making this information readily available,
                  people will support these authors, their books, and their
                  publishers!
                </p>
              </div>
            </Paper>
          </div>
          <div style={{}}>
            <Paper
              elevation={4}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                marginTop: 100,
                marginLeft: 30,
                marginRight: 30,
                height: 250,
              }}
            >
              <div>
                <h1> Gitlab Stats </h1>
                <p>
                  Pride in Writing aims to highlight the work of LGBTQ Authors
                  and show the Publishers that support them.
                </p>
                <p>Total commits: {this.state.totalCommits} </p>
                <p>Total issues: {this.state.totalIssues}</p>
                <p>Total unit tests: 0</p>
              </div>
            </Paper>
          </div>
          <div style={{}}>
            <Paper
              elevation={4}
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                marginTop: 100,
                marginLeft: 30,
                marginRight: 30,
                height: 1800,
              }}
            >
              <div>
                <h1>Meet the Team</h1>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent style={{ backgroundColor: "pink" }}>
                        <h2>Pamela Vazquez</h2>
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
                            src={pamelaImg}
                            component="img"
                            height="140"
                            alt="picture of pamela"
                          />
                        </div>
                        <p>
                          Pamela is a Senior at UT Austin, studying Computer
                          Science.
                        </p>
                        <p>
                          She will be graduating Fall 2022 and will start her
                          Product Management Career in February.
                        </p>
                        <p>
                          Her major responsibilities fall within the front-end
                          team.
                        </p>
                        <p>
                          Number of closed issues: {this.state.pamelaIssues}
                        </p>
                        <p>Number of commits: {this.state.pamelaCommits}</p>
                        <p>Number of Unit Tests: 0</p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card>
                      <CardContent style={{ backgroundColor: "pink" }}>
                        <h2>Gregory Raper</h2>
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
                            src={gregImg}
                            component="img"
                            height="140"
                            alt="picture of greg"
                          />
                        </div>
                        <p>
                          Greg is a Senior at UT Austin, studying Computer
                          Science.
                        </p>
                        <p>
                          He will be graduating Spring 2023 and he likes
                          swimming
                        </p>
                        <p>
                          His major responsibilities fall within the front-end
                          team.
                        </p>
                        <p>Number of closed issues: {this.state.gregIssues}</p>
                        <p>Number of commits: {this.state.gregCommits}</p>
                        <p>Number of Unit Tests: 0</p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card>
                      <CardContent style={{ backgroundColor: "pink" }}>
                        <h2>Rodrigo Estrella</h2>
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
                            src={rodrigoImg}
                            component="img"
                            height="400"
                            alt="picture of rodrigo"
                          />
                        </div>
                        <p>
                          Rodrigo is a Senior at UT Austin, studying Computer
                          Science.
                        </p>
                        <p>
                          He will be graduating Spring 2022 and will start his
                          full-stack Software Engineer Career in September.
                        </p>
                        <p>
                          His major responsibilities fall within the front-end
                          and back-end team.
                        </p>
                        <p>
                          Number of closed issues: {this.state.rodrigoIssues}
                        </p>
                        <p>Number of commits: {this.state.rodrigoCommits}</p>
                        <p>Number of Unit Tests: 0</p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card>
                      <CardContent style={{ backgroundColor: "pink" }}>
                        <h2>Cliff Xu</h2>
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
                            src={cliffImg}
                            component="img"
                            height="140"
                            alt="picture of cliff"
                          />
                        </div>
                        <p>
                          Cliff is a Senior at UT Austin, studying Computer
                          Science.
                        </p>
                        <p>
                          He will be graduating Spring 2023 and he likes tennis
                        </p>
                        <p>
                          His major responsibilities fall within the blank team.
                        </p>
                        <p>Number of closed issues: {this.state.cliffIssues}</p>
                        <p>Number of commits: {this.state.cliffCommits}</p>
                        <p>Number of Unit Tests: 0</p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card>
                      <CardContent style={{ backgroundColor: "pink" }}>
                        <h2>Shyam Patel</h2>
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
                            src={shyamImg}
                            component="img"
                            height="140"
                            alt="picture of shyam"
                          />
                        </div>
                        <p>
                          Shyam is a Senior at UT Austin, studying Computer
                          Science.
                        </p>
                        <p>
                          He will be graduating Spring 2022 and he likes video
                          games
                        </p>
                        <p>
                          His major responsibilities fall within the blank team.
                        </p>
                        <p>Number of closed issues: {this.state.shyamIssues}</p>
                        <p>Number of commits: {this.state.shyamCommits}</p>
                        <p>Number of Unit Tests: 0</p>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </div>

          <Paper
            elevation={4}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              marginTop: 100,
              marginLeft: 30,
              marginRight: 30,
              height: 375,
            }}
          >
            <div>
              <h1>APIs Used</h1>

              <List>
                <ListItem
                  button
                  component="a"
                  href="https://www.goodreads.com/api/"
                >
                  <ListItemText primary="Goodreads API" />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="https://developers.google.com/books/docs/overview/"
                >
                  <ListItemText primary="Google Books API" />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="https://openlibrary.org/developers/api "
                >
                  <ListItemText primary="Open Library API" />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="https://en.wikipedia.org/wiki/List_of_LGBT_writers "
                >
                  <ListItemText primary="List of LGBTQ Writers Data Source" />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="https://en.wikipedia.org/wiki/List_of_English-language_book_publishing_companies"
                >
                  <ListItemText primary="List of Book Publishing Companies Data Source" />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="https://www.tckpublishing.com/list-of-book-publishers/"
                >
                  <ListItemText primary="List of Book Publishers Data Source" />
                </ListItem>
              </List>
            </div>
          </Paper>

          <Paper
            elevation={4}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              marginTop: 100,
              marginLeft: 30,
              marginRight: 30,
              height: 650,
            }}
          >
            <div>
              <h1> Tools Used </h1>
              <List>
                <ListItem>
                  <ListItemText>
                    <p>React: used to build our web app</p>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <p>
                      Material UI: used to create the user interface in our
                      React application
                    </p>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <p>AWSAmplify: used to deploy our web application</p>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <p>Postman: used to design our Restful API</p>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <p>
                      GitLab: used for our project repository and for
                      development across team members
                    </p>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <p>
                      NameCheap: used to register the Pride in Writing domain
                      name
                    </p>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <p>
                      Restful APIs and Data Sources: used to scrape information
                      that will be displayed in our web application
                    </p>
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </Paper>
        </Parallax>
      </>
    );
  }
}

export default AboutUs;
