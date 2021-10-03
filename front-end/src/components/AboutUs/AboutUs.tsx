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

const styles = {
    parrallaxCont: {
        margintop: 100, 
        height: 2000
    },
    paperCont: { 
        marginTop: 200, 
        marginLeft: 80, 
        marginRight: 80, 
        height: 1200 
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
            <Parallax bgImage={bgPhoto} strength = {500} style={styles.parrallaxCont}>
                    <div style={{}}>
                    <Paper elevation={4} style={{textAlign:'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 150 }}>
                    <div> 
                    <h1> About Us </h1> 
                    <p>Pride in Writing aims to highlight the work of LGBTQ Authors and show the Publishers that support them.</p>
                    <p>We hope that by making this information readily available, people will support these authors!</p>
                    </div>
                    
                </Paper>  
                    </div>

                    <div style={{}}>
                    <Paper elevation={4} style={{textAlign:'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 1300 }}>

                    <div> 
                    <h1>Meet the Team</h1>

                    <Grid container spacing={3}> 

                    <Grid item xs={6}>
                        <Card> 
                            <CardContent style={{backgroundColor: "pink"}}> 
                                <h2>Pamela Vazquez</h2>
                                <CardMedia 
                                src={pamelaImg}
                                component="img"
                                height= "400"
                                alt="picture of pamela"
                                />
                                <p>Pamela is a Senior at UT Austin, studying Computer Science.</p>
                                <p>She will be grauating Fall 2021 and will start her Product Management Career in February.</p>
                                <p>Her major responsibilities fall within the front-end team.</p>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6}>
                        <Card> 
                            <CardContent style={{backgroundColor: "pink"}}> 
                                <h2>Gregory Raper</h2>
                                <CardMedia 
                                component="img"
                                height= "140"
                                image= "pride-in-writing/front-end/src/Assets/IMG_9697.jpg"
                                alt="picture of greg"
                                />
                                <p>Greg is a Senior at UT Austin, studying Computer Science.</p>
                                <p>He will be grauating Spring 2022 and blank</p>
                                <p>His major responsibilities fall within the front-end team.</p>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid item xs={6}>
                        <Card> 
                            <CardContent style={{backgroundColor: "pink"}}> 
                                <h2>Rodrigo Estrella</h2>
                                <CardMedia 
                                src={rodrigoImg}
                                component="img"
                                height= "400"
                                alt="picture of rodrigo"
                                />
                                <p>Rodrigo is a Senior at UT Austin, studying Computer Science.</p>
                                <p>He will be grauating Spring 2022 and blank</p>
                                <p>His major responsibilities fall within the blank team.</p>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6}>
                        <Card> 
                            <CardContent style={{backgroundColor: "pink"}}> 
                                <h2>Cliff Xu</h2>
                                <CardMedia 
                                component="img"
                                height= "140"
                                image= "pride-in-writing/front-end/src/Assets/IMG_9697.jpg"
                                alt="picture of cliff"
                                />
                                <p>Cliff is a Senior at UT Austin, studying Computer Science.</p>
                                <p>He will be grauating Spring 2022 and blank</p>
                                <p>His major responsibilities fall within the blank team.</p>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6}>
                        <Card> 
                            <CardContent style={{backgroundColor: "pink"}}> 
                                <h2>Shyam Patel</h2>
                                <CardMedia 
                                component="img"
                                height= "140"
                                image= "pride-in-writing/front-end/src/Assets/IMG_9697.jpg"
                                alt="picture of greg"
                                />
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

                </Parallax>
        )
    }

}

export default AboutUs