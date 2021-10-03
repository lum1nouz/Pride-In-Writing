import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './test.module.css';
import bgPhoto from '../../Assets/bgPhoto.jpg'
import { Parallax, Background } from 'react-parallax';

type props = {

}

type state = {
   
}

class testPage extends React.Component<props, state> {
    state: state = {
        
    }

    render(){
        return (
            <div>
                <Header></Header>
                <div className={css.background}>
                    <Parallax strength = {500} className={css.parrallaxCont}>
                        <div style={{}}>
                        <Paper elevation={4} className={css.paperCont}>
                            <div> 
                                <h1> Welcome to Pride in Writing! </h1> 
                                <p>Our mission is to spotlight book authors in the LGBTQ Community</p>
                            </div>
                        </Paper>  
                        </div>
                    </Parallax>
                </div>
            </div>
        )
    }

}

export default testPage