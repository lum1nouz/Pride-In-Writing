import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
import css from './test.module.css';
import bgPhoto from '../../Assets/bgPhoto.jpg'
import patricia from '../../Assets/patricia-highsmith.jpg'
import { Parallax, Background } from 'react-parallax';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { CardContent } from '@material-ui/core'
import CardMedia from "@material-ui/core/CardMedia";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

    

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
                <Parallax bgImage={bgPhoto} strength = {500}>
                    <div style={{}}>
                    <Paper elevation={4} style={{textAlign:'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 150 }}>
                        <div> 
                        <h1>Patricia Highsmith </h1> 
                        </div>
                    </Paper>  
                    </div>
                    
                    <div style={{}}>
                        <Paper elevation={4} style={{textAlign:'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 1800 }}>

                            <div>
                                <h1>Meet the Team</h1>

                                <Grid container spacing={3}> 

                                    <Grid item xs={6}>
                                        <Card> 
                                            <CardContent style={{backgroundColor: "pink"}}> 
                                                <h2>Pamela Vazquez</h2>
                                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position:'relative'}}>
                                                <CardMedia 
                                                style={styles.media}
                                                src={patricia}
                                                component="img"
                                                height= "140"
                                                alt="picture of pamela"
                                                />
                                                </div>
                                                <p>Pamela is a Senior at UT Austin, studying Computer Science.</p>
                                                <p>She will be grauating Fall 2021 and will start her Product Management Career in February.</p>
                                                <p>Her major responsibilities fall within the front-end team.</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>    
                        </Paper>
                    </div>
                </Parallax>

            </div>
        )
    }

}

export default Page