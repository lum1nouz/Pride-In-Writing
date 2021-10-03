import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './Authors.module.css';
import patricia from '../../Assets/patricia_highsmith.jpg'
import { Parallax } from 'react-parallax';
import { CardContent } from '@material-ui/core'
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from 'react-router-dom';

type props = {

}

type state = {
   
}

const styles = {
    media: {
        width: 400,
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
                            <div className={css.titleText}> Patricia Highsmith </div>
                            <Paper elevation={4} className={css.paperCont}>
                                    <CardContent style={{backgroundColor: "pink", width: 'fit-content', marginLeft: 975}}> 
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative'}}>
                                            <CardMedia
                                                style={styles.media}
                                                src={patricia}
                                                component="img"
                                                alt="Picture of Patrica Highsmith" />
                                        </div>
                                        <p style={{textAlign: 'center'}}>
                                            Born: January 19, 1921 <br/>
                                            Died: February 4, 1995 <br/>
                                        </p>    
                                    </CardContent>

                                <div style={{textAlign: 'center'}}>
                                    <h2>
                                        Biography <br/>
                                    </h2> 
                                    <p>
                                        Born in Fort Worth, Texas, Patricia Highsmith was an American novelist known for her psychological thrillers and romances.
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

                                    <h2>
                                        Publishers
                                    </h2> 
                                    <p>
                                        <Button
                                            component={Link}
                                            to="/putnam"
                                            >
                                            G. P. Putnam's Sons
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