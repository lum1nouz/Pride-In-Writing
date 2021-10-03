import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './Publishers.module.css';
import virago from '../../Assets/virago-logo.jpg'
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
                            <div className={css.titleText}> Virago Press</div>
                            <Paper elevation={4} className={css.paperCont}>
                                    <CardContent style={{backgroundColor: "pink", width: 'fit-content', marginLeft: 500}}> 
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative'}}>
                                            <CardMedia
                                                style={styles.media}
                                                src={virago}
                                                component="img"
                                                alt="Picture of Patrica Highsmith" />
                                        </div>
                                        <p style={{textAlign: 'center'}}>
                                            Parent Company: Hachette Livre <br/>
                                            Founder: Carmen Callil <br/>
                                            Website: <a href="https://www.virago.co.uk/">Virago Press' Website</a>
                                        </p>    
                                    </CardContent>

                                <div style={{textAlign: 'center'}}>
                                    <h2>
                                        About <br/>
                                    </h2> 
                                    <p>
                                        British publisher of women's writing and books on feminist topics based in the United Kingdom.
                                    </p>

                                    <h2>
                                        Authors
                                    </h2> 
                                    <p>
                                        <Button
                                            component={Link}
                                            to="/sarah-waters"
                                            >
                                            Sarah Waters
                                        </Button>  
                                    </p>

                                    <h2>
                                        Books
                                    </h2> 
                                    <p>
                                        <Button
                                            component={Link}
                                            to="/fingersmith"
                                            >
                                            Fingersmith (2002)
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