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
import awsLogo from "../../Assets/awsAmplifyLogo.png";
import gitLogo from "../../Assets/gitlabLogo.png";
import materialLogo from "../../Assets/materialUILogo.png";
import nameCheapLogo from "../../Assets/nameCheapLogo.jpg";
import postmanLogo from "../../Assets/postmanLogo.png";
import reactLogo from "../../Assets/reactLogo.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";

const styles = {
  parrallaxCont: {
    margintop: 100,
    height: 3800,
  },
  paperCont: {
    marginTop: 200,
    marginLeft: 80,
    marginRight: 80,
    height: 1200,
  },
  peopleMedia: {
    width: 200,
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    backgroundColor: "white", 
    height: 250,
  },
  media: {
    maxWidth: 100,
    maxHeight: 100,
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
  pageNum: number;
  oldPageNum: number
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
      pageNum: 1,
      oldPageNum: 0
    };
  }

  commitData: number[] = [0, 0, 0, 0, 0];

  async updatePageNum(data: commitResponse[]) {
    let len = data.length;
    data.forEach((element) => this.checkCommitAuthor(element));

    let tempPageNum = this.state.pageNum
    if (len >= (this.state.pageNum * 100)) {
      tempPageNum = this.state.pageNum + 1     
    }

    this.setState({
      totalCommits: this.state.totalCommits + len,
      totalIssues: this.state.totalIssues,
      gregIssues: this.state.gregIssues,
      gregCommits: this.commitData[0],
      pamelaCommits: this.commitData[3],
      pamelaIssues: this.state.pamelaIssues,
      cliffCommits: this.commitData[2],
      cliffIssues: this.state.cliffIssues,
      rodrigoCommits: this.commitData[1],
      rodrigoIssues: this.state.rodrigoIssues,
      shyamCommits: this.commitData[4],
      shyamIssues: this.state.shyamIssues,
      pageNum: tempPageNum,
      oldPageNum: this.state.pageNum
    });

  }

  async checkCommitAuthor(data: commitResponse) {
    if (data.author_email === "gjraper@Gregs-1s--0s.attlocal.net" || data.author_email === "gjraper@gmail.com") {
      this.commitData[0] += 1;
    } else if (data.author_email === "restrella@outlook.com") {
      this.commitData[1] += 1;
    } else if (data.author_email === "xu.cliffjun@gmail.com") {
      this.commitData[2] += 1;
    } else if (data.author_email === "pamvazquez1@gmail.com") {
      this.commitData[3] += 1;
    } else if (data.author_email === "you@example.com" || data.author_email === "shyamp1204@gmail.com" || data.author_email === "shyamp1204@utexas.edu") {
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
    data.forEach((element) => this.checkCommitAuthor(element));

    let tempPageNum = this.state.pageNum
    if (len >= (this.state.pageNum * 100)) {
      tempPageNum = this.state.pageNum + 1     
    }

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
      pageNum: tempPageNum
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
        console.log(res.data)
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
  
  async componentDidUpdate() {
    if( this.state.pageNum > this.state.oldPageNum) {
      await axios
        .get(
          `https://gitlab.com/api/v4/projects/29826417/repository/commits?type=all&per_page=100&page=${this.state.pageNum}` 
        )
        .then((res) => {
          console.log(res.data)
          this.updatePageNum(
            res.data as commitResponse[]
          );
        });
      }
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
                height: 1600,
              }}
            >
              <div style={{padding: 30}}>
                <h1>Meet the Team</h1>

                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent data-testid = "pamela" style={{ backgroundColor: "white" }}>
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
                            style={styles.peopleMedia}
                            src={pamelaImg}
                            component="img"
                            height="194"
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

                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent data-testid = "gregory" style={{ backgroundColor: "white" }}>
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
                            style={styles.peopleMedia}
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

                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent data-testid = "rodrigo" style={{ backgroundColor: "white" }}>
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
                            style={styles.peopleMedia}
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

                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent data-testid = "cliff" style={{ backgroundColor: "white" }}>
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
                            style={styles.peopleMedia}
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

                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent data-testid = "shyam" style={{ backgroundColor: "white" }}>
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
                            style={styles.peopleMedia}
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
              height: 400,
            }}
          >
            <div style={{paddingLeft: 90}}>
              <h1>APIs Used</h1>

              <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="https://reactjs.org/">Goodreads API</a></h2>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="https://developers.google.com/books/docs/overview/">Google Books API</a></h2>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="https://openlibrary.org/developers/api">Open Library API</a></h2>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="https://en.wikipedia.org/wiki/List_of_LGBT_writers">List of LGBTQ Writers Data Source</a></h2>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="https://en.wikipedia.org/wiki/List_of_English-language_book_publishing_companies">List of Book Publishing Companies Data Source</a></h2>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined" style={{width: 300}}>
                      <CardContent>
                        <h2><a href="https://www.tckpublishing.com/list-of-book-publishers/">List of Book Publishers Data Source</a></h2>
                      </CardContent>
                    </Card>
                  </Grid>
              </Grid>
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
              height: 750,
              backgroundColor: 'white'
            }}
          >
            <div style={{padding: 30}}>
              <h1> Tools Used </h1>
              <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent style={styles.cardContent}>
                        <h2><a href="https://reactjs.org/">React</a></h2>
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
                            src={reactLogo}
                            component="img"
                            height="140"
                            alt="picture of react logo"
                          />
                        </div>
                        <p>
                        A front-end JavaScript library for building user interfaces or UI components
                        </p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent style={styles.cardContent}>
                        <h2><a href="https://mui.com/">Material UI</a></h2>
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
                            src={materialLogo}
                            component="img"
                            height="140"
                            alt="picture of MaterialUI logo"
                          />
                        </div>
                        <p>
                        An open-source, front-end framework for React components
                        </p>
                      </CardContent>
                    </Card>
                  </Grid>
                
                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent style={styles.cardContent}>
                        <h2><a href="https://aws.amazon.com/amplify/">AWSAmplify</a></h2>
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
                            src={awsLogo}
                            component="img"
                            height="140"
                            alt="picture of Aws Amplify logo"
                          />
                        </div>
                        <p>
                        Cloud computing and hosting platform
                        </p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent style={styles.cardContent}>
                        <h2><a href="https://www.postman.com/">Postman</a></h2>
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
                            src={postmanLogo}
                            component="img"
                            height="140"
                            alt="picture of Postman logo"
                          />
                        </div>
                        <p>
                        API platform for building and using APIs
                        </p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent style={styles.cardContent}>
                        <h2><a href="https://about.gitlab.com/">GitLab</a></h2>
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
                            src={gitLogo}
                            component="img"
                            height="140"
                            alt="picture of GitLab logo"
                          />
                        </div>
                        <p>
                        Repository Manager with issue tracking and CI/CD pipeline
                        </p>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card variant="outlined">
                      <CardContent style={styles.cardContent}>
                        <h2><a href="https://www.namecheap.com/">NameCheap</a></h2>
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
                            src={nameCheapLogo}
                            component="img"
                            height="140"
                            alt="picture of NameCheap logo"
                          />
                        </div>
                        <p>
                        Domain name registrar
                        </p>
                      </CardContent>
                    </Card>
                  </Grid>
                  </Grid>
            </div>
          </Paper>

        </Parallax>
      </>
    );
  }
}

export default AboutUs;
