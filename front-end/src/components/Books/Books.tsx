import React from "react";
import { forwardRef } from 'react';
import { Paper, Button } from "@material-ui/core";
import Header from "../Header/Header";
import css from "./Books.module.css";
import bgPhoto from "../../Assets/bgPhoto.jpg";
import { Parallax, Background } from "react-parallax";
import MaterialTable from "material-table";
import internal from "stream";
import { Link } from "react-router-dom";
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

type rowdata = {
  book: Link;
  author: string;
  genre: string;
  publisher: string;
  yearPublished: number;
  rating: number;
  pages: number;
  price: number;
};

const dataStore = [
  {
    book: <a href="/the-hours">The Hours</a>,
    author: "Michael Cunningham",
    genre: "Fiction",
    publisher: "Farrar",
    yearPublished: 1988,
    rating: 4.4,
    pages: 230,
    price: 11.79,
  },
  {
    book: <a href="/fingersmith">Fingersmith</a>,
    author: "Sarah Waters",
    genre: "Fiction",
    publisher: "Virago Press",
    yearPublished: 2002,
    rating: 4,
    pages: 596,
    price: 16.89,
  },
  {
    book: <a href="/the-price-of-salt">The Price of Salt</a>,
    author: "Patricia Highsmith",
    genre: "Fiction",
    publisher: "G. P. Putnam's Sons",
    yearPublished: 1952,
    rating: 4.5,
    pages: 304,
    price: 13.69,
  },
];

const tableIcons = {
  Add: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
};

type props = {};

type state = {};

class Books extends React.Component<props, state> {
  state: state = {};

  render() {
    return (
      <div>
        <Header />
        <div className={css.background}>
          <Parallax strength={500} className={css.parrallaxCont}>
            <div style={{}}>
              <div id="books-title" className={css.titleText}> Books </div>
              <Paper elevation={4} className={css.paperCont} data-testid = "books">
                <MaterialTable
                  icons={tableIcons}
                  style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}
                  columns={[
                    { title: "Book", field: "book", type: "string" },
                    { title: "Author", field: "author", type: "string" },
                    { title: "Genre", field: "genre", type: "string" },
                    { title: "Publisher", field: "publisher", type: "string" },
                    {
                      title: "Year Published",
                      field: "yearPublished",
                      type: "numeric",
                    },
                    { title: "Rating", field: "rating", type: "numeric" },
                    { title: "Pages", field: "pages", type: "numeric" },
                    { title: "Price", field: "price", type: "currency" },
                  ]}
                  data={dataStore}
                  title=""
                />
              </Paper>
            </div>
          </Parallax>
        </div>
      </div>
    );
  }
}

export default Books;
