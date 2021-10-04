import React from 'react';
import { CardContent } from '@material-ui/core'
import Header from '../Header/Header';
import { Paper, Button } from '@material-ui/core'
import { Parallax, Background } from 'react-parallax';
import bgPhoto from '../../Assets/bgPhoto.jpg'
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import pamelaImg from '../../Assets/pamela-pic.jpg'
import rodrigoImg from '../../Assets/rodrigo-pic.jpg'
import cliffImg from '../../Assets/cliff-pic.jpg'
import gregImg from '../../Assets/greg-pic.jpg'
import shyamImg from '../../Assets/shyam-pic.jpg'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {
    parrallaxCont: {
        margintop: 100, 
        height: 3500
    },
    paperCont: { 
        marginTop: 200, 
        marginLeft: 80, 
        marginRight: 80, 
        height: 1200 
    },
    media: {
        width: 200,
        height: 300,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
      }
} 

type props = {

}

type state = {
   
}

class AboutUs extends React.Component<props, state> {
    state: state = {
        
    }

    render(){
        return (
            <><div>
                <Header></Header>
            </div><Parallax bgImage={bgPhoto} strength={500} style={styles.parrallaxCont}>
                    <div style={{}}>
                        <Paper elevation={4} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 150 }}>
                            <div>
                                <h1> About Us </h1>
                                <p>Pride in Writing aims to highlight the work of LGBTQ Authors and show the Publishers that support them.</p>
                                <p>We hope that by making this information readily available, people will support these authors!</p>
                            </div>

                        </Paper>
                    </div>

                    <div style={{}}>
                        <Paper elevation={4} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 1800 }}>

                            <div>
                                <h1>Meet the Team</h1>

                                <Grid container spacing={3}>

                                    <Grid item xs={6}>
                                        <Card>
                                            <CardContent style={{ backgroundColor: "pink" }}>
                                                <h2>Pamela Vazquez</h2>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                    <CardMedia
                                                        style={styles.media}
                                                        src={pamelaImg}
                                                        component="img"
                                                        height="140"
                                                        alt="picture of pamela" />
                                                </div>
                                                <p>Pamela is a Senior at UT Austin, studying Computer Science.</p>
                                                <p>She will be grauating Fall 2021 and will start her Product Management Career in February.</p>
                                                <p>Her major responsibilities fall within the front-end team.</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Card>
                                            <CardContent style={{ backgroundColor: "pink" }}>
                                                <h2>Gregory Raper</h2>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                    <CardMedia
                                                        style={styles.media}
                                                        src={gregImg}
                                                        component="img"
                                                        height="140"
                                                        alt="picture of greg" />
                                                </div>
                                                <p>Greg is a Senior at UT Austin, studying Computer Science.</p>
                                                <p>He will be grauating Spring 2022 and blank</p>
                                                <p>His major responsibilities fall within the front-end team.</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>


                                    <Grid item xs={6}>
                                        <Card>
                                            <CardContent style={{ backgroundColor: "pink" }}>
                                                <h2>Rodrigo Estrella</h2>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                    <CardMedia
                                                        style={styles.media}
                                                        src={rodrigoImg}
                                                        component="img"
                                                        height="400"
                                                        alt="picture of rodrigo" />
                                                </div>
                                                <p>Rodrigo is a Senior at UT Austin, studying Computer Science.</p>
                                                <p>He will be grauating Spring 2022 and blank</p>
                                                <p>His major responsibilities fall within the blank team.</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Card>
                                            <CardContent style={{ backgroundColor: "pink" }}>
                                                <h2>Cliff Xu</h2>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                    <CardMedia
                                                        style={styles.media}
                                                        src={cliffImg}
                                                        component="img"
                                                        height="140"
                                                        alt="picture of cliff" />
                                                </div>
                                                <p>Cliff is a Senior at UT Austin, studying Computer Science.</p>
                                                <p>He will be grauating Spring 2022 and blank</p>
                                                <p>His major responsibilities fall within the blank team.</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Card>
                                            <CardContent style={{ backgroundColor: "pink" }}>
                                                <h2>Shyam Patel</h2>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                    <CardMedia
                                                        style={styles.media}
                                                        src={shyamImg}
                                                        component="img"
                                                        height="140"
                                                        alt="picture of shyam" />
                                                </div>
                                                <p>Shyam is a Senior at UT Austin, studying Computer Science.</p>
                                                <p>He will be grauating Spring 2022 and blank</p>
                                                <p>His major responsibilities fall within the blank team.</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                </Grid>

                            </div>
                        </Paper>

                    </div>

                    <Paper elevation={4} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 375 }}>
                        <div>
                            <h1>APIs Used</h1>

                            <List>
                                <ListItem button component="a" href="https://www.goodreads.com/api/">
                                    <ListItemText primary="Goodreads API" />
                                </ListItem>

                                <ListItem button component="a" href="https://developers.google.com/books/docs/overview/">
                                    <ListItemText primary="Google Books API" />
                                </ListItem>

                                <ListItem button component="a" href="https://openlibrary.org/developers/api ">
                                    <ListItemText primary="Open Library API" />
                                </ListItem>


                                <ListItem button component="a" href="https://en.wikipedia.org/wiki/List_of_LGBT_writers ">
                                    <ListItemText primary="List of LGBTQ Writers Data Source" />
                                </ListItem>


                                <ListItem button component="a" href="https://en.wikipedia.org/wiki/List_of_English-language_book_publishing_companies">
                                    <ListItemText primary="List of Book Publishing Companies Data Source" />
                                </ListItem>

                                <ListItem button component="a" href="https://www.tckpublishing.com/list-of-book-publishers/">
                                    <ListItemText primary="List of Book Publishers Data Source" />
                                </ListItem>

                            </List>

                        </div>
                    </Paper>

                    <Paper elevation={4} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 650 }}>

                    <div>
                    <h1> Tools Used </h1>
                    <List>
                        <ListItem>
                            <ListItemText><p>React: used to build our web app</p></ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemText><p>Material UI: used to create the user interface in our React application</p></ListItemText>
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
                            <p>GitLab: used for our project repository and for development across team members</p>
                            </ListItemText>
                        </ListItem>


                        <ListItem>
                            <ListItemText>
                            <p>NameCheap: used to register the Pride in Writing domain name</p>
                            </ListItemText>
                        </ListItem>


                        <ListItem>
                            <ListItemText>
                            <p>Restful APIs and Data Sources: used to scrape information that will be displayed in our web application</p>
                            </ListItemText>
                        </ListItem>

                        </List>

                        </div>

                    </Paper>

                </Parallax></>
        )
    }

}

export default AboutUs