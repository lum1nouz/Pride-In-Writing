import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './Publishers.module.css';
import putnam from '../../Assets/putnam-logo.jpg'
import { Parallax } from 'react-parallax';
import Card from "@material-ui/core/Card";
import { CardContent } from '@material-ui/core'
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from 'react-router-dom';

type props = {

}

type state = {
   
}

const styles = {
    media: {
        width: 1400,
        height: 500,
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
                            <div className={css.titleText}> G. P. Putnam's Sons </div>
                            <Paper elevation={4} className={css.paperCont}>
                                    <CardContent style={{backgroundColor: "pink", width: 'fit-content', marginLeft: 500}}> 
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative'}}>
                                            <CardMedia
                                                style={styles.media}
                                                src={putnam}
                                                component="img"
                                                alt="G. P. Gutman's Sons Logo" />
                                        </div>
                                        <p style={{textAlign: 'center'}}>
                                            Parent Company: Penguin Group <br/>
                                            Founder: George Palmer Putnam <br/>
                                            Website: <a href="https://www.penguin.com/publishers/gpputnamssons/">G. P. Putnam's Sons' Website</a>
                                        </p>    
                                    </CardContent>

                                <div style={{textAlign: 'center'}}>
                                    <h2>
                                        About <br/>
                                    </h2> 
                                    <p>
                                        United States publisher based in New York City, New York.
                                    </p>

                                    <h2>
                                        Authors
                                    </h2> 
                                    <p>
                                        <Button
                                            component={Link}
                                            to="/patricia-highsmith"
                                            >
                                            Patricia Highsmith
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
                                            The Price of Salt (1952)
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