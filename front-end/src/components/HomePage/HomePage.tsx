import React, { createRef } from "react";
import Header from "../Header/Header";
import css from "./HomePage.module.css";
import booksPics from "../../Assets/booksPic.png";
import Grid from "@material-ui/core/Grid";
import { DownOutlined } from "@ant-design/icons"
import { Card } from '@mui/material';
import { CardContent } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@mui/material';
import authorStockImg from "../../Assets/authorImg.jpg";
import bookStockImg from "../../Assets/bookImg.jpg";
import publisherStockImg from "../../Assets/publisherImg.jpg";
import penguinLogoImg from "../../Assets/penguinLogo.webp";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


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
  private myRef:  React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }
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
                    Our mission is to spotlight books, authors, and publishers in the LGBTQ
                    Community
                  </p>
                </div>
                <div style = {{display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative", 
                padding: 15}}> 
                <Stack spacing={2} direction="row">
                  <Button variant="contained">Search by Query</Button>
                  <Button variant="outlined">Search by Name</Button>
                </Stack>
                </div> 

                <div>
                  <p>Insert search bar here</p>
                  </div>

                <div>
                
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
          
          <div className={css.downButton}>
					<DownOutlined
						className={css.downButtonIcon}
						onClick={() => {
              if(this.myRef.current != null){
                window.scrollTo({
                  top: this.myRef.current.offsetTop,
                  behavior: "smooth",
                })
              }
						}}
					/>
				</div>
          <div ref={this.myRef} style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                padding: 50}}>
            <h1> 
            <span id="homePageP" style={{ color: "#FF555E" }}>
                    M
                  </span>
                  <span style={{ color: "#FF8650" }}>o</span>
                  <span style={{ color: "#F6BE00" }}>d</span>
                  <span style={{ color: "#77C66E" }}>e</span>
                  <span style={{ color: "#83B2FF" }}>l</span>
                  <span style={{ color: "#9B6EF3" }}>s</span>
            </h1>
            </div>

            <div 
                style={{textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                paddingBottom: 75,
                paddingLeft: 45}}>

            <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          src={authorStockImg}
                          component="img"
                          height="300"
                          alt="authors image"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                          <a href="/Authors">
                            Authors
                          </a>
                          </Typography>
                          <Typography variant="body2">
                            Want to know which Authors are in the LGBTQ community?
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          src={bookStockImg}
                          component="img"
                          height="300"
                          alt="books image"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                          <a href="/Books">
                            Books
                          </a>
                          </Typography>
                          <Typography variant="body2">
                            Learn about books written by LGBTQ Authors!
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          src={penguinLogoImg}
                          component="img"
                          height="300"
                          alt="publishers image"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                          <a href="/Publishers">
                            Publishers
                          </a>
                          </Typography>
                          <Typography variant="body2">
                            Learn which Publishing companies are supporting LGBTQ Authors!
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
            </div>

            <div
            style={{
              backgroundColor:"black",
              padding: 50}}>
                <Grid container spacing={2} style={{ position: "relative" }}>
                  <Grid item xs={4} style= {{fontWeight: "bold", textAlign: "center"}}>
                        <span id="homePageP" style={{ color: "#FF555E"}}>P</span>
                        <span style={{ color: "#FF8650" }}>R</span>
                        <span style={{ color: "#F6BE00" }}>I</span>
                        <span style={{ color: "#77C66E" }}>D</span>
                        <span style={{ color: "#83B2FF" }}>E </span>
                        <span style={{ color: "#9B6EF3" }}>I</span>
                        <span style={{ color: "#FC6C85" }}>N </span>
                        <span style={{ color: "#1167b1" }}>W</span>
                        <span style={{ color: "#FF555E" }}>R</span>
                        <span style={{ color: "#77C66E" }}>I</span>
                        <span style={{ color: "#F6BE00" }}>T</span>
                        <span style={{ color: "#77C66E" }}>I</span>
                        <span style={{ color: "#83B2FF" }}>N</span>
                        <span style={{ color: "#9B6EF3" }}>G</span>
                        <p style={{color: "white", fontWeight: "normal"}}>Our mission is to spotlight books, authors, and publishers in the LGBTQ
                    Community</p>
                  </Grid>

                  <Grid item xs={4} style= {{fontWeight: "bold", textAlign: "center"}}>
                    <span id="homePageP" style={{ color: "#FF555E" }}>
                      M
                    </span>
                    <span style={{ color: "#FF8650" }}>O</span>
                    <span style={{ color: "#F6BE00" }}>D</span>
                    <span style={{ color: "#77C66E" }}>E</span>
                    <span style={{ color: "#83B2FF" }}>L</span>
                    <span style={{ color: "#9B6EF3" }}>S</span>
                    <p><a style={{color: "white", fontWeight: "normal", textDecoration: "none"}} href="/Authors">Authors</a></p>
                    <p><a style={{color: "white", fontWeight: "normal", textDecoration: "none"}} href="/Books">Books</a></p>
                    <p><a style={{color: "white", fontWeight: "normal", textDecoration: "none"}} href="/Publishers">Publishers</a></p>
                  </Grid>

                  <Grid item xs={4} style= {{fontWeight: "bold", textAlign: "center"}}>
                    <span id="homePageP" style={{ color: "#FF555E" }}>
                      O
                    </span>
                    <span style={{ color: "#FF8650" }}>T</span>
                    <span style={{ color: "#F6BE00" }}>H</span>
                    <span style={{ color: "#77C66E" }}>E</span>
                    <span style={{ color: "#83B2FF" }}>R</span>
                    <span style={{ color: "#9B6EF3" }}> L</span>
                    <span style={{ color: "#FC6C85" }}>I</span>
                    <span style={{ color: "#1167b1" }}>N</span>
                    <span style={{ color: "#FF555E" }}>K</span>
                    <span style={{ color: "#77C66E" }}>S</span>
                    <p><a style={{color: "white", fontWeight: "normal", textDecoration: "none"}} href="/HomePage">Home</a></p>
                    <p><a style={{color: "white", fontWeight: "normal", textDecoration: "none"}} href="/AboutUs">About</a></p>
                  </Grid>
                </Grid>
                <div style={{paddingTop: 40}}>
                  <p style={{color: "white", textAlign: "center"}}>Copyright &copy; 2021 Pride In Writing</p>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
