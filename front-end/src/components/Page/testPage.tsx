import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './test.module.css';
import bgPhoto from '../../Assets/bgPhoto.jpg'
import pride_colorful from '../../Assets/pride_colorful.png'
import booksPics from '../../Assets/booksPic.png';
import { Parallax, Background } from 'react-parallax';
import Grid from "@material-ui/core/Grid";



const styles = {
        parrallaxCont: {
            margintop: 100, 
            height: 1000
        },
        paperCont: { 
            marginTop: 200, 
            marginLeft: 80, 
            marginRight: 80, 
            height: 1200 
        },

        pride: {
            fontSize: '50px'
            
        },

        mission: {
            fontSize: '30px'
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
                <div>
                <Header></Header>
                </div>

                <div> 
                <Grid container spacing={2} style={{position: 'relative'}}>
                    <Grid item xs={7} style={{backgroundColor: 'white', height: '600px', textAlign:'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                         <div className="pride">
                             <h1>Pride in Writing</h1>
                             <div className="mission"><p>Our mission is to spotlight book authors in the LGBTQ Community</p></div>
                             </div>
                    </Grid>
                    <Grid item xs={5} style={{backgroundColor: 'white', height: '600px', display: 'flex', justifyContent:'center', alignItems: 'center', position:'relative'}}>
                    <img src={booksPics} style={{objectFit:'cover'}}></img>
                    </Grid>
                    </Grid>
                </div>
       
            </div>
        )
    }

}

export default testPage