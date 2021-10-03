import React from 'react';
import { Paper, Button} from '@material-ui/core'
import Header from '../Header/Header';
import css from './Publishers.module.css';
import bgPhoto from '../../Assets/bgPhoto.jpg'
import { Parallax, Background } from 'react-parallax';
import MaterialTable from 'material-table';
import internal from 'stream';
import { Link } from 'react-router-dom';

type rowdata ={
  publisher: string,
  country: string,
  types: string,
  authorsPublished: number,
  founded: number
}

const dataStore = [
  {
      publisher: "Knopf",
      "country": "United States of America",
      "types": "Literature",
      "authorsPublished": 1,
      "founded": 1915
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
                          <div className={css.titleText}> Publishers </div>
                          <Paper elevation={4} className={css.paperCont}>
                                <MaterialTable style={{marginTop: 50, marginLeft: 20, marginRight: 20}}
                                    columns ={[
                                        {title: "Publisher", field: "publisher", type: "string"},
                                        {title: "Country of Origin", field: "country", type: "string"},
                                        {title: "Publication Types", field: "types", type: "string"},
                                        {title: "Authors Published", field: "authorsPublished", type: "numeric"},
                                        {title: "Year Founded", field: "founded", type: "numeric"}
                                    ]}
                                    data={dataStore}
                                    title =""
                                    actions={[
                                        {
                                        icon: () => <div>Here</div>,
                                        tooltip: "Save User",
                                        onClick: (event, rowData?) => alert("You saved " + (rowData as rowdata).publisher)
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
                                            <Link to="/page"> Here</Link>
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