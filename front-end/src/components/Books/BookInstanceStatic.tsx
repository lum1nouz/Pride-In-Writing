import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './Books.module.css';
import kinflicks from '../../Assets/kinflicks.jpg'
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
                            <div className={css.titleText}> Kinflicks </div>
                            <Paper elevation={4} className={css.paperCont}>
                                <Grid container spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justify="center">
                                    <Grid item xs={12}>
                                        <CardContent style={{backgroundColor: "pink", width: 'fit-content'}}> 
                                            <CardMedia
                                                src={kinflicks}
                                                component="img"
                                                alt="Kinflicks Book" />
                                            <p style={{textAlign: 'center'}}>
                                                Rating: 3.76 <br/>
                                                Pages: 503 <br/>
                                                Price: $12.00
                                            </p>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                                <div style={{textAlign: 'center'}}>
                                    <h2>
                                        Author <br/>
                                    </h2> 
                                    <p>
                                        Lisa Alther
                                    </p>

                                    <h2>
                                        Genre
                                    </h2> 
                                    <p>
                                        Fiction
                                    </p>

                                    <h2>
                                        Publisher
                                    </h2> 
                                    <p>
                                        Knopf
                                    </p>
                                    <h2>
                                        Year Published
                                    </h2> 
                                    <p>
                                        1975
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