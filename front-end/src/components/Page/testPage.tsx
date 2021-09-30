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
                <Header></Header>
                <Paper elevation={4} style={{position: 'relative', marginTop: 100, marginLeft: 30, marginRight: 30, height: 300 }}>
                    
                    <Button variant="text" size="large">Text</Button>
                </Paper>  
                
            </div>
        )
    }

}

export default testPage