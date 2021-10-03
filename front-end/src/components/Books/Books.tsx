import React from 'react';
import { Paper, Button} from '@material-ui/core'
import Header from '../Header/Header';
import css from './Books.module.css';
import bgPhoto from '../../Assets/bgPhoto.jpg'
import { Parallax, Background } from 'react-parallax';
import MaterialTable from 'material-table';
import internal from 'stream';
import { Link } from 'react-router-dom';

type props = {

}

type state = {
   
}

class ListPage extends React.Component<props, state> {
    state: state = {
        
    }

    render(){
        return (
            <div>
                <Header/>
                <Parallax bgImage={bgPhoto} strength = {500} className={css.parrallaxCont}>
                    <div style={{}}>
                        <div className={css.titleText}> Books </div>
                    </div>
                </Parallax>
            </div>
        )
    }

}

export default ListPage