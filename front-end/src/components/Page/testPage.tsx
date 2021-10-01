import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
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
                        <Paper elevation={4} style={styles.paperCont}>
                            

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