import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './Authors.module.css';
import sarah from '../../Assets/sarah-waters.jpg'
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
                            <div className={css.titleText}> Sarah Waters </div>
                            <Paper elevation={4} className={css.paperCont}>
                                    <CardContent style={{backgroundColor: "pink", width: 'fit-content', marginLeft: 975}}> 
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative'}}>
                                            <CardMedia
                                                style={styles.media}
                                                src={sarah}
                                                component="img"
                                                alt="Picture of Sarah Waters" />
                                        </div>
                                        <p style={{textAlign: 'center'}}>
                                            Born: July 21, 1966
                                        </p>    
                                    </CardContent>

                                <div style={{textAlign: 'center'}}>
                                    <h2>
                                        Biography <br/>
                                    </h2> 
                                    <p>
                                        Born in Neyland, Pembrokeshire, Wales, Sarah Waters is a Welsh novelist known for her novels set in Victorian society and featuring lesbian protagonists.
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

                                    <h2>
                                        Publishers
                                    </h2> 
                                    <p>
                                        <Button
                                            component={Link}
                                            to="/virago-press"
                                            >
                                            Virago Press
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