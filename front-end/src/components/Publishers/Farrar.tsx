import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './Publishers.module.css';
import farrar from '../../Assets/farrar-logo.jpg'
import { Parallax } from 'react-parallax';
import Card from "@material-ui/core/Card";
import { CardContent } from '@material-ui/core'
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom';

type props = {

}

type state = {
   
}

const styles = {
    media: {
        width: 400,
        height: 400,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
}

class Page extends React.Component<props, state> {
    state: state = {
        
    }

    render(){
        return (
            <div>
                <Header/>
                <div className={css.background}>
                    <Parallax strength = {500} className={css.parrallaxCont}>
                        <div style={{}}>
                            <div className={css.titleText}> Farrar, Straus and Giroux </div>
                            <Paper elevation={4} className={css.paperCont}>
                                <Grid container spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justify="center">
                                    <Grid item xs={12}>
                                        <CardContent style={{backgroundColor: "pink", width: 'fit-content'}}> 
                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative'}}>
                                                <CardMedia
                                                    style={styles.media}
                                                    src={farrar}
                                                    component="img"
                                                    alt="Farrar, Straus and Giroux Logo" />
                                            </div>
                                            <p style={{textAlign: 'center'}}>
                                                Parent Company: Macmillan Publishers <br/>
                                                Founder: John C. Farrar, Roger W. Straus Jr., Robert Giroux <br/>
                                                Website: <a href="https://us.macmillan.com/fsg/">Farrar, Straus and Giroux'sWebsite</a>
                                            </p>    
                                        </CardContent>
                                    </Grid>
                                </Grid>

                                <div style={{textAlign: 'center'}}>
                                    <h2>
                                        About <br/>
                                    </h2> 
                                    <p>
                                        United States publisher based in New York City, New York. Founded in 1946.
                                    </p>

                                    <h2>
                                        Authors
                                    </h2> 
                                    <p>
                                        <Button
                                            component={Link}
                                            to="/michael-cunningham"
                                            >
                                            Michael Cunningham
                                        </Button>  
                                    </p>

                                    <h2>
                                        Books
                                    </h2> 
                                    <p>
                                        <Button
                                            component={Link}
                                            to="/the-price-of-salt"
                                            >
                                            The Hours (1998)
                                        </Button>  
                                    </p>


                                </div>
                            </Paper>
                        </div>
                    </Parallax>
                </div>
            </div>
        )
    }

}

export default Page