import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './test.module.css';
import bgPhoto from '../../Assets/bgPhoto.jpg'
import { Parallax, Background } from 'react-parallax';

const styles = {
        parrallaxCont: {
            margintop: 100, 
            height: 1500
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

class testPage extends React.Component<props, state> {
    state: state = {
        
    }

    render(){
        return (
            <div>
                <Header></Header>
                <Parallax bgImage={bgPhoto} strength = {500} style={styles.parrallaxCont}>
                    <div style={{}}>
                    <Paper elevation={4} style={{textAlign:'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 150 }}>
                    <div> 
                    <h1> Welcome to Pride in Writing! </h1> 
                    <p>Our mission is to spotlight book authors in the LGBTQ Community</p>
                    </div>
                    
                </Paper>  
                    </div>
                </Parallax>
            </div>
        )
    }

}

export default testPage