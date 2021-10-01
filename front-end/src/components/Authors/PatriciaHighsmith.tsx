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

class Page extends React.Component<props, state> {
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
                    <h1>Patricia Highland </h1> 
                    </div>
                    
                </Paper>  
                    </div>
                </Parallax>

            </div>
        )
    }

}

export default Page