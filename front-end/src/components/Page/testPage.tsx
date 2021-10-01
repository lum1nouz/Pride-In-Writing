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
                <Parallax bgImage={bgPhoto} strength = {500} className={css.parrallaxCont}>
                    <div style={{}}>
                        <Paper elevation={4} className={css.paperCont}>
                            

                            {/*     INSERT ELEMETS HERE (DETETE BRACKETS)       */}
                            <Button variant="text" size="large">Text</Button>


                        </Paper>  
                    </div>
                </Parallax>
            </div>
        )
    }

}

export default testPage