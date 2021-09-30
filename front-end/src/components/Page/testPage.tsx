import React from 'react';
import { Paper, Button } from '@material-ui/core'
import Header from '../Header/Header';
    

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
                <Header> </Header>
                <Paper variant="outlined" elevation={5}>
                    <Button variant="text" size="large">Text</Button>
                </Paper> 
                
            </div>
        )
    }

}

export default testPage