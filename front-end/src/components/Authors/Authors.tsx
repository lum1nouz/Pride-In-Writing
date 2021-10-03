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
  author: string,
  yearBorn: number,
  nationality: string,
  sexuality: string,
  gender: string,
  books_Published: number
}

const dataStore = [
  { 
    author: "Patricia Highsmith",
    yearBorn: 1921,
    nationality: "American",
    sexuality: "Homosexual",
    gender: "Female",
    books_Published: 22
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
                                        {title: "Author", field: "author", type: "string"},
                                        {title: "Year Born", field: "yearborn", type: "numeric"},
                                        {title: "Nationality", field: "nationality", type: "string"},
                                        {title: "Sexuality", field: "sexuality", type: "string"},
                                        {title: "Gender", field: "gender", type: "string"},
                                        {title: "Books Published", field: "books_Published", type: "numeric"},
                                    ]}
                                    data={dataStore}
                                    title =""
                                    actions={[
                                        {
                                        icon: () => <div>Here</div>,
                                        tooltip: "Save User",
                                        onClick: (event, rowData?) => alert("You saved " + (rowData as rowdata).author)
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
                                            <Link to="/patricia-highsmith"> Here</Link>
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