import React from 'react';
import { Paper, Button} from '@material-ui/core'
import Header from '../Header/Header';
import css from './Authors.module.css';
import bgPhoto from '../../Assets/bgPhoto.jpg'
import { Parallax, Background } from 'react-parallax';
import MaterialTable from 'material-table';
import internal from 'stream';
import { Link } from 'react-router-dom';

type rowdata ={
  author: Link,
  yearBorn: number,
  nationality: string,
  sexuality: string,
  gender: string,
  books_Published: number
}

const dataStore = [
  { 
    author: <a href="/patricia-highsmith">Patricia Highsmith</a>,
    yearBorn: 1921,
    nationality: "American",
    sexuality: "Homosexual",
    gender: "Female",
    books_Published: 297
  },
  { 
    author: <a href="/michael-cunningham">Michael Cunningham</a>,
    yearBorn: 1952,
    nationality: "American",
    sexuality: "Homosexual",
    gender: "Male",
    books_Published: 48
  },
  { 
    author: <a href="/sarah-waters">Sarah Waters</a>,
    yearBorn: 1966,
    nationality: "Welsh",
    sexuality: "Homosexual",
    gender: "Female",
    books_Published: 31
  }
];

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
                <div className={css.background}>
                  <Parallax strength = {500} className={css.parrallaxCont}>
                      <div style={{}}>
                          <div className={css.titleText}> Authors </div>
                          <Paper elevation={4} className={css.paperCont}>
                                <MaterialTable style={{marginTop: 50, marginLeft: 20, marginRight: 20}}
                                    columns ={[
                                        {title: "Author", field: "author", type: "string"},
                                        {title: "Year Born", field: "yearBorn", type: "numeric"},
                                        {title: "Nationality", field: "nationality", type: "string"},
                                        {title: "Sexuality", field: "sexuality", type: "string"},
                                        {title: "Gender", field: "gender", type: "string"},
                                        {title: "Books Written", field: "books_Published", type: "numeric"},
                                    ]}
                                    data={dataStore}
                                    title =""/>
                            </Paper>
                      </div>
                  </Parallax>
                </div>
            </div>
        )
    }

}

export default ListPage