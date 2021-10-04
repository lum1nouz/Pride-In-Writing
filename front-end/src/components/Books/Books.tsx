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
  book: string,
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
      book: "The Hours", 
      author: "Michael Cunningham",
      "genre": "Fiction",
      "publisher": "Farrar",
      "yearPublished": 1988,
      "rating": 4.4,
      "pages": 230,
      "price": 11.79
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
                                    title =""
                                    actions={[
                                        {
                                        icon: () => <div>Here</div>,
                                        tooltip: "Save User",
                                        onClick: (event, rowData?) => alert("You saved " + (rowData as rowdata).book)
                                        }
                                    ]}
                                    components={{
                                        Action: (props) => (
                                            // <Button
                                            // onClick={(event) => props.action.onClick(event, props.data)}
                                            // color="primary"
                                            // variant="text"
                                            // style={{ textTransform: "none" }}
                                            // size="small"
                                            // >
                                            // Save
                                            // </Button>
                                            <Link to="/kinflicks"> Here</Link>
                                        )
                                    }}/>
                            </Paper>
                      </div>
                  </Parallax>
                </div>
            </div>
        )
    }

}

export default ListPage