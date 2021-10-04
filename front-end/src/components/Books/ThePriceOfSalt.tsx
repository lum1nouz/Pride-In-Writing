import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './Books.module.css';
import priceofsalt from '../../Assets/price-of-salt.jpg'
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
        width: 600,
        height: 200,
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
                            <div className={css.titleText}> The Hours </div>
                            <Paper elevation={4} className={css.paperCont}>
                                <Grid container spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justify="center">
                                    <Grid item xs={12}>
                                        <CardContent style={{backgroundColor: "pink", width: 'fit-content'}}>
                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative'}}>
                                                    <CardMedia
                                                        src={priceofsalt}
                                                        component="img"
                                                        alt="The Price of Salt" />
                                            </div>
                                            <p style={{textAlign: 'center'}}>
                                                Rating: 4.5 <br/>
                                                Pages: 304 <br/>
                                                Price: $13.69
                                            </p>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                                <div style={{textAlign: 'center'}}>
                                    <h2>
                                        Author <br/>
                                    </h2> 
                                    <Button
                                            component={Link}
                                            to="/patricia-highsmith"
                                            >
                                            Patricia Highsmith
                                    </Button>  

                                    <h2>
                                        Genre
                                    </h2> 
                                    <p>
                                        Fiction
                                    </p>

                                    <h2>
                                        Publisher
                                    </h2> 
                                    <Button
                                            component={Link}
                                            to="/putnam"
                                            >
                                            GP Putnam
                                    </Button>
                                    <h2>
                                        Year Published
                                    </h2> 
                                    <p>
                                        1952
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