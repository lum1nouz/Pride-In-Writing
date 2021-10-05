import React from 'react';
import { Paper, Button} from '@material-ui/core'
import Header from '../Header/Header';
import css from './Books.module.css';
import bgPhoto from '../../Assets/bgPhoto.jpg'
import { Parallax, Background } from 'react-parallax';
import MaterialTable from 'material-table';
import internal from 'stream';
import { Link } from 'react-router-dom';

type rowdata ={
  book: Link,
  author: string,
  genre: string,
  publisher: string,
  yearPublished: number,
  rating: number,
  pages: number,
  price: number
}

const dataStore = [
    {
        book: <a href="/the-hours">The Hours</a>, 
        author: "Michael Cunningham",
        "genre": "Fiction",
        "publisher": "Farrar",
        "yearPublished": 1988,
        "rating": 4.4,
        "pages": 230,
        "price": 11.79
    },
    {
        book: <a href="/fingersmith">Fingersmith</a>, 
        author: "Sarah Waters",
        "genre": "Fiction",
        "publisher": "Virago Press",
        "yearPublished": 2002,
        "rating": 4,
        "pages": 596,
        "price": 16.89
    },
    {
        book: <a href="/the-price-of-salt">The Price of Salt</a>, 
        author: "Patricia Highsmith",
        "genre": "Fiction",
        "publisher": "G. P. Putnam's Sons",
        "yearPublished": 1952,
        "rating": 4.5,
        "pages": 304,
        "price": 13.69
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
                          <div className={css.titleText}> Books </div>
                          <Paper elevation={4} className={css.paperCont}>
                                <MaterialTable style={{marginTop: 50, marginLeft: 20, marginRight: 20}}
                                    columns ={[
                                        {title: "Book", field: "book", type: "string"},
                                        {title: "Author", field: "author", type: "string"},
                                        {title: "Genre", field: "genre", type: "string"},
                                        {title: "Publisher", field: "publisher", type: "string"},
                                        {title: "Year Published", field: "yearPublished", type: "numeric"},
                                        {title: "Rating", field: "rating", type: "numeric"},
                                        {title: "Pages", field: "pages", type: "numeric"},
                                        {title: "Price", field: "price", type: "currency"}
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